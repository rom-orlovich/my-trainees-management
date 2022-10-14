import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/layoutComponents/Header/Header";
import SideBar from "../../components/layoutComponents/SideBar/SideBar";
import style from "../Layout.module.scss";
import { navBarLinksTrainer } from "../NavBarLinks";

function TrainerLayout() {
  return (
    <>
      {/* <ModelAlerts /> */}
      <Header navBarLinks={navBarLinksTrainer} className={style.header} />
      <main className={style.main_layout}>
        <SideBar className={style.side_bar} />
        <section className={style.main_content}>
          <Outlet />
        </section>
      </main>
    </>
  );
}

export default TrainerLayout;
