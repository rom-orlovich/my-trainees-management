import React, { useState } from "react";
import UsersTable from "./UsersTable";

import AutocompleteInput from "../../components/baseComponents/RHF-Components/AutocompleteInput/AutocompleteInput";
import { User } from "../../redux/api/interfaceAPI";
import { usersApi } from "../../redux/api/hooksAPI";
import page from "../Page.module.scss";

function UsersPage() {
  const [user, setUser] = useState<string[]>(["", ""]);

  return (
    <section className={page.page_container}>
      <div className={page.page_header}>
        <AutocompleteInput<User>
          keys={["username"]}
          id={"user_id"}
          loadingSpinnerResult={{ nameData: "User" }}
          setSelectOptionValue={setUser}
          useGetData={usersApi.useGetItemsQuery}
          InputLabelProps={{
            InputProps: { placeholder: "Username" },
            LabelProps: {
              labelText: "Search Username",
              htmlFor: "userNameSearch",
            },
          }}
        />
      </div>
      <div className={page.page_main_content}>
        <UsersTable mainName={user[1]} />
      </div>
    </section>
  );
}

export default UsersPage;
