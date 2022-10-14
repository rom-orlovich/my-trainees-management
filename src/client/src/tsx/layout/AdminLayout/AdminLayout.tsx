import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/layoutComponents/Header/Header";
import SideBar from "../../components/layoutComponents/SideBar/SideBar";
import style from "../Layout.module.scss";
import { ADMIN_NAV_BAR_LINKS } from "../NavBarLinks";
import { ADMIN_SIDE_BAR_LINKS } from "../SideBarLinks";

function AdminLayout() {
  return (
    <>
      <Header navBarLinks={ADMIN_NAV_BAR_LINKS} className={style.header} />
      <main className={style.main_layout}>
        <SideBar
          sideBarLinks={ADMIN_SIDE_BAR_LINKS}
          className={style.side_bar}
        />
        <section className={style.main_content}>
          <Outlet />
        </section>
      </main>
    </>
  );
}

export default AdminLayout;
