import { newLexer } from "../lexer/lexer";

const PROMPT = ">> ";

export function start() {
  process.stdout.write(PROMPT);
  process.stdin.on("data", data => {
    let input = data.toString();
    let lexer = newLexer(input);

    for (let token = lexer.nextToken(); token.type !== "EOF"; token = lexer.nextToken()) {
      console.log(token);
    }
  });
}