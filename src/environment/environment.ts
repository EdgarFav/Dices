export const path = "http://localhost/medicappapi/";
export const gym = "medic/";
export const emulate:boolean = false;
export const idEmpresa:number = 1;//This is ARSA

export const environment = {
  genericQuerie: `${path}${gym}generic-querie`,
  petition: `${path}${gym}petition/`,
}

export const themeData = {
  blueStrong: {
    background: "#154d5e",
    color: "#f2f2f2",
    disabledColor: "#ddd4d4",
    enabledColor: "#ffffff",
    component: "#03454f",
    alert_class: "theme1",
    componentColor: "#f2f2f2",
    primaryColorTab: "primary7",
    primaryColorTabs: "primary",
    primaryTabLetter: "light",
    sheet: "sheet1"
  },
  black: {
    background: "#484848",
    color: "#f2f2f2",
    disabledColor: "#ddd4d4",
    enabledColor: "#ffffff",
    component: "#242525",
    alert_class: "theme2",
    componentColor: "#f2f2f2",
    primaryColorTab: "primary8",
    primaryColorTabs: "primary2",
    primaryTabLetter: "light",
    sheet: "sheet2"
  },
  blue: {
    background: "#ec0000",
    color: "#f2f2f2",
    disabledColor: "#ddd4d4",
    enabledColor: "#ffffff",
    component: "#4184f7",
    alert_class: "theme3",
    componentColor: "#f2f2f2",
    primaryColorTab: "primary9",
    primaryColorTabs: "primary3",
    primaryTabLetter: "light",
    sheet: "sheet3"
    //#75a9fd
  },
  purple: {
    background: "#530751",
    color: "#f2f2f2",
    disabledColor: "#ddd4d4",
    enabledColor: "#ffffff",
    component: "#310130",
    alert_class: "theme4",
    componentColor: "#f2f2f2",
    primaryColorTab: "primary10",
    primaryColorTabs: "primary4",
    primaryTabLetter: "light",
    sheet: "sheet4"
  },
  green: {
    background: "#316643",
    color: "#FFF",
    disabledColor: "#ddd4d4",
    enabledColor: "#ffffff",
    component: "#53a16e",
    componentColor: "#e3e3e3",
    alert_class: "theme5",
    primaryColorTab: "primary11",
    primaryColorTabs: "primary5",
    primaryTabLetter: "dark",
    sheet: "sheet5"
  },
  white: {
    background: "#bcbcbc",
    color: "#1d1d1d",
    disabledColor: "#ddd4d4",
    enabledColor: "#ffffff",
    component: "#6f6f6f",
    alert_class: "theme6",
    componentColor: "#f2f2f2",
    primaryColorTab: "primary12",
    primaryColorTabs: "primary6",
    primaryTabLetter: "light",
    sheet: "sheet6"
  }
}

export const eventKeys = {
  loader: "loader",
  closeDrawer: "closeDrawer",
  menuGlobal: "menuGlobal",
}

export const localStorageKeys = {
  menuOpen: "menuOpen"
}

export const SYSTEM_CONSTANTS = {
  mobileMinimum: 900,
  drawerWidth: 300,
  loginTemplate: "Arsa Consulting"
}