export function isLetter(letter: string): boolean {
  return "a" <= letter && letter <= "z" || "A" <= letter && letter <= "Z" || letter === "_";
}