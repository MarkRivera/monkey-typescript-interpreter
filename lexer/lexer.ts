import { ASSIGN, COMMA, EOF, ILLEGAL, LBRACE, LPAREN, PLUS, RBRACE, RPAREN, SEMICOLON, Token, TokenType } from "../token/token";
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
        token = this.newToken(ASSIGN, this.ch);
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
