require("@testing-library/jest-dom");

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  cache: (fn) => fn,
}));
