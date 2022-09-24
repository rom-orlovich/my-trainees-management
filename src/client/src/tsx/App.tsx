import { Outlet } from "react-router-dom";
import Main from "./layout/Main/Main";
import Header from "./layout/Header/Header";
import SideBar from "./layout/SideBar/SideBar";
import style from "./App.module.scss";
import ModelDialog from "./components/baseComponents/Model/ModelDialog";
function App() {
  // Basic layout of the app.
  return (
    <>
      <ModelDialog />
      <Header className={style.header} />

      <Main className={style.main_layout}>
        <SideBar className={style.side_bar} />
        <section className={style.main_content}>
          <Outlet />
        </section>
      </Main>
    </>
  );
}

export default App;
