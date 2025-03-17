import React, { useEffect } from "react";
import "./not-found.scss";
import { useTranslation } from "react-i18next";
import gif from "../../assets/imgs/gifs/404.gif";
import { ArsaButton, ThemeService, useTheme } from "arsa";

const themeService: ThemeService = new ThemeService();

const NotFound: React.FC<any> = ({}) => {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();

  return (
    <section className="not-found">
      <img src={gif} />

      <div
        style={{
          width: "300px",
          marginTop: "30px",
        }}
      >
        <ArsaButton onClick={() => {}}>{i18n.t("init.go-home")}</ArsaButton>
      </div>
    </section>
  );
};

export default NotFound;
