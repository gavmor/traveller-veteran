import {test, expect, is} from "@benchristel/taste"
import {getAllTests, runTests, formatTestResultsAsText} from "@benchristel/taste"
import "./src/character.js"

runTests(getAllTests())
  .then(formatTestResultsAsText)
  .then(console.log)