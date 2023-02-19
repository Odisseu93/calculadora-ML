const form = document.querySelector("form");
const btnCalc = document.querySelector("#btnCalc");
const btnClear = document.querySelector("#btnClear");
const finalPrice = document.querySelector("#finalPrice");

// utils
const replacingComma = (value) => value.replaceAll(",", ".");
const replacingDot = (value) => value.replaceAll(".", ",");
const Formatter = new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
});

const percentageToDecimal = (value) => Number(value) / 100;

form.onsubmit = (e) => {
    e.preventDefault();

    const ProductTaxCalc = document.querySelector('#ProductTaxCalc');
    const ProfitMarginCalc = document.querySelector('#ProfitMarginCalc');
    const mlFeeCalc = document.querySelector('#mlFeeCalc');
    
  const FREE_SHIPPING = 79.00
  
  
  const cost = Number(replacingComma(form.cost.value));
  
  const profitMargin = Number(
    percentageToDecimal(
      replacingComma(form.profitMargin.value)
      )
      );
      
      
      
      const tax = Number(
        percentageToDecimal(
          replacingComma(form.tax.value)
          )
          );
          
          const fee = Number(
            percentageToDecimal(
              replacingComma(form.fee.value))
              );
              
              
              const FIXED_VALUE = cost <= FREE_SHIPPING ? 5.50 : 0;
              
              const freight = Number( replacingComma(form.freight.value));
              
              const cost_profitMargin_freight  = cost *(1 + profitMargin) + freight + FIXED_VALUE  ;
              
              const tax_fee = 1 - (tax + fee);
              
              const calcResult = cost_profitMargin_freight / tax_fee;
              


  finalPrice.textContent = Formatter.format(calcResult);


  cost && form.profitMargin.value !== undefined
    ? (ProfitMarginCalc.textContent = Formatter.format(cost * profitMargin))
    : "";

  cost && form.tax.value !== undefined
    ? (ProductTaxCalc.textContent = Formatter.format(calcResult * tax))
    : "";

  cost && form.fee.value !== undefined
    ? (mlFeeCalc.textContent = Formatter.format(
        cost <= FREE_SHIPPING ? (calcResult * fee) + FIXED_VALUE : calcResult * fee
      ))
    : "";
};


btnClear.onclick = ()=> {

document.querySelectorAll('input').forEach(input => input.value = '');    
document.querySelectorAll('.info-calc').forEach(element => element.textContent = '');    

};