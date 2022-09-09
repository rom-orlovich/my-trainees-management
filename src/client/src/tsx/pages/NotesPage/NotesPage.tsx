import React, { useState } from "react";
import { Link } from "react-router-dom";
import AutocompleteInput from "../../components/baseComponents/RHF-Components/AutocompleteInput/AutocompleteInput";
import { notesAPI } from "../../redux/api/hooksAPI";
import { NotesTable as NotesTableAPi } from "../../redux/api/interfaceAPI";
import MainRoute from "../../routes/MainRoute";

import { APP_ROUTE } from "../../routes/routesConstants";
import page_style from "../Page.module.scss";
import NotesTable from "./NotesTable";

function NotesPage() {
  const [note, setNote] = useState<string[]>(["", ""]);
  return (
    <MainRoute mainRoutes={APP_ROUTE.NOTES_ROUTE}>
      <section className={page_style.page_container}>
        <div className={page_style.page_header}>
          <AutocompleteInput<NotesTableAPi>
            keys={["name_topic"]}
            id={"note_id"}
            loadingSpinnerResult={{ nameData: "Notes" }}
            setSelectOptionValue={setNote}
            useGetData={notesAPI.useGetItemsQuery}
            InputLabelProps={{
              InputProps: { placeholder: "Note Topic" },
              LabelProps: {
                labelText: "Search Note Topic",
                htmlFor: "NoteTopicSearch",
              },
            }}
          />

          <span>
            <Link to={`${APP_ROUTE.NOTES_ROUTE_ADD}`}>Add Note</Link>
          </span>
        </div>
        <div className={page_style.page_main_content}>
          <NotesTable name={note[1]} />
        </div>
      </section>
    </MainRoute>
  );
}

export default NotesPage;
