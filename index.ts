import * as os from "os";
import { start } from "./repl/repl";

// Get User Name from OS
// Path: repl\repl.ts
let userName = os.userInfo().username;

function main() {
  console.log(`Hello ${userName}! This is the Monkey programming language!`);
  console.log("Feel free to type in commands");
  start();
}

main();