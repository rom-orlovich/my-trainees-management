import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/layoutComponents/Header/Header";
import SideBar from "../../components/layoutComponents/SideBar/SideBar";
import style from "../Layout.module.scss";
import { TRAINER_NAVBAR_LINKS } from "../NavBarLinks";
import { TRAINER_SIDE_BAR_LINKS } from "../SideBarLinks";

function TrainerLayout() {
  return (
    <>
      {/* <ModelAlerts /> */}
      <Header navBarLinks={TRAINER_NAVBAR_LINKS} className={style.header} />
      <main className={style.main_layout}>
        <SideBar
          sideBarLinks={TRAINER_SIDE_BAR_LINKS}
          className={style.side_bar}
        />
        <section className={style.main_content}>
          <Outlet />
        </section>
      </main>
    </>
  );
}

export default TrainerLayout;
