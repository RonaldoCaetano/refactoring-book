function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;

  for (let perform of invoice.performances) {
    const play = plays[perform.playID];
    let thisAmount = 0;

    switch (play.type) {
      case "tragedy":
        thisAmount = 40000;
        if (perform.audience > 30) {
          thisAmount += 1000 * (perform.audience - 30);
        }
        break;
      case "comedy":
        thisAmount = 30000;
        if (perform.audience > 20) {
          thisAmount += 10000 + 500 * (perform.audience - 20);
        }
        thisAmount += 300 * perform.audience;
        break;
      default:
        throw new Error(`unknown type: ${play.type}`);
    }

    volumeCredits += Math.max(perform.audience - 30, 0);

    if ("comedy" === play.type) {
      volumeCredits += Math.floor(perform.audience / 5);
    }

    result += `  ${play.name}: ${format(thisAmount / 100)} (${
      perform.audience
    } seats)\n`;
    totalAmount += thisAmount;
  }

  result += `Amount owned is: ${format(totalAmount / 100)} \n`;
  result += `You earned ${volumeCredits} credits \n`;
  return result;
}

module.exports = statement;
