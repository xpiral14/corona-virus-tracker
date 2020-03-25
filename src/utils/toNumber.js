export default function toNumber(stringNumber) {
  return stringNumber ? Number.parseFloat(stringNumber.replace(",", "")) : 0;
}
