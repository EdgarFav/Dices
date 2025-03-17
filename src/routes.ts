//import CardCrudRegisters from "./pages/CardCrudRegisters/CardCrudRegisters";
import ArsaLayoutTabs from "./pages/LayoutTabs/ArsaLayoutTabs";
//import ArsaLogin from "./pages/Login/ArsaLogin";

export const routes = [
  {
    to: "/",
    path: "",
    Component: ArsaLayoutTabs,
    isPublic: false,
    isInit:true,
    extraData: {},
  },
  {
    to: "/home",
    path: "/home",
    Component: ArsaLayoutTabs,
    isPublic: true,
    extraData: {},
  },
];
