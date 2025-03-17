import { IonApp, IonMenu, setupIonicReact } from "@ionic/react";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
/* Optional CSS utils that can be commented out */
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "./styles.scss";
/* Theme variables */
import { menuController } from "@ionic/core/components";
import Drawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import {
  ArsaLoader,
  ArsaMenu,
  ArsaSpinner,
  EventService,
  HttpService,
  LocalStorageEncryptService,
  UtilService,
  init,
  useDeviceDetect,
  useMenuOpen,
  usePipeDate,
  useTheme,
  useUserSession,
  subscriptions,
} from "arsa";
/* import {
  ArsaLoader,
  ArsaMenu,
  ArsaSpinner,
  EventService,
  HttpService,
  LocalStorageEncryptService,
  UtilService,
  init,
  useDeviceDetect,
  useMenuOpen,
  usePipeDate,
  useTheme,
  useUserSession,
  subscriptions,
} from "../../custom"; */
import "arsa/dist/style.css";
import { useTranslation } from "react-i18next";
import { LoginRoute } from "./Login.route";
import { ProtectedRoute } from "./Protected.route";
import logo from "./assets/imgs/dice.png";
import {
  SYSTEM_CONSTANTS,
  eventKeys,
} from "./environment/environment";
import NotFound from "./pages/404/not-found";
import { routes } from "./routes";
import "./theme/variables.css";
declare let XLSX;

