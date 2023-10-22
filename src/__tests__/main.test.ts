import { getHwId } from "../index";

test("Hardware id", () => {
  const id = getHwId();

  expect(id).toBeTruthy();
  expect(typeof id).toBe("string");
});
