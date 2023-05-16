import { generate } from "./src/Lifepath.js";

setInterval(() => console.log(JSON.stringify(generate(), null, 0)), 0)