setupIonicReact();

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  //padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${SYSTEM_CONSTANTS.drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const App = (props) => {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const { user } = useUserSession();
  const device: any = useDeviceDetect();
  const navigate = useNavigate();
  const { menuOpen, setEvent } = useMenuOpen();

  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [renderMenu, setRenderMenu] = useState(false);
  const [isOpenDrawer, setOpenDrawer] = useState(true);
  const [loader, setLoader] = useState(true);
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: "ABOUT",
      icon: "help",
      active: false,
      handle: () => {
        goToMenu("about", 0);
      },
    },

    {
      id: 1,
      name: "WhatsApp",
      icon: "chat",
      active: false,
      handle: async () => {
        await menuController.close();
        /* alertService.openModalAlert(
          t("alerts.need"),
          t("alerts.worry"),
          t("alerts.need-button"),
          () => {}
        ); */
        goToMenu("noCharge", 1, false);
      },
    },
  ]);

  useEffect(() => {
    //HttpService.get("https://www.olam-systems.com.mx/olam/utils/getCountries");
    loadTheme();
    subscribes();

    //init library

    setRenderMenu(true);

    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);

  const loadTheme = () => {

    const l: any = LocalStorageEncryptService.getFromLocalStorage("language");
    i18n.changeLanguage(l);

    const t: any = LocalStorageEncryptService.getFromLocalStorage("theme");
    if (!t) {
      LocalStorageEncryptService.setToLocalStorage("theme", "black");
    }
  };

  const subscribes = () => {
    EventService.clearSubjects({
      [eventKeys.loader]: eventKeys.loader,
      [eventKeys.menuGlobal]: eventKeys.menuGlobal,
    });

    subscriptions[eventKeys.loader] = EventService.get(
      eventKeys.loader
    ).subscribe((data: any) => {
      setMessage(data.message);
      setShow(data.show);
    });

    subscriptions[eventKeys.menuGlobal] = EventService.get(
      eventKeys.menuGlobal
    ).subscribe(async (data: any) => {
      let isOpen: any = await menuController.isOpen();
      if (data && !isOpen) {
        await menuController.open("menu-global");
      }
    });
  };

  /** */
  const goToMenu = (
    url: string,
    position: number,
    isRouting: boolean = true
  ) => {
    menuItems.forEach((element) => {
      element.active = false;
    });

    menuItems[position].active = true;
    if (isRouting) {
    }
  };

  function getTranslate(date) {
    return UtilService.replaceAll(date, "of", t("menu.of"));
  }

  const getMenu = () => {
    return (
      <section className="sidemenu" id="main-content">
        <div
          className="sidemenu-int"
          style={{
            background: theme.background,
          }}
        >
          <div
            style={{
              backgroundColor: theme.component,
            }}
            className="hdr-menu"
          ></div>

          <div className="avtr-data">
            <div className="imgn">
              <img src={logo} alt="" />
            </div>

            {user?.id && (
              <div className="user-info">
                <p
                  style={{
                    color: theme.enabledColor,
                  }}
                >
                  <strong>ID: </strong>
                  {user.id}
                </p>

                <p
                  style={{
                    color: theme.enabledColor,
                  }}
                >
                  <strong>{t("menu.last-session")}: </strong>
                  {getTranslate(
                    usePipeDate(user.last_session, "DD of MMM of YYYY")
                  )}
                </p>
              </div>
            )}
          </div>

          <ArsaMenu
            clickOnMenu={(menu) => {
              console.log(menu);
              navigate(menu.url);
            }}
          />

          <section className="cont-menu">
            {menuItems.map((m, index) => {
              return (
                <div
                  key={`menu-${index}`}
                  onClick={() => {
                    m?.handle();
                    menuController.close();
                    setOpenDrawer(false);
                  }}
                  className="itm-menu"
                >
                  <div
                    style={{
                      backgroundColor: m.active
                        ? theme.componentColor
                        : theme.component,
                    }}
                  ></div>
                  <section style={{ cursor: "pointer" }}>
                    <span
                      className="material-icons outlined"
                      style={{
                        color: theme.color,
                      }}
                    >
                      {m.icon}
                    </span>
                    <p
                      style={{
                        color: theme.color,
                      }}
                    >
                      {t(m.name)}
                    </p>
                  </section>
                </div>
              );
            })}
          </section>

          <div
            className="close-menu"
            onClick={() => {
              console.log("close");

              menuController.toggle();
              setOpenDrawer(false);
            }}
          >
            <span
              className="material-icons outlined"
              style={{
                color: theme.color,
              }}
            >
              close
            </span>
          </div>
        </div>
      </section>
    );
  };

  function masive() {
    let id: any = document.getElementById("file-hdn");
    id.click();
  }

  function fileChange(evt: any) {
    let file: any = evt?.target?.files[0];
    //console.log(file);

    if (
      file &&
      file?.type !=
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
      file?.type != "text/csv"
    ) {
    } else {
      let reader = new FileReader();

      reader.onload = (e: any) => {
        let data = e.target.result;
        let workbook = XLSX.read(data, {
          type: "binary",
        });

        let sheet = workbook.SheetNames[0]; //.forEach( (sheetName)=> {
        // Here is your object
        let XL_row_object = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheet]
        );

        //console.log(this.catalogType);

        excel(XL_row_object);
        //})
      };

      reader.onerror = (ex) => {
        //console.log(ex);
      };

      reader.readAsBinaryString(file);
    }
  }

  async function excel(row: any) {
    //console.log(row);
    for (const r of row) {
      let json:any = {
        ...r
      };
      let sql:string = `INSERT INTO catalog (id_catalog_type,id_industry,description,name,create_date,dumy_property,visible)VALUES (7,1,'${r.es}','${r.en}',now(),'${JSON.stringify(json)}',1);`;
      console.log(sql);
      
      //await this.sqlGenericService.excecuteQueryStringReference(sql, "updateFileVersion").toPromise();
    }
  }

  return (
    <>
      {show ? <ArsaLoader message={message} /> : <></>}
      {device?.isMobile ? (
        <IonMenu
          contentId="main-content"
          menuId="menu-global"
          className="my-custom-menu"
          swipeGesture={false}
        >
          {getMenu()}

          {!device?.isMobile ? (
            <>
              <Routes>
                {routes.map((route:any, index) => {
                  return (
                    <Route
                      key={`menu-${index}`}
                      path={route.path}
                      element={
                        route?.isInit ? (
                          <LoginRoute>
                            <route.Component />
                          </LoginRoute>
                        ) : !route.isPublic ? (
                          <ProtectedRoute>
                            <route.Component />
                          </ProtectedRoute>
                        ) : (
                          <route.Component />
                        )
                      }
                    />
                  );
                })}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </>
          ) : (
            <></>
          )}
        </IonMenu>
      ) : (
        <></>
      )}

      {device?.isMobile ? (
        <IonApp>
          <Routes>
            {routes.map((route:any) => {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    route.isInit ? (
                      <LoginRoute>
                        <route.Component />
                      </LoginRoute>
                    ) : !route.isPublic ? (
                      <ProtectedRoute>
                        <route.Component />
                      </ProtectedRoute>
                    ) : (
                      <route.Component />
                    )
                  }
                />
              );
            })}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </IonApp>
      ) : (
        <></>
      )}

      {!device?.isMobile ? (
        <IonApp>
          <Drawer
            sx={{
              width: SYSTEM_CONSTANTS.drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: SYSTEM_CONSTANTS.drawerWidth,
                boxSizing: "border-box",
              },
            }}
            variant="persistent"
            anchor="left"
            open={menuOpen}
          >
            {getMenu()}
          </Drawer>

          <Main open={!menuOpen}>
            <Routes>
              {routes.map((route:any) => {
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={
                      route.isInit ? (
                        <LoginRoute>
                          <route.Component />
                        </LoginRoute>
                      ) : !route.isPublic ? (
                        <ProtectedRoute>
                          <route.Component />
                        </ProtectedRoute>
                      ) : (
                        <route.Component />
                      )
                    }
                  />
                );
              })}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Main>
        </IonApp>
      ) : (
        <></>
      )}

      <section className={`animated load ${!loader ? "fadeOutDown" : ""}`}>
        <div className="box-load">
          <section className="cn-img">
            <img src={logo} />
          </section>
          <ArsaSpinner name={"dots"} extraClass="clr" />
        </div>
      </section>

      <div
        style={{
          visibility: "hidden",
          position: "absolute",
        }}
      >
        <button
          onClick={() => {
            masive();
          }}
        >
          excelEmpleoMedicApp
        </button>
      </div>

      <input
        type="file"
        id="file-hdn"
        onChange={(e) => {
          fileChange(e);
        }}
        style={{
          visibility: "hidden",
        }}
      />
    </>
  );
};

export default App;
