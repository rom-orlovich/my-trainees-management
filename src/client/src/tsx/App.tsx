import { Outlet } from "react-router-dom";

import Header from "./components/layoutComponents/Header/Header";

import style from "./App.module.scss";
// import ModelAlerts from "./components/baseComponents/Model/ModelAlerts";
import SideBar from "./components/layoutComponents/SideBar/SideBar";

function App() {
  // Basic layout of the app.
  return (
    <>
      {/* <ModelAlerts /> */}
      <Header className={style.header} />
      <main className={style.main_layout}>
        <SideBar className={style.side_bar} />
        <section className={style.main_content}>
          <Outlet />
        </section>
      </main>
    </>
  );
}

export default App;
