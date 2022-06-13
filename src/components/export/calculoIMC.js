export default function calculoIMC(alt, peso) {
  let imcCalc = (peso / (alt * alt)) * 10000;
  return imcCalc;
}
