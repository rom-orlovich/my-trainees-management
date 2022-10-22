import React from "react";
import { PropsBasic } from "../../../components/baseComponents/baseComponentsTypes";
import Card from "../../../components/baseComponents/Card/Card";
import { genClassName } from "../../../utilities/helpersFun";

function UserDetails({ className }: PropsBasic) {
  return <Card className={genClassName(className)}>user</Card>;
}

export default UserDetails;
