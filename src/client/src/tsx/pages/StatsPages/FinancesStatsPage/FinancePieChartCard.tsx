import React from "react";
import { PropsBasic } from "../../../components/baseComponents/baseComponentsTypes";
import PieChartCard, {
  PieChartCardProps,
} from "../../../components/baseComponents/CardCharts/PieChartCard";
import { SelectInput } from "../../../components/baseComponents/RHF-Components/SelectInput/SelectInput";
import useOnChangeInput from "../../../hooks/useOnChangeInput";
import { ProductData } from "../../../redux/api/interfaceAPI";
import StatsPageStyle from "../StatsPages.module.scss";

function FinancePieChartCard({
  pieChartCardProps,
  datasetsValues,
  className,
}: PropsBasic & {
  pieChartCardProps: PieChartCardProps;
  datasetsValues: ProductData;
}) {
  const [{ display }, onChange] = useOnChangeInput({
    display: "totalPrice",
  });
  const displayPie = {
    amounts: { unit: "times" },
    totalPrice: { unit: "NIS" },
  };
  const curDisplay = display as keyof typeof displayPie;

  return (
    <PieChartCard
      unit={displayPie[curDisplay].unit}
      chartHeading={pieChartCardProps.chartHeading}
      className={StatsPageStyle.distribution_card_container}
      datasetsValues={datasetsValues ? datasetsValues[curDisplay] : undefined}
      labelFormatted={pieChartCardProps.labelFormatted}
    />
  );
}

export default FinancePieChartCard;
