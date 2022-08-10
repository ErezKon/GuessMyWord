export function equals<T>(array1: T[], array2: T[]): boolean {
  if(!array1 && !array2)  {
    return true;
  }
  if(!array1 || !array2) {
    return false;
  }
  if(array1.length !== array2.length) {
    return false;
  }
  for (const element of array1) {
    if (array2.indexOf(element) === -1) {
      return false;
    }
  }
  for (const element of array2) {
    if (array1.indexOf(element) === -1) {
      return false;
    }
  }
  return true;
}
