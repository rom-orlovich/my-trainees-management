import { formatDate } from "../../../utilities/helpers";
import { GenericRecord } from "../../../utilities/types";
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
  { date: "2022-10-27T21:00:00.000Z", value: 56 },
  { date: "2022-10-27T21:00:00.000Z", value: 56 },
  { date: "2022-10-27T21:00:00.000Z", value: 75 },
  { date: "2022-10-27T21:00:00.000Z", value: 73 },
  { date: "2022-10-27T21:00:00.000Z", value: 73 },
  { date: "2022-10-28T21:00:00.000Z", value: 63 },
  { date: "2022-10-28T21:00:00.000Z", value: 63 },
  { date: "2022-10-28T21:00:00.000Z", value: 56 },
  { date: "2022-10-29T21:00:00.000Z", value: 63 },
  { date: "2022-10-29T21:00:00.000Z", value: 63 },
  { date: "2022-10-29T21:00:00.000Z", value: 62 },
  { date: "2022-10-29T21:00:00.000Z", value: 100 },
  { date: "2022-10-29T21:00:00.000Z", value: 63 },
  { date: "2022-10-29T21:00:00.000Z", value: 63 },
  { date: "2022-11-12T22:00:00.000Z", value: 60 },
  { date: "2022-11-12T22:00:00.000Z", value: 72 },
  { date: "2022-11-12T22:00:00.000Z", value: 72 },
  { date: "2022-11-12T22:00:00.000Z", value: 72 },
  { date: "2022-11-12T22:00:00.000Z", value: 65 },
  { date: "2022-12-26T22:00:00.000Z", value: 60 },
];
const weeklyMeasureTimeLineObj = {
  allSumObj: undefined,
  weeklySumObj: {
    "25/12/22": {},
    "26/12/22": {},
    "27/12/22": {},
    "28/12/22": {},
    "29/12/22": {},
    "30/12/22": {},
    "31/12/22": {},
  },
  monthlySumObj: undefined,
  monthsSumObj: undefined,
  yearsSumObj: undefined,
};

const allMeasuresTimeLineObj = {
  allSumObj: {},
  weeklySumObj: undefined,
  monthlySumObj: undefined,
  monthsSumObj: undefined,
  yearsSumObj: undefined,
};

const monthlyMeasure = {
  allSumObj: undefined,
  weeklySumObj: undefined,
  monthlySumObj: {
    "01/12/22": {},
    "08/12/22": {},
    "15/12/22": {},
    "22/12/22": {},
    "29/12/22": {},
  },
  monthsSumObj: undefined,
  yearsSumObj: undefined,
};
const monthMeasure = {
  allSumObj: undefined,
  weeklySumObj: undefined,
  monthlySumObj: undefined,
  monthsSumObj: {
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
  yearsSumObj: undefined,
};
const yearsMeasure = {
  allSumObj: undefined,
  weeklySumObj: undefined,
  monthlySumObj: undefined,
  monthsSumObj: undefined,
  yearsSumObj: {},
};

const calTimeLineObjMonthsRes = {
  allSumObj: undefined,
  weeklySumObj: undefined,
  monthlySumObj: undefined,
  monthsSumObj: {
    January: {},
    February: {},
    March: {},
    April: {},
    May: {},
    June: {},
    July: {},
    August: {},
    September: {},
    October: { measure: 1293 },
    November: { measure: 341 },
    December: { measure: 60 },
  },
  yearsSumObj: undefined,
};

const calTimeLineObjAllRes = {
  allSumObj: {
    "2022-10-24": { measure: 70 },
    "2022-10-27": { measure: 238 },
    "2022-10-28": { measure: 389 },
    "2022-10-29": { measure: 182 },
    "2022-10-30": { measure: 414 },
    "2022-11-13": { measure: 341 },
    "2022-12-27": { measure: 60 },
  },
  weeklySumObj: undefined,
  monthlySumObj: undefined,
  monthsSumObj: undefined,
  yearsSumObj: undefined,
};
// describe.only("test createTimeLineObj", () => {
//   test("test create allSumObj", () => {
//     const allTimeLineObj = createTimeLineObj(
//       {} as { measure: number },
//       "all",
//       "graph"
//     );
//     expect(allTimeLineObj).toEqual({
//       allSumObj: {},
//       weeklySumObj: undefined,
//       monthlySumObj: undefined,
//       monthsSumObj: undefined,
//       yearsSumObj: undefined,
//     });
//   });
//   test("test create weeklySumObj", () => {
//     const allTimeLineObj = createTimeLineObj(
//       {} as { measure: number },
//       "all",
//       "graph"
//     );
//     expect(allTimeLineObj).toEqual({
//       allSumObj: {},
//       weeklySumObj: undefined,
//       monthlySumObj: undefined,
//       monthsSumObj: undefined,
//       yearsSumObj: undefined,
//     });
//   });
// });

describe.only("tests weight measures graph calTimeLineObj function", () => {
  describe("test allMeasuresTimeLineObj", () => {
    test("test allMeasuresTimeLineObj timeline when the addTimeLine option is true in the all dates that are will added to the allMeasuresTimeLineObj", () => {
      let sumAll = calTimeLineObj(
        "measure",
        getDateLocal(new Date("2022-10-23T21:00:00.000Z")),
        allMeasuresTimeLineObj.allSumObj as GenericRecord<any>,
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
    test("test allSumObj when the first date that is added his addTimeLine option is false", () => {
      let sumAll = calTimeLineObj(
        "measure",
        getDateLocal(new Date("2022-10-23T21:00:00.000Z")),
        allMeasuresTimeLineObj.allSumObj as GenericRecord<any>,
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

  describe("test weeklyMeasureTimeLineObj", () => {
    test("test when the measure add to the correct date in the week", () => {
      const weeklySumObj = calTimeLineObj(
        "measure",
        getDateLocal(new Date("2022-12-31T21:00:00.000Z")),
        weeklyMeasureTimeLineObj.weeklySumObj as GenericRecord<any>,
        { amount: 2, assignNum: 2, addTimeLine: false }
      );

      expect(weeklySumObj).toEqual({
        "25/12/22": {},
        "26/12/22": {},
        "27/12/22": {},
        "28/12/22": {},
        "29/12/22": {},
        "30/12/22": {},
        "31/12/22": { measure: 2 },
      });
    });
  });
});
