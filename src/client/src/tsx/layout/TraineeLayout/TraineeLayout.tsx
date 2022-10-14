import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/layoutComponents/Header/Header";
import SideBar from "../../components/layoutComponents/SideBar/SideBar";
import style from "../Layout.module.scss";
import { TRAINEE_NAV_BAR_LINKS } from "../NavBarLinks";
import { TRAINEE_SIDE_BAR_LINKS } from "../SideBarLinks";

function TraineeLayout() {
  return (
    <>
      <Header navBarLinks={TRAINEE_NAV_BAR_LINKS} className={style.header} />
      <main className={style.main_layout}>
        <SideBar
          sideBarLinks={TRAINEE_SIDE_BAR_LINKS}
          className={style.side_bar}
        />
        <section className={style.main_content}>
          <Outlet />
        </section>
      </main>
    </>
  );
}

export default TraineeLayout;
