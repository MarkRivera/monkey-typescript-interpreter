import { Token } from "../token/token";

interface ASTNode {
  TokenLiteral(): string;
};

interface Statement extends ASTNode {
  statementNode(): void;
};

interface Expression extends ASTNode {
  expressionNode(): void;
};

export class Program implements ASTNode {
  private statements: Statement[];

  TokenLiteral(): string {
    if (this.statements.length > 0) {
      return this.statements[0].TokenLiteral()
    } else return ""
  }
}

class LetStatement implements Statement {
  private Token: Token
  private Name: Identifier;
  private Value: Expression

  statementNode(): void { }
  TokenLiteral(): string {
    return this.Token.literal
  }
}

class Identifier implements Expression {
  private Token: Token;
  private Value: string;

  expressionNode(): void { }
  TokenLiteral(): string {
    return this.Token.literal
  }
}
