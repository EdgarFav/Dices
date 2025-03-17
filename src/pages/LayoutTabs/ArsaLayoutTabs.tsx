import React, { useEffect, useState } from "react";
import "./arsa-layout-tabs.scss";
import Home from "../Home";
//import Catalogs from "../Catalogs/Catalogs";

import { ArsaTabs, Tabs, ThemeService } from "arsa";
import HeadTails from "../head-tails/head-tails";
import EightBall from "../eight-ball/eight-ball";

const ArsaLayoutTabs: React.FC<any> = () => {
  const [tabs, setTabs] = useState<Array<Tabs>>([
    {
      title: "home.flip",
      icon: "flip",
      active: false,
      component: <HeadTails />,
      url: "about",
      reload: true,
    },
    {
      title: "home.dices",
      icon: "casino",
      active: false,
      component: <Home />,  
      url: "about",
      reload: true,
    },
    
    {
      title: "home.eight",
      icon: "help",
      active: false,
      component: <EightBall />,
      url: "about",
      reload: true,
    },   
    
    /* {
      title: "home.test",
      icon: "home",
      active: false,
      component: <Registro />,
      url: "about",
      reload: true,
    },
    {
      title: "home.test2",
      icon: "home",
      active: false,
      component: <Home />,
      url: "about",
      reload: true,
    }, */
  ]);

  const [tab, setTabActive] = useState<Tabs>(tabs[0]);

  useEffect(() => {}, []);

  return (
    <>
      <section
        className="container-page ion-page"
        style={{
          backgroundColor: ThemeService.getThemeData().background,
        }}
      >
        {tab.component}
      </section>
      <ArsaTabs tabs={tabs} setTabActive={setTabActive} />
    </>
  );
};

export default ArsaLayoutTabs;
