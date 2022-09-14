/* eslint-disable */
export default {
  displayName: "mov-fe-lib-ide-core",
  preset: "../../jest.preset.js",
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  coverageDirectory: "../../coverage/libs/mov-fe-lib-ide",
};
