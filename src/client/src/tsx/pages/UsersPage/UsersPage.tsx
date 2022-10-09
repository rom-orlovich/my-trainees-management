import React, { useEffect, useState } from "react";
import UsersTable from "./UsersTable";
import { Link } from "react-router-dom";
import { APP_ROUTE } from "../../routes/routesConstants";
import AutocompleteInput from "../../components/baseComponents/RHF-Components/AutocompleteInput/AutocompleteInput";
import { TraineesTableExtendsAPI, UserAPI } from "../../redux/api/interfaceAPI";
import { traineesApi, usersApi } from "../../redux/api/hooksAPI";
import page_style from "../Page.module.scss";
import { useAppSelector } from "../../redux/hooks";
import { getAuthState } from "../../redux/slices/authSlice";

function UsersPage() {
  const [user, setUser] = useState<string[]>(["", ""]);
  const authSliceState = useAppSelector(getAuthState);
  // const queriesOptions = { user: authSliceState.user?.user_id };
  return (
    <section className={page_style.page_container}>
      <div className={page_style.page_header}>
        <AutocompleteInput<UserAPI>
          keys={["username"]}
          id={"user_id"}
          // queriesOptions={queriesOptions}
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
        {/* <span>
          <Link
            to={`/${APP_ROUTE.TRAINEES_ROUTE}/${APP_R}`}
          >
            Add Trainee
          </Link>
        </span> */}
      </div>
      <div className={page_style.page_main_content}>
        <UsersTable mainName={user[1]} />
      </div>
    </section>
  );
}

export default UsersPage;
