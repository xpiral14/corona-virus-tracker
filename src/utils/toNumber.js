export default function toNumber(stringNumber) {
  return Number.parseFloat(stringNumber.replace(",", ""));
}
