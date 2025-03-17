import React, { useEffect, useState } from "react";
import alemania from "../../assets/imgs/languages/alemania.png";
import espana from "../../assets/imgs/languages/espana.png";
import japon from "../../assets/imgs/languages/japon.png";
import porcelana from "../../assets/imgs/languages/porcelana.png";
import reinoUnido from "../../assets/imgs/languages/reino-unido.png";
import "./arsa-settings.scss";
import {
  useTheme,
  ArsaContainer,
  LocalStorageEncryptService,
  EventService,
  AlertService,
  ThemeService,
} from "arsa";
import { ArsaHeader } from "../arsa-header/ArsaHeader";
import { useTranslation } from "react-i18next";
import i18n from "../../services/Translate.service";

export const ArsaSettings: React.FC<any> = ({
  onDismiss,
  translator,
}: {
  onDismiss: (data?: string | null | undefined | number, role?: string) => void;
  translator: any;
}) => {
  const { theme, setUpdate, setEvent } = useTheme();

  const { t } = useTranslation();

  const [themes, setThemes] = useState([
    {
      id: 1,
      theme: "blueStrong",
    },
    {
      id: 2,
      theme: "green",
    },
    {
      id: 3,
      theme: "blue",
    },
    {
      id: 4,
      theme: "purple",
    },
    {
      id: 5,
      theme: "white",
    },
    {
      id: 6,
      theme: "black",
    },
  ]);

  const [languages, setLanguages] = useState([
    {
      id: 1,
      language: "es",
      icon: espana,
    },
    {
      id: 2,
      language: "en",
      icon: reinoUnido,
    },
    {
      id: 3,
      language: "de",
      icon: alemania,
    },
    {
      id: 4,
      language: "ja",
      icon: japon,
    },
    {
      id: 5,
      language: "zh",
      icon: porcelana,
    },
  ]);

  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(LocalStorageEncryptService.getFromLocalStorage("userSessionMedic"));
  }, []);

  const changeTheme = (theme: any) => {
    LocalStorageEncryptService.setToLocalStorage("theme", theme.theme);
    setEvent(new Date().getTime());
    LocalStorageEncryptService.setToLocalStorage("themeClass", theme.theme);
  };

  const changeLanguage = (language: any) => {
    let languageSelected:string = language.language.toString();
    LocalStorageEncryptService.setToLocalStorage("language", languageSelected);
    i18n.changeLanguage(language.language);

    EventService.send("translate", null);
  };

  const cerrarSesion = () => {
    onDismiss(null, "cancel");
    AlertService.bottomModalsActions(
      t("options.close-s"),
      t("options.confirm"),
      t("alerts.accept"),
      () => {
        LocalStorageEncryptService.clearProperty("userSessionMedic");
        //history.push('/dashboard/users/1');
      }
    );
  };

  const goToProfile = () => {};

  return (
    <>
      <ArsaHeader
        hasCog={false}
        isModal={true}
        closeModal={() => {
          onDismiss(1, "confirm");
        }}
        title={t("options.title")}
      />

      <ArsaContainer customId={"main-content"}>
        <section className="opciones">
          <p
            className="title"
            style={{
              color: theme.color,
            }}
          >
            {t("options.theme")}
          </p>

          <div className="themes">
            {themes.map((theme, index) => {
              return (
                <section className="theme" key={`kk-${index}`}>
                  <div
                    style={{
                      backgroundColor: ThemeService.getTheme(theme.theme)
                        ?.component,
                    }}
                    className="around"
                    onClick={() => {
                      changeTheme(theme);
                    }}
                  ></div>
                </section>
              );
            })}
          </div>

          <p
            className="title"
            style={{
              color: theme.color,
            }}
          >
            {t("options.language")}
          </p>

          <div className="themes">
            {languages.map((language, index) => {
              return (
                <section className="theme" key={`k-${index}`}>
                  <div
                    className="around"
                    onClick={() => {
                      changeLanguage(language);
                    }}
                  >
                    <img src={language.icon} />
                  </div>
                </section>
              );
            })}
          </div>

          {/* {user && (
            <div
              className="closed"
              onClick={() => {
                goToProfile();
              }}
            >
              <p
                className="title"
                style={{
                  color: theme.color,
                }}
              >
                {t("options.profile")}
              </p>
            </div>
          )}

          {user && (
            <div
              className="closed"
              onClick={() => {
                cerrarSesion();
              }}
            >
              <p
                className="title"
                style={{
                  color: theme.color,
                }}
              >
                {t("options.close")}
              </p>
            </div>
          )} */}
        </section>
      </ArsaContainer>
    </>
  );
};
