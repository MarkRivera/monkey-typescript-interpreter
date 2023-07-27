export type TokenType = string;
export type Token = {
  type: TokenType;
  literal: string;
}

// Define token types
export const ILLEGAL = 'ILLEGAL';
export const EOF = 'EOF';

// Identifiers + literals
export const IDENT = "IDENT";
export const INT = "INT";

// Operators
export const ASSIGN = "=";
export const PLUS = "+";
export const MINUS = "-";

// Delimiters
export const COMMA = ",";
export const SEMICOLON = ";";

export const LPAREN = "(";
export const RPAREN = ")";
export const LBRACE = "{";
export const RBRACE = "}";

// Keywords
export const FUNCTION = "FUNCTION";
export const LET = "LET";