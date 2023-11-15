const statement = require("./index.js");
const fs = require("fs");

describe("statement", () => {
  it("works", () => {
    const plays = JSON.parse(fs.readFileSync("plays.json", "utf8"));
    const invoice = JSON.parse(fs.readFileSync("invoices.json", "utf8"));

    const result = statement(invoice[0], plays);

    expect(result.replace(/\s+/g, " ").trim()).toEqual(
      `Statement for BigCo Hamlet: $650.00 (55 seats) As You Like It: $580.00 (35 seats) Othello: $500.00 (40 seats) Amount owned is: $1,730.00 You earned 47 credits`
    );
  });
});
