import { equals, expect, not, test } from "@benchristel/taste";

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
