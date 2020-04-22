function taylorCos(x, N) {
  let y = 0;
  for (let n = 0; n < N + 1; n++) {
    y += (-1) ** n * x ** (2 * n) / fact(2 * n)
  }
  return y;
}

function taylorSin(x, N) {
  let y = 0;
  for (let n = 0; n < N+1; n++) {
    y += (-1)**n * x**(2*n+1) / fact(2*n+1)
  }
  return y;
}

function fact(n) {
  if (n == 0) {
    return 1;
  } else {
    let output = 1;
    while (n > 0) {
      output *= n;
      n--;
    }
    return output
  }
}