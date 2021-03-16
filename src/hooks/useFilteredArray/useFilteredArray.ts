export default function useFilteredArray<T>(array: T[], query: any, withKey: boolean = false, key?: keyof T) {
  if (typeof query === "string" && /\W/.test(query.split(" ").join(""))) {
    console.log("ok");
    return array;
  }

  const searchInValue = (obj: any, reg: RegExp): boolean => {
    if (typeof obj !== "object") return reg.test(String(obj).toLowerCase());
    return Object.values(obj).some((value) => {
      if (typeof value !== "object") return reg.test(String(value).toLowerCase());
      else return searchInValue(value, reg);
    });
  };

  return array.filter((item) => {
    const regex = new RegExp(String(query).toLowerCase(), "gi");

    if (withKey && key) return searchInValue(item[key], regex);
    return searchInValue(item, regex);
  });
}
