import { equals, expect, test } from "@benchristel/taste";

const title = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);
export const planetCase = (str: string) => str.replace(/\b(.)/, title);

test("planetCase", {
  works() {
    expect(planetCase("rigel IV"), equals, "Rigel IV");
  },
});

test("title", {
  works() {
    expect(title("hello"), equals, "Hello");
  },
});
