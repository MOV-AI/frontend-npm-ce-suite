import React from "react";
import App from "./App";
import { withDefaults } from "@mov-ai/fe-lib-react";
import "./App.css";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n/i18n";
import { ThemeProvider, ApplicationTheme } from "@mov-ai/fe-lib-ide";

// import Backend from 'i18next-xhr-backend';
// import LanguageDetector from 'i18next-browser-languagedetector';
// not like to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

//****************************************************************//

function Main(props) {
  console.log(
    "███╗   ███╗ ████████╗ ██╗   ██╗         █████╗ ██╗\n" +
      "████╗ ████║ ██║   ██║ ██║   ██║        ██╔══██╗██║\n" +
      "██╔████╔██║ ██║   ██║ ██║   ██║ █████╗ ███████║██║\n" +
      "██║╚██╔╝██║ ██║   ██║  █║  ██╔╝ ╚════╝ ██╔══██║██║\n" +
      "██║ ╚═╝ ██║ ╚██████═╝   ╚███═╝         ██║  ██║██║\n"
  );

  return <App {...props} />;
}

export default withDefaults({
  name: "mov-fe-app-ide-ce",
  component: Main,
  theme: {
    provider: ThemeProvider,
    props: ApplicationTheme,
  },
  translations: {
    provider: I18nextProvider,
    i18n: i18n,
  },
});
