export function removeDuplicatedString(arr: string[]): string[] {
  const set = new Set(arr);
  return Array.from(set);
}
