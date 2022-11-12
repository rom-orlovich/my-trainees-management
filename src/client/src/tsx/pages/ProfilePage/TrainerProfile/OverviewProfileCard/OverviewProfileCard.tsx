import React from "react";
import { Link } from "react-router-dom";
import { PropsBasic } from "../../../../components/baseComponents/baseComponentsTypes";
import Card from "../../../../components/baseComponents/Card/Card";
import { genClassName } from "../../../../utilities/helpersFun";
import { TrainerProfileProps } from "../TrainerProfile";
import style from "./OverviewProfileCard.module.scss";

function OverviewProfileCard({
  className,
  heading,
  children,

  StatsLink,
}: PropsBasic & {
  heading?: string;
  StatsLink?: { statsPagePath: string; text: string };
}) {
  return (
    <Card className={genClassName(className, style.overview_container)}>
      {heading && <h2>{heading}</h2>}

      <div className={genClassName(className, style.overview_content)}>
        {children}
      </div>
      {StatsLink && <Link to={StatsLink.statsPagePath}>{StatsLink.text}</Link>}
    </Card>
  );
}

export default OverviewProfileCard;
