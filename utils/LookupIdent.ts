import { ELSE, FALSE, FUNCTION, IDENT, IF, LET, RETURN, TRUE, TokenType } from "../token/token";

let keywords: { [key: string]: TokenType } = {
  "fn": FUNCTION,
  "let": LET,
  "if": IF,
  "else": ELSE,
  "true": TRUE,
  "false": FALSE,
  "return": RETURN
};

export function LookupIdent(ident: string): TokenType {
  if (keywords[ident]) {
    return keywords[ident];
  }
  return IDENT;
}