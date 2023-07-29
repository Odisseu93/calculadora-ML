import { maskDecimalPoint, formatterCurrency } from "../utils/masks/index.mjs";
import { formatToNumber } from "../helpers/formatToNumber.mjs";

const form = document.querySelector("form");
const btnClear = document.querySelector("#btnClear");
const finalPrice = document.querySelector("#finalPrice");

const handleSubmit = (e)=> {
  e.preventDefault();

  const ProductTaxCalc = document.querySelector('#ProductTaxCalc');
  const ProfitMarginCalc = document.querySelector('#ProfitMarginCalc');
  const mlFeeCalc = document.querySelector('#mlFeeCalc');

  const FREE_SHIPPING = 79.00

  const cost = Number(maskDecimalPoint(form.cost.value));
  const profitMargin = formatToNumber(form.profitMargin.value);   
  const tax = formatToNumber(form.tax.value);
  const fee = formatToNumber(form.fee.value);

  const FIXED_VALUE = cost <= FREE_SHIPPING ? 5.50 : 0;

  const freight = Number(maskDecimalPoint(form.freight.value));

  const cost_profitMargin_freight = cost * (1 + profitMargin) + freight + FIXED_VALUE;

  const tax_fee = 1 - (tax + fee);

  const price = cost_profitMargin_freight / tax_fee;

  finalPrice.textContent = formatterCurrency.format(price);

  cost && form.profitMargin.value !== undefined
    ? (ProfitMarginCalc.textContent = formatterCurrency.format(cost * profitMargin))
    : "";

  cost && form.tax.value !== undefined
    ? (ProductTaxCalc.textContent = formatterCurrency.format(price * tax))
    : "";

  cost && form.fee.value !== undefined
    ? (mlFeeCalc.textContent = formatterCurrency.format(
      cost <= FREE_SHIPPING ? (price * fee) + FIXED_VALUE : price * fee
    ))
    : "";
}

const handleClear = () => {
  document.querySelectorAll('input').forEach(input => input.value = '');
  document.querySelectorAll('.info-calc').forEach(element => element.textContent = '');
  finalPrice.textContent = formatterCurrency.format(0)
}

form.onsubmit = handleSubmit;
btnClear.onclick = handleClear;