import Authentication from "../Authentication/Authentication";
import {
  APPLICATIONS_PERMISSION_SCOPE,
  UserPermissions,
} from "../../models/permission";
import { ChangePassword, UserWithPermissions } from "../../models/user";
import Rest from "../Rest/Rest";
import { Token, InternalUserModel } from "../../models";

class BaseUser {
  public tokenData: Token;
  public data: InternalUserModel | any;
  public timestamp: number | null;
  public TIMEOUT_MS: number;

  constructor() {
    this.tokenData = Authentication.getTokenData();
    this.data = null;
    this.timestamp = null;
    this.TIMEOUT_MS = 3000;
  }

  getUsername = (): string => {
    return this.tokenData?.message?.name;
  };

  isSuperUser = (): boolean => {
    return this.tokenData?.message?.superUser;
  };

  getAllowedApps = async (): Promise<string[]> => {
    const { Permissions } = await this.getPermissions();
    return Permissions?.[APPLICATIONS_PERMISSION_SCOPE] || [];
  };

  getCurrentUserWithPermissions = async (): Promise<UserWithPermissions> => {
    const { Permissions, Roles, SuperUser } = await this.getPermissions();
    return {
      Label: this.getUsername(),
      Resources: Permissions || {},
      Superuser: SuperUser ?? this.isSuperUser(),
      Roles,
    };
  };

  getData = () => {
    /* Implemented in derived classes */
  };

  getPermissions = (): Promise<UserPermissions> => {
    return Rest.get({ path: "v2/User/effective-permissions" });
  };

  isInternalUser = () => {
    /* Implemented in derived classes */
  };

  changePassword = (_model: ChangePassword) => {
    /* Implemented in derived classes */
  };

  resetPassword = () => {
    /* Implemented in derived classes */
  };
}

export default BaseUser;
