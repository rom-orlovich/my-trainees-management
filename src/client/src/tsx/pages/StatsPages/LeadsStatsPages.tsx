import React from "react";

function LeadsStatsPages() {
  return (
    // <Card className={genClassName(className, style.chart_profile_container)}>
    //   <LoadingSpinner
    //     message={
    //       <Link to={`/${APP_ROUTE.LEADS_ROUTE}/${APP_ROUTE.LEADS_ROUTE_ADD}`}>
    //         Add Measure
    //       </Link>
    //     }
    //     stateData={{ data, isError, isFetching, isLoading }}
    //   >
    //     {(data) => {
    //       const { stats } = data as unknown as {
    //         stats: GetCitiesGendersAgesStatsAPI;
    //       };
    //       const { calStatusHandlesRes } = stats;
    //       // const caloriesPieDisplay = {
    //       //   g: weightsDisplay,
    //       //   Kcal: caloriesDisplay,
    //       // }[state.display];
    //       return (
    //         <>
    //           <h2> Leads Handle</h2>

    //           <PieChart
    //             className={style.pie_chart}
    //             datasets={[
    //               {
    //                 label: "Leads Handle",
    //                 data: calStatusHandlesRes?.datasetsValues || [],
    //                 backgroundColor: [COLORS_CHART.GREEN, COLORS_CHART.RED],
    //                 borderColor: [COLORS_CHART.GREEN, COLORS_CHART.RED],
    //               },
    //             ]}
    //             labels={
    //               calStatusHandlesRes?.labelFormatted.map((el) => {
    //                 if (el === "notHandle") return "Not Handle";
    //                 if (el === "handle") return "Handle";
    //                 return el;
    //               }) || []
    //             }
    //             options={{
    //               plugins: {
    //                 tooltip: {
    //                   callbacks: { label: labelFormatterByUnit("Leads") },
    //                   position: "average",
    //                   padding: 10,
    //                   bodyFont: {
    //                     size: 18,
    //                   },
    //                 },
    //                 datalabels: {
    //                   align: "end",
    //                   // anchor: "end",
    //                   offset: -20,
    //                   formatter: (value, ctx) => {
    //                     console.log(ctx.dataIndex);
    //                     if (ctx.dataIndex === 1) return `Not Handle ${value}`;
    //                     return `Handle ${value}`;
    //                   },
    //                   ...PIE_CHART_FONTS,
    //                 },
    //               },
    //             }}
    //           />
    //         </>
    //       );
    //     }}
    //   </LoadingSpinner>
    // </Card>
    <></>
  );
}

export default LeadsStatsPages;
