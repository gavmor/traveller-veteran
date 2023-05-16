import {getAllTests, runTests, formatTestResultsAsText} from "@benchristel/taste"
import { Die } from "./src/Game.js"
import "./src/Lifepath.js"

Die.test=true
runTests(getAllTests())
  .then(formatTestResultsAsText)
  .then(console.log)