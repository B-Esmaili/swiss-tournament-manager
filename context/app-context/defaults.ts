import { AppContextModel } from "./types";

let Defaults: AppContextModel = {
  userInfo: {
    id: "1000",
  },
  notifications: [],
  siteMap: [],
  currentLang: {
    name: "en",
    displayName: "EN",
  },
  languageList: [
    {
      name: "en",
      displayName: "EN",
    },
    {
      name: "fr",
      displayName: "FR",
    }
  ],
};

export default Defaults;
