import { formatDate } from "../../../utilities/helpers";
import { GenericRecord } from "../../../utilities/types";
import {
  createSortMeasuresDateWeightArray,
  measuresChartLineCreateLabelAndDatasets,
} from "../utilities/helpersGetMeasuresStats";
import {
  calTimeLineObj,
  createTimeLineObj,
  getDateLocal,
} from "../utilities/helpersGetStats";

const measureDatesArr = [
  { date: "2022-10-23T21:00:00.000Z", value: 70 },
  { date: "2022-10-26T21:00:00.000Z", value: 89 },
  { date: "2022-10-26T21:00:00.000Z", value: 78 },
  { date: "2022-10-26T21:00:00.000Z", value: 71 },
  { date: "2022-10-27T21:00:00.000Z", value: 56 },
] as unknown as { date: Date; value: number }[];
const weeklyMeasureTimeLineObj = {
  allPeriodObj: undefined,
  weeklyPeriodObj: {
    "25/12/22": {},
    "26/12/22": {},
    "27/12/22": {},
    "28/12/22": {},
    "29/12/22": {},
    "30/12/22": {},
    "31/12/22": {},
  },
  monthlyPeriodObj: undefined,
  monthsPeriodObj: undefined,
  yearsPeriodObj: undefined,
};

const allMeasuresTimeLineObj = {
  allPeriodObj: {},
  weeklyPeriodObj: undefined,
  monthlyPeriodObj: undefined,
  monthsPeriodObj: undefined,
  yearsPeriodObj: undefined,
};

const yearsMeasure = {
  allPeriodObj: undefined,
  weeklyPeriodObj: undefined,
  monthlyPeriodObj: undefined,
  monthsPeriodObj: undefined,
  yearsPeriodObj: {},
};

describe.only("test createTimeLineObj", () => {
  test("test create allPeriodObj", () => {
    const allPeriodObj = createTimeLineObj(
      {} as { measure: number },
      "all",
      "graph"
    );
    expect(allPeriodObj).toEqual({
      allPeriodObj: {},
      weeklyPeriodObj: undefined,
      monthlyPeriodObj: undefined,
      monthsPeriodObj: undefined,
      yearsPeriodObj: undefined,
    });
  });

  test("test create monthsPeriodObj", () => {
    const monthsPeriodObj = createTimeLineObj(
      {} as { measure: number },
      "months",
      "graph"
    );
    expect(monthsPeriodObj).toEqual({
      allPeriodObj: undefined,
      weeklyPeriodObj: undefined,
      monthlyPeriodObj: undefined,
      monthsPeriodObj: {
        January: {},
        February: {},
        March: {},
        April: {},
        May: {},
        June: {},
        July: {},
        August: {},
        September: {},
        October: {},
        November: {},
        December: {},
      },
      yearsPeriodObj: undefined,
    });
  });
});

