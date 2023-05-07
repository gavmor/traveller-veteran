import {test, expect, is} from "@benchristel/taste"
import {getAllTests, runTests, formatTestResultsAsText} from "@benchristel/taste"

// add a test to the global suite
test("my first Taste test", {
  "runs"() {
    expect(1 + 1, is, 2)
  },
})
