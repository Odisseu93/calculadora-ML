import { maskPercentageToDecimal, maskDecimalPoint } from "../utils/masks/index.mjs";

export const formatToNumber = (str) => Number(maskPercentageToDecimal(
  maskDecimalPoint(str)
))

