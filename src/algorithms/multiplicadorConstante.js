
export function multiplicadorConstante(xo, D, a, ri) {
  let y = [];
  let r = xo;

  for (let i = 0; i < ri; i++) {
    let aux = (r * a).toString();
    const resto = aux.length % D;
    const zerosNeeded = resto === 0 ? 0 : D - resto;
    let padded = "0".repeat(zerosNeeded) + aux;

    let digits = padded.split("");
    const chooseDigits = (arr, D) => {
      if (arr.length === D) return arr.reduce((acc, d) => acc + d, "");
      arr.pop();
      arr.shift();
      return chooseDigits(arr, D);
    };

    r = parseInt(chooseDigits(digits, D));
    y.push(r / Math.pow(10, D));
  }
  return y;
}