describe.only("tests weight measures graph calTimeLineObj function", () => {
  describe("test calculate of allPeriodObj", () => {
    test("test allMeasuresTimeLineObj timeline when the addTimeLine option is true in the all dates that are will added to the allMeasuresTimeLineObj", () => {
      let sumAll = calTimeLineObj(
        "measure",
        getDateLocal(new Date("2022-10-23T21:00:00.000Z")),
        allMeasuresTimeLineObj.allPeriodObj as GenericRecord<any>,
        { amount: 2, assignNum: undefined, addTimeLine: true }
      );
      expect(sumAll).toEqual({ "24/10/22": { measure: 2 } });

      sumAll = calTimeLineObj(
        "measure",
        getDateLocal(new Date("2022-10-26T21:00:00.000Z")),
        sumAll as GenericRecord<any>,
        { amount: 2, assignNum: undefined, addTimeLine: true }
      );

      expect(sumAll).toEqual({
        "24/10/22": { measure: 2 },
        "27/10/22": { measure: 2 },
      });
    });
    test("test allPeriodObj when the first date that is added his addTimeLine option is false", () => {
      let sumAll = calTimeLineObj(
        "measure",
        getDateLocal(new Date("2022-10-23T21:00:00.000Z")),
        allMeasuresTimeLineObj.allPeriodObj as GenericRecord<any>,
        { amount: 2, assignNum: undefined, addTimeLine: false }
      );
      expect(sumAll).toEqual({});

      sumAll = calTimeLineObj(
        "measure",
        getDateLocal(new Date("2022-10-26T21:00:00.000Z")),
        sumAll as GenericRecord<any>,
        { amount: 2, assignNum: undefined, addTimeLine: true }
      );

      expect(sumAll).toEqual({
        "27/10/22": { measure: 2 },
      });
    });
  });

  describe("test calculate of weeklyPeriodObj", () => {
    test("test when the measure add to the correct date of the week", () => {
      const weeklyPeriodObj = calTimeLineObj(
        "measure",
        getDateLocal(new Date("2022-12-31T21:00:00.000Z")),
        weeklyMeasureTimeLineObj.weeklyPeriodObj as GenericRecord<any>,
        { amount: 2, assignNum: 2, addTimeLine: false }
      );

      expect(weeklyPeriodObj).toEqual({
        "25/12/22": {},
        "26/12/22": {},
        "27/12/22": {},
        "28/12/22": {},
        "29/12/22": {},
        "30/12/22": {},
        "31/12/22": { measure: 2 },
      });
    });

    test("test when the measure is not in the correct date of the week", () => {
      const weeklyPeriodObj = calTimeLineObj(
        "measure",
        getDateLocal(new Date("2023-01-01T21:00:00.000Z")),
        weeklyMeasureTimeLineObj.weeklyPeriodObj as GenericRecord<any>,
        { amount: 2, assignNum: 2, addTimeLine: false }
      );

      expect(weeklyPeriodObj).toEqual({
        "25/12/22": {},
        "26/12/22": {},
        "27/12/22": {},
        "28/12/22": {},
        "29/12/22": {},
        "30/12/22": {},
        "31/12/22": {},
      });
    });
  });

  describe("test calculate of the yearsPeriodObj", () => {
    test("test when the measure is assign to correct year", () => {
      const yearsPeriodObj = calTimeLineObj(
        "measure",
        "2022",
        yearsMeasure.yearsPeriodObj as GenericRecord<any>,
        { amount: 2, assignNum: 2, addTimeLine: true }
      );

      expect(yearsPeriodObj).toEqual({ 2022: { measure: 2 } });
    });
    test("test when the measure is replace already defined year", () => {
      let yearsPeriodObj = calTimeLineObj(
        "measure",
        "2022",
        yearsMeasure.yearsPeriodObj as GenericRecord<any>,
        { amount: 3, assignNum: 2, addTimeLine: true }
      );

      expect(yearsPeriodObj).toEqual({ 2022: { measure: 3 } });

      yearsPeriodObj = calTimeLineObj(
        "measure",
        "2022",
        yearsPeriodObj as GenericRecord<any>,
        { amount: 3, assignNum: 4, addTimeLine: true }
      );

      expect(yearsPeriodObj).toEqual({ 2022: { measure: 4 } });
    });
    test("test when the sec measure's year is different from the first one ", () => {
      let yearsPeriodObj = calTimeLineObj(
        "measure",
        "2022",
        yearsMeasure.yearsPeriodObj as GenericRecord<any>,
        { amount: 3, assignNum: 2, addTimeLine: true }
      );

      expect(yearsPeriodObj).toEqual({ 2022: { measure: 3 } });

      yearsPeriodObj = calTimeLineObj(
        "measure",
        "2023",
        yearsPeriodObj as GenericRecord<any>,
        { amount: 15, assignNum: 4, addTimeLine: true }
      );

      expect(yearsPeriodObj).toEqual({
        2022: { measure: 3 },
        2023: { measure: 15 },
      });
    });
    test("test when the addTimeLine option is false", () => {
      let yearsPeriodObj = calTimeLineObj(
        "measure",
        "2022",
        yearsMeasure.yearsPeriodObj as GenericRecord<any>,
        { amount: 3, assignNum: 2, addTimeLine: true }
      );

      expect(yearsPeriodObj).toEqual({ 2022: { measure: 3 } });

      yearsPeriodObj = calTimeLineObj(
        "measure",
        "2023",
        yearsPeriodObj as GenericRecord<any>,
        { amount: 15, assignNum: 4, addTimeLine: false }
      );

      expect(yearsPeriodObj).toEqual({
        2022: { measure: 3 },
      });
    });
  });
});

describe.only("test measuresChartLineCreateLabelAndDatasets", () => {
  const chartLineDataSet = measuresChartLineCreateLabelAndDatasets(
    measureDatesArr.map((el) => ({ ...el, date: new Date(el.date) })),
    "all"
  );
  expect(chartLineDataSet).toEqual({
    labelFormatted: ["24/10/22", "27/10/22", "28/10/22"],
    datasetsValues: [70, 71, 56],
  });
});
