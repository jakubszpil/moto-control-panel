import { useSortedArrayByKeys, useSortedArrayByValues } from "./useSortedArray";

const exampleArrayOfNumbers = [52, 6, 3, 126, 4, 3];
const exampleArrayOfStrings = ["test", "car", "home", "car", "alphabet", "sun"];

const properlySortedExampleArrayOfNumbers = exampleArrayOfNumbers.sort((a, b) => a - b);
const properlySortedExampleArrayOfStrings = exampleArrayOfStrings.sort();

interface Example {
  id: number;
  name: string;
  age: number;
}

const exampleArrayOfObjects: Example[] = [
  {
    id: 1,
    name: "John",
    age: 38,
  },
  {
    id: 2,
    name: "Adam",
    age: 32,
  },
  {
    id: 3,
    name: "Erick",
    age: 32,
  },
];

test("correct ascending sort of an array with numbers", () => {
  const sortedArray = useSortedArrayByValues(exampleArrayOfNumbers, 1);

  expect(sortedArray).toStrictEqual(properlySortedExampleArrayOfNumbers);
});
test("correct descending sort of an array with numbers", () => {
  const sortedArray = useSortedArrayByValues(exampleArrayOfNumbers, -1);

  expect(sortedArray).toStrictEqual(properlySortedExampleArrayOfNumbers.reverse());
});
test("correct ascending sort of an array with strings", () => {
  const sortedArray = useSortedArrayByValues(exampleArrayOfStrings, 1);

  expect(sortedArray).toStrictEqual(properlySortedExampleArrayOfStrings);
});
test("correct descending sort of an array with strings", () => {
  const sortedArray = useSortedArrayByValues(exampleArrayOfStrings, -1);

  expect(sortedArray).toStrictEqual(exampleArrayOfStrings.reverse());
});
test("correct ascending sort of an array with objects", () => {
  const sorted = useSortedArrayByKeys(exampleArrayOfObjects, "age", 1);

  expect(sorted).toStrictEqual(exampleArrayOfObjects.sort((a, b) => a.age - b.age));
});
test("correct descending sort of an array with objects", () => {
  const sorted = useSortedArrayByKeys(exampleArrayOfObjects, "age", -1);

  expect(sorted).toStrictEqual(exampleArrayOfObjects.sort((a, b) => b.age - a.age));
});
