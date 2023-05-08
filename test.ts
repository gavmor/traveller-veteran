import {getAllTests, runTests, formatTestResultsAsText} from "@benchristel/taste"
import "./src/Lifepath.js"

runTests(getAllTests())
  .then(formatTestResultsAsText)
  .then(console.log)