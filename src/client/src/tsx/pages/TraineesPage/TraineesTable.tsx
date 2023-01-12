/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
import React from "react";
import { Link } from "react-router-dom";

import { FaFemale, FaMale } from "react-icons/fa";
import { TablePagination } from "../../components/baseComponents/Tables/TablePagination";
import { traineesApi } from "../../redux/api/hooksAPI";
import { TraineesTableExtendsAPI } from "../../redux/api/interfaceAPI";

import InsteadOutletRoutes from "../../routes/components/InsteadOutletRoutes";
import { APP_ROUTE } from "../../routes/appRoutesConstants";
import { deleteFunMutation } from "../../utilities/helpersFun";

export const transformDataTrainee = (arg: TraineesTableExtendsAPI) => {
  const {
    username,
    location_id,
    user_id,
    profile_id,
    birthday,
    identify_num,
    street,
    phone_number,
    city_name,
    email,
    date_join,
    last_name,
    first_name,
    trainee_id,
    trainer_user_id,
    measure_id,
    gender,
    ...rest
  } = arg;

  // TODO: try to remove the username from the url.
  // The username query param is used in userDetails in trainee's profile.
  const maleIcon = (
    <FaMale style={{ color: "rgb(121 195 248)", fontSize: "1.5rem" }} />
  );
  const femaleIcon = (
    <FaFemale style={{ color: " rgb(244 154 204)", fontSize: "1.5rem" }} />
  );
  return {
    id: arg.trainee_id,
    full_name: (
      <Link
        to={`/${
          APP_ROUTE.PROFILE_ROUTE
        }?profileID=${profile_id}&traineeID=${trainee_id}${
          username ? `&username=${username}` : ""
        }`}
      >
        {`${arg.first_name} ${arg.last_name}`}
      </Link>
    ),
    gender:
      gender === "male" ? (
        maleIcon
      ) : gender === "female" ? (
        femaleIcon
      ) : (
        <>
          {maleIcon} {femaleIcon}
        </>
      ),
    ...rest,
  };
};
export interface PageTableProps {
  mainName?: string;
}
function TraineesTable({
  mainName,
  queriesOptions,
}: PageTableProps & { queriesOptions?: Record<string, any> }) {
  const { useGetItemsQuery, useDeleteItemMutation } = traineesApi;
  const [deleteItem] = useDeleteItemMutation();

  return (
    <InsteadOutletRoutes
      InsteadOutletRoutesPaths={[APP_ROUTE.TRAINEES_ROUTE, ""]}
    >
      <TablePagination<TraineesTableExtendsAPI>
        editPagePath={`${APP_ROUTE.PROFILE_ROUTE}/${APP_ROUTE.TRAINEES_ROUTE}`}
        queriesOptions={{ mainName, ...queriesOptions }}
        nameData={"Trainees"}
        transformFun={transformDataTrainee}
        getAllQuery={useGetItemsQuery}
        deleteItemFun={(id) => deleteFunMutation(id, deleteItem)}
      />
    </InsteadOutletRoutes>
  );
}

export default TraineesTable;
