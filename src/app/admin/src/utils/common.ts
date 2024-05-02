export function removeDuplicateStrings(arr: string[]): string[] {
  const hash: { [key in string]: number } = {};

  for (const item of arr) {
    hash[item] = (hash[item] || 0) + 1;
  }

  return arr.filter((item) => {
    if (hash[item] > 1) {
      hash[item]--;
      return false;
    }
    return true;
  });
}
