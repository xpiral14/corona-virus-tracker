export default function percent(part, total) {
  return parseFloat(((part / total) * 100).toFixed(1));
}
