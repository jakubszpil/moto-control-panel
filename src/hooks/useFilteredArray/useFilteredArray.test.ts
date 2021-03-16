import useFilteredArray from "./useFilteredArray";

interface ExampleArrayItem {
  id: number;
  name: string;
}

test("proper filtering of the array with non-object values", () => {
  const array = [5, 2, 6, 3, 2, 7];
  const filteredArray = useFilteredArray(array, 2, false);

  expect(filteredArray).toStrictEqual([2, 2]);
});

test("correct filtering of an array with values of different types", () => {
  const array = [5, "test", undefined, 3, { id: "421jj127" }, 7];
  const filteredArray = useFilteredArray(array, 7, false);

  expect(filteredArray).toStrictEqual([{ id: "421jj127" }, 7]);
});

test("proper filtering of the array with object values", () => {
  const array: ExampleArrayItem[] = [
    { id: 1, name: "John" },
    { id: 52, name: "Erick" },
  ];
  const filteredArray = useFilteredArray(array, 52, true, "id");

  expect(filteredArray).toStrictEqual([{ id: 52, name: "Erick" }]);
});
