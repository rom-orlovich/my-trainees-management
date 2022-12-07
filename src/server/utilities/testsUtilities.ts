import { AnyFun } from "./types";

export const expectMessage = (
  condition: boolean,
  tested: any,
  expected: any
) => {
  if (condition)
    console.log(`tested ${tested} is equal  to expected${expected} 🟩`);
  else console.log(` tested ${tested} is not equal to expected ${expected} 🟥`);
};

export function testPackage(testPackageName: string, fun: AnyFun) {
  console.log(`${testPackageName}:`);

  fun();
}

export const expectObj = (testName: string, tested: any, expected: any) => {
  const convertTest = JSON.stringify(tested);
  const convertExpected = JSON.stringify(expected);
  console.log(`${testName}:`);
  expectMessage(convertTest === convertExpected, convertTest, convertExpected);
};

export const expectPrimitive = (
  testName: string,
  tested: any,
  expected: any
) => {
  console.log(`${testName}:`);
  expectMessage(tested === expected, tested, expected);
};
