import { ASSIGN, ASTERISK, BANG, COMMA, ELSE, EOF, EQ, FALSE, FUNCTION, GT, IDENT, IF, INT, LBRACE, LET, LPAREN, LT, MINUS, NOT_EQ, PLUS, RBRACE, RETURN, RPAREN, SEMICOLON, SLASH, TRUE, Token } from "../token/token";
import { newLexer } from "./lexer";
describe("Testing our Lexer", () => {
  test("Testing Tokenizer", () => {
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

  })

  test("Ensure we can tokenize parens", () => {

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

  test("Ensure we can tokenize operators", () => {

    let input3 = `
    !-/*5;
    5 < 10 > 5;
    `;

    let tests3: Token[] = [
      { type: BANG, literal: "!" },
      { type: MINUS, literal: "-" },
      { type: SLASH, literal: "/" },
      { type: ASTERISK, literal: "*" },
      { type: INT, literal: "5" },
      { type: SEMICOLON, literal: ";" },
      { type: INT, literal: "5" },
      { type: LT, literal: "<" },
      { type: INT, literal: "10" },
      { type: GT, literal: ">" },
      { type: INT, literal: "5" },
      { type: SEMICOLON, literal: ";" },
      { type: EOF, literal: "" },
    ];

    let lexer3 = newLexer(input3);

    for (let test of tests3) {
      let token = lexer3.nextToken();
      expect(token.type).toBe(test.type);
      expect(token.literal).toBe(test.literal);
    }
  })

  test("Ensure we can tokenize if else and booleans", () => {
    let input = `
      if (5 < 10) {
        return true;
      } else {
        return false;
      }
    `;

    let tests: Token[] = [
      { type: IF, literal: "if" },
      { type: LPAREN, literal: "(" },
      { type: INT, literal: "5" },
      { type: LT, literal: "<" },
      { type: INT, literal: "10" },
      { type: RPAREN, literal: ")" },
      { type: LBRACE, literal: "{" },
      { type: RETURN, literal: "return" },
      { type: TRUE, literal: "true" },
      { type: SEMICOLON, literal: ";" },
      { type: RBRACE, literal: "}" },
      { type: ELSE, literal: "else" },
      { type: LBRACE, literal: "{" },
      { type: RETURN, literal: "return" },
      { type: FALSE, literal: "false" },
      { type: SEMICOLON, literal: ";" },
      { type: RBRACE, literal: "}" },
      { type: EOF, literal: "" },
    ];

    let lexer = newLexer(input);

    for (let test of tests) {
      let token = lexer.nextToken();
      expect(token.type).toBe(test.type);
      expect(token.literal).toBe(test.literal);
    }
  })

  test("Ensure we can tokenize == and !=", () => {
    let input = `
      10 == 10;
      10 != 9;
    `

    let tests: Token[] = [
      { type: INT, literal: "10" },
      { type: EQ, literal: "==" },
      { type: INT, literal: "10" },
      { type: SEMICOLON, literal: ";" },
      { type: INT, literal: "10" },
      { type: NOT_EQ, literal: "!=" },
      { type: INT, literal: "9" },
      { type: SEMICOLON, literal: ";" },
      { type: EOF, literal: "" },
    ]

    let lexer = newLexer(input);

    for (let test of tests) {
      let token = lexer.nextToken();
      expect(token.type).toBe(test.type);
      expect(token.literal).toBe(test.literal);
    }
  });
})
