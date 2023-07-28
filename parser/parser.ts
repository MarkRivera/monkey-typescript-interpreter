import { Program } from "../ast/ast";
import { MonkeyLexer } from "../lexer/lexer";
import { Token } from "../token/token";

class Parser {
  private lexer: MonkeyLexer;
  private currToken: Token;
  private peekToken: Token;

  constructor(lexer: MonkeyLexer) {
    this.lexer = lexer;

    this.lexer.nextToken()
    this.lexer.nextToken()
  }

  nextToken() {
    this.currToken = this.peekToken;
    this.peekToken = this.lexer.nextToken();
  }

  parseProgram(): Program | null {
    return null
  }
}