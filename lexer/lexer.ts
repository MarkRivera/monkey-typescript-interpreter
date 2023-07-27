import { ASSIGN, ASTERISK, BANG, COMMA, EOF, EQ, GT, ILLEGAL, LBRACE, LPAREN, LT, MINUS, NOT_EQ, PLUS, RBRACE, RPAREN, SEMICOLON, SLASH, Token, TokenType } from "../token/token";
import { LookupIdent } from "../utils/LookupIdent";
import { isDigit } from "../utils/isDigit";
import { isLetter } from "../utils/isLetter";

interface Lexer {
  input: string;
  position: number;
  readPosition: number;
  ch: string;
  readChar: () => void;
  nextToken: () => Token;
  newToken: (type: TokenType, ch: string) => Token;
  readIdentifier: () => string;
  readNumber: () => string;
  skipWhitespace: () => void;
}

export class MonkeyLexer implements Lexer {
  input: string;
  position: number = 0;
  readPosition: number = 0;
  ch: string = "";

  constructor(input: string) {
    this.input = input;
  }

  peekChar(): string {
    if (this.readPosition >= this.input.length) {
      return "";
    } else {
      return this.input[this.readPosition];
    }
  }

  readChar() {
    if (this.readPosition >= this.input.length) {
      this.ch = "";
    } else {
      this.ch = this.input[this.readPosition];
    }

    this.position = this.readPosition;
    this.readPosition += 1;
  }

  readIdentifier(): string {
    let position = this.position;
    while (isLetter(this.ch)) {
      this.readChar();
    }

    return this.input.slice(position, this.position);
  }

  readNumber(): string {
    let position = this.position;
    while (isDigit(this.ch)) {
      this.readChar();
    }

    return this.input.slice(position, this.position);

  }

  skipWhitespace() {
    while (this.ch === " " || this.ch === "\t" || this.ch === "\n" || this.ch === "\r") {
      this.readChar();
    }
  }

  nextToken(): Token {
    let token: Token = { type: "", literal: "" };
    // Skip whitespace
    this.skipWhitespace();
    switch (this.ch) {
      case "=":
        if (this.peekChar() === "=") {
          let char = this.ch;
          this.readChar();

          token = this.newToken(EQ, `${char}${this.ch}`);
        } else {
          token = this.newToken(ASSIGN, this.ch);
        }

        break;
      case "+":
        token = this.newToken(PLUS, this.ch);
        break;
      case "-":
        token = this.newToken(MINUS, this.ch);
        break;
      case "!":
        if (this.peekChar() === "=") {
          let char = this.ch;
          this.readChar();

          token = this.newToken(NOT_EQ, `${char}${this.ch}`);
        } else {
          token = this.newToken(BANG, this.ch);
        }

        break;
      case "/":
        token = this.newToken(SLASH, this.ch);
        break;
      case "*":
        token = this.newToken(ASTERISK, this.ch);
        break;
      case "<":
        token = this.newToken(LT, this.ch);
        break;
      case ">":
        token = this.newToken(GT, this.ch);
        break;
      case ";":
        token = this.newToken(SEMICOLON, this.ch);
        break;
      case "(":
        token = this.newToken(LPAREN, this.ch);
        break;
      case ")":
        token = this.newToken(RPAREN, this.ch);
        break;
      case ",":
        token = this.newToken(COMMA, this.ch);
        break;
      case "+":
        token = this.newToken(PLUS, this.ch);
        break;
      case "{":
        token = this.newToken(LBRACE, this.ch);
        break;
      case "}":
        token = this.newToken(RBRACE, this.ch);
        break;
      case "":
        token = this.newToken(EOF, "");
        break;
      default:
        if (isLetter(this.ch)) {
          token.literal = this.readIdentifier();
          token.type = LookupIdent(token.literal);
          return token;
        }

        else if (isDigit(this.ch)) {
          token.type = "INT";
          token.literal = this.readNumber();
          return token;
        }

        else {
          token = this.newToken(ILLEGAL, this.ch);
        }
    }

    this.readChar();
    return token;
  }

  newToken(type: TokenType, ch: string): Token {
    return { type, literal: ch };
  }
}

export function newLexer(input: string) {
  let lexer = new MonkeyLexer(input);
  lexer.readChar();
  return lexer;
}
