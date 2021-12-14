import React from "react";
import DetailsMenu from "../_shared/DetailsMenu/DetailsMenu";
import AddImport from "./dialogs/AddImport";
import {
  Collapse,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Tooltip,
  Divider
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles(theme => ({
  itemValue: {
    padding: "15px 15px 15px 25px",
    fontSize: 14
  },
  itemLibValue: {
    paddingLeft: 10,
    "& span": {
      fontSize: 14
    }
  },
  disabled: {
    color: "gray"
  }
}));

const ACTIVE_ITEM = {
  imports: 1,
  message: 2
};

const Menu = props => {
  // Props
  const {
    call,
    scope,
    name,
    details,
    data,
    editable = true,
    isNew = true
  } = props;
  // State hook
  const [activeItem, setActiveItem] = React.useState(0);
  const [selectedLibs, setSelectedLibs] = React.useState();
  // Style hook
  const classes = useStyles();

  //========================================================================================
  /*                                                                                      *
   *                                 Document Functions                                   *
   *                                                                                      */
  //========================================================================================

  const deleteImport = pyLib => {
    console.log("debug delete pyLib", pyLib);
  };

  const addImports = React.useCallback(() => {
    console.log("debug addImports", selectedLibs);
  }, [selectedLibs]);

  const setMessage = message => {
    console.log("debug setMessage", message);
  };

  const _onSelectedLibs = libs => {
    console.log("debug _onSelectedLibs", libs);
    setSelectedLibs(libs);
  };

  //========================================================================================
  /*                                                                                      *
   *                                   Handle Events                                      *
   *                                                                                      */
  //========================================================================================

  const handleEditMessageClick = () => {
    console.log("debug handleEditMessageClick", setMessage);
  };

  const handleAddImportsClick = () => {
    call(
      "dialog",
      "custom",
      {
        title: "Add import",
        submitText: "Add",
        onSubmit: addImports,
        onSelectionChange: _onSelectedLibs,
        scope: scope,
        call: call
      },
      AddImport
    );
  };

  /**
   * Handle expand/collapse action
   *  If item is collapsed : Expand item and collapse other
   *  If item is expanded  : Collapse item and let all others collapsed as well
   * @param {*} _activeItem
   */
  const handleExpandClick = _activeItem => {
    setActiveItem(prevState => {
      if (prevState === _activeItem) return 0;
      else return _activeItem;
    });
  };

  //========================================================================================
  /*                                                                                      *
   *                                 Private methods                                      *
   *                                                                                      */
  //========================================================================================

  /**
   * Check if collapse item is expanded
   * @param {integer} _item : Collapse item id
   * @returns {boolean} True if collapse item is expanded, False otherwise
   */
  const _isActive = _item => {
    return activeItem === _item;
  };

  /**
   * Get name to be rendered in import row
   * @param {string} key
   * @param {string} libClass
   * @param {string} libModule
   * @returns {string} Lib title to be rendered in import row
   */
  const _getComposedName = (key, libClass, libModule) => {
    if (libClass === undefined) {
      return key === libModule
        ? "import " + libModule
        : "import " + libModule + " as " + key;
    } else {
      return key === libClass
        ? "from " + libModule + " import " + libClass
        : "from " + libModule + " import " + libClass + " as " + key;
    }
  };

  /**
   * Get the list of imports
   */
  const _getImportsList = () => {
    const pyLibs = data.pyLibs || {};
    const importList = [];

    Object.keys(pyLibs).forEach(key => {
      const lib = pyLibs[key];
      const libModule = lib.Module ? lib.Module : undefined;
      const libClass = lib.Class ? lib.Class : undefined;
      const name_composed = _getComposedName(key, libClass, libModule);
      const obj = { name: name_composed, key: key };
      if (libModule) importList.push(obj);
    });

    return importList;
  };

  //========================================================================================
  /*                                                                                      *
   *                                   Render Functions                                   *
   *                                                                                      */
  //========================================================================================

  /**
   * Get Imports
   * @returns {ReactElement} React element to be rendered in Imports collapse item
   */
  const getImports = () => {
    const pyLibs = _getImportsList();
    return pyLibs.length > 0 ? (
      pyLibs.map((pyLib, index) => {
        return (
          <Typography key={"imports_" + index}>
            <Divider />
            <ListItem>
              <ListItemText
                className={classes.itemLibValue}
                primary={pyLib.name}
              />
              <ListItemSecondaryAction>
                <Tooltip title>
                  <IconButton edge="end" onClick={() => deleteImport(pyLib)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
          </Typography>
        );
      })
    ) : (
      <Typography className={`${classes.itemValue} ${classes.disabled}`}>
        No imports
      </Typography>
    );
  };

  /**
   * Get Callback message
   * @returns {ReactElement} React element to be rendered in Message collapse item
   */
  const getMessage = () => {
    return data.message ? (
      <Typography className={classes.itemValue}>{data.message}</Typography>
    ) : (
      <Typography className={`${classes.itemValue} ${classes.disabled}`}>
        No message defined
      </Typography>
    );
  };

  return (
    <div>
      <DetailsMenu name={name} details={details}></DetailsMenu>
      <List>
        {/* ============ IMPORTS ============ */}
        <ListItem button onClick={() => handleExpandClick(ACTIVE_ITEM.imports)}>
          <ListItemText primary="Imports" />
          <IconButton
            disabled={!editable || isNew}
            onClick={e => {
              e.stopPropagation();
              handleAddImportsClick();
            }}
          >
            <AddIcon />
          </IconButton>
          {_isActive(ACTIVE_ITEM.imports) ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={_isActive(ACTIVE_ITEM.imports)} unmountOnExit>
          {getImports()}
          <Divider />
        </Collapse>
        {/* ============ MESSAGE ============ */}
        <ListItem button onClick={() => handleExpandClick(ACTIVE_ITEM.message)}>
          <ListItemText primary="Message" />
          <IconButton
            disabled={!editable || isNew}
            onClick={e => {
              e.stopPropagation();
              handleEditMessageClick();
            }}
          >
            <EditIcon />
          </IconButton>
          {_isActive(ACTIVE_ITEM.message) ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={_isActive(ACTIVE_ITEM.message)} unmountOnExit>
          {getMessage()}
          <Divider />
        </Collapse>
      </List>
    </div>
  );
};

export default Menu;
