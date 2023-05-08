import * as ramda from 'ramda';
import { equals, expect, test, curry, is, not } from "@benchristel/taste";

export const exists = not(is(undefined));
export const includes = curry(ramda.includes, "includes");

export function hasProperties(expected: any, actual: any): boolean {
  return equals({ ...expected, ...actual }, actual);
}
test("hasProperties", {
  "returns true if two empty objects"() {
    expect({}, hasProperties, {});
  },
  "returns false if actual lacks expected properties"() {
    expect({}, not(hasProperties), { foo: "bar" });
  },
  "returns false if actual just has some other commensurate properties"() {
    expect({ baz: "qux" }, not(hasProperties), { foo: "bar" });
  },
  "returns true if actual is superset of expected properties"() {
    expect({ foo: "bar", baz: "qux" }, hasProperties, { foo: "bar" });
  }
});
