import { menuController } from "@ionic/core/components";
import { useIonModal } from "@ionic/react";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import React, { useState } from "react";
import { LocalStorageEncryptService, useTheme, useMenuOpen, useDeviceDetect, EventService, environment } from "arsa";
import "./arsa-header.scss";
import { ArsaSettings } from "../arsa-settings/ArsaSettings";



export function ArsaHeader({
  extraClass = "",
  customId = "",
  customLeftButton = "",
  isModal = false,
  backActive = false,
  menuActive = true,
  backAction = ()=>{
  },
  hasCog = true,
  customLeftButtonAction = ()=>{},
  closeModal = ()=>{},
  title = "",
  applyPadding = false,
}) {
  const { theme } = useTheme();
  
  const { menuOpen, setEvent } = useMenuOpen();
  const device: any = useDeviceDetect();

  const [present, dismiss] = useIonModal(ArsaSettings, {
    onDismiss: (data: string, role: string) => dismiss(data, role),
  });

  const [modal, modalCtrl] = useState(null);

  const back = () => {
    if (backAction != null) {
      backAction();
    } else {
      window.history.back;
    }
  };

  const openMenu = async () => {
    EventService.send("menuGlobal", true);
    setEvent(LocalStorageEncryptService.getFromLocalStorage("menuOpen"));
  };

  const close = async () => {
    EventService.send("menuGlobal", false);
    await menuController.open("menu-global");
  };

  const openConfiguration = async () => {
    present({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
        if (ev.detail.role === "confirm") {
        }
      },
    });
  };

  return (
    <header
      className={`arsa-header ${extraClass}`}
      style={{
        backgroundColor: theme.background,
        left: device?.isMobile
          ? "0px"
          : menuOpen && applyPadding
          ? `${environment.SYSTEM_CONSTANTS.drawerWidth}px`
          : "0px",
        width: device?.isMobile
          ? "100%"
          : menuOpen && applyPadding
          ? `calc(100% - ${environment.SYSTEM_CONSTANTS.drawerWidth}px)`
          : "100%",
      }}
      id={customId ?? "container-app"}
    >
      {!isModal && backActive && !menuActive && (
        <div
          className="back-button"
          style={{
            borderColor: theme.color,
          }}
          onClick={() => {
            back ? back() : null;
          }}
        >
          <span
            className="material-icons-outlined"
            style={{
              color: theme.color,
            }}
          >
            chevron_left
          </span>
        </div>
      )}

      {customLeftButton.length > 0 && (
        <div
          className="back-button"
          style={{
            borderColor: theme.color,
          }}
          onClick={() => {
            customLeftButtonAction ? customLeftButtonAction() : null;
          }}
        >
          <span
            className="material-icons-outlined"
            style={{
              color: theme.color,
            }}
          >
            {customLeftButton}
          </span>
        </div>
      )}

      {!isModal && !backActive && menuActive && (
        <div
          className="back-button"
          style={{
            borderColor: theme.color,
          }}
          onClick={() => {
            openMenu();
          }}
        >
          <span
            className="material-icons-outlined"
            style={{
              color: theme.color,
            }}
          >
            {device?.isMobile ? "menu" : menuOpen ? "first_page" : "menu"}
          </span>
        </div>
      )}

      {!isModal && hasCog && (
        <div
          className="search-button"
          style={{
            borderColor: theme.color,
          }}
          onClick={() => {
            openConfiguration();
          }}
        >
          <span
            className="material-icons-outlined"
            style={{
              color: theme.color,
            }}
          >
            settings
          </span>
        </div>
      )}

      {isModal && (
        <div
          className="search-button"
          style={{
            borderColor: theme.color,
          }}
          onClick={() => {
            closeModal();
          }}
        >
          <span
            className="material-icons-outlined"
            style={{
              color: theme.color,
            }}
          >
            close
          </span>
        </div>
      )}

      <p
        className="title"
        id="hdTitle"
        style={{
          color: theme.color,
        }}
      >
        {title}
      </p>
    </header>
  );
};