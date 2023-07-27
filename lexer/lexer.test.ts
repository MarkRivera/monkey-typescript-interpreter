import { ASSIGN, COMMA, EOF, FUNCTION, IDENT, INT, LBRACE, LET, LPAREN, PLUS, RBRACE, RPAREN, SEMICOLON, Token } from "../token/token";
import { newLexer } from "./lexer";

test("Test our Tokens", () => {
  let input = `
    let five = 5;
    let ten = 10;
    let add = fn(x, y) {
      x + y;
    };

    let result = add(five, ten);
  `;

  let tests: Token[] = [
    { type: LET, literal: "let" },
    { type: IDENT, literal: "five" },
    { type: ASSIGN, literal: "=" },
    { type: INT, literal: "5" },
    { type: SEMICOLON, literal: ";" },
    { type: LET, literal: "let" },
    { type: IDENT, literal: "ten" },
    { type: ASSIGN, literal: "=" },
    { type: INT, literal: "10" },
    { type: SEMICOLON, literal: ";" },
    { type: LET, literal: "let" },
    { type: IDENT, literal: "add" },
    { type: ASSIGN, literal: "=" },
    { type: FUNCTION, literal: "fn" },
    { type: LPAREN, literal: "(" },
    { type: IDENT, literal: "x" },
    { type: COMMA, literal: "," },
    { type: IDENT, literal: "y" },
    { type: RPAREN, literal: ")" },
    { type: LBRACE, literal: "{" },
    { type: IDENT, literal: "x" },
    { type: PLUS, literal: "+" },
    { type: IDENT, literal: "y" },
    { type: SEMICOLON, literal: ";" },
    { type: RBRACE, literal: "}" },
    { type: SEMICOLON, literal: ";" },
    { type: LET, literal: "let" },
    { type: IDENT, literal: "result" },
    { type: ASSIGN, literal: "=" },
    { type: IDENT, literal: "add" },
    { type: LPAREN, literal: "(" },
    { type: IDENT, literal: "five" },
    { type: COMMA, literal: "," },
    { type: IDENT, literal: "ten" },
    { type: RPAREN, literal: ")" },
    { type: SEMICOLON, literal: ";" },
    { type: EOF, literal: "" }
  ];

  let lexer = newLexer(input);

  for (let test of tests) {
    let token = lexer.nextToken();
    expect(token.type).toBe(test.type);
    expect(token.literal).toBe(test.literal);
  }

  let input2 = `=+(){},;`;

  let tests2: Token[] = [
    { type: ASSIGN, literal: "=" },
    { type: PLUS, literal: "+" },
    { type: LPAREN, literal: "(" },
    { type: RPAREN, literal: ")" },
    { type: LBRACE, literal: "{" },
    { type: RBRACE, literal: "}" },
    { type: COMMA, literal: "," },
    { type: SEMICOLON, literal: ";" },
    { type: EOF, literal: "" },
  ]

  let lexer2 = newLexer(input2);

  for (let test of tests2) {
    let token = lexer2.nextToken();
    expect(token.type).toBe(test.type);
    expect(token.literal).toBe(test.literal);
  }
})