import { FUNCTION, IDENT, LET, TokenType } from "../token/token";

let keywords: { [key: string]: TokenType } = {
  "fn": FUNCTION,
  "let": LET
};

export function LookupIdent(ident: string): TokenType {
  if (keywords[ident]) {
    return keywords[ident];
  }
  return IDENT;
}