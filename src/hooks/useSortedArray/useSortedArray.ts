export function useSortedArrayByKeys<T>(array: T[], key: keyof T, direction: 1 | -1) {
  const compare = (a: T, b: T) => {
    let compareState = 0;
    if (a[key] > b[key]) compareState = 1;
    else if (a[key] < b[key]) compareState = -1;
    return compareState * direction;
  };

  return [...array].sort(compare);
}

export function useSortedArrayByValues<T>(array: T[], direction: 1 | -1) {
  const compare = (a: any, b: any) => {
    let compareState = 0;
    if (a > b) compareState = 1;
    else if (a < b) compareState = -1;
    return compareState * direction;
  };

  return [...array].sort(compare);
}
