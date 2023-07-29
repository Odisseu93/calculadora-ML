export const maskDecimalPoint = (value) => value.replaceAll(",", ".");

export const maskDecimalComma = (value) => value.replaceAll(".", ",");

export const maskPercentageToDecimal = (value) => Number(value) / 100;

export const formatterCurrency = new Intl.NumberFormat("pt-br", {
  style: "currency",
  currency: "BRL",
});
