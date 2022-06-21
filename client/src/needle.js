function FindNeedle(haystack, needle) {
  if (needle.length < haystack.length) {
    for (let i = 1; i <= haystack.length; i++) {
      haystack = haystack.substring(1, haystack.length);
      if (haystack === needle) {
        return i;
      }
    }
  }
  return -1;
}
FindNeedle("react-redux", "redux");
FindNeedle("prueba", "pink");
FindNeedle("prueba", "pinkkkkkkkkkkkk");

function SumArray(arreglo, numero) {
  let inicio = 0;
  let final = arreglo.length - 1;
  while (inicio < final) {
    let suma = arreglo[i] + arreglo[x];
    if (suma === numero) {
      return true;
    } else {
      if (suma < n) {
        inicio++;
      } else {
        final--;
      }
    }
  }
}
//   if (arreglo.length < 1) {
//     return false;
//   }
//   for (let i = 0; i < arreglo.length - 1; i++) {
//     for (let j = i + 1; j < arreglo.length; j++) {
//       if (arreglo[i] + arreglo[j] === numero) {
//         console.log(numero, true);
//         return true;
//       }
//     }
//   }
//   console.log(numero);
//   return false;
// }

SumArray([2, 4, 5, 9], 9);
SumArray([2, 4, 5, 9], 10);
SumArray([2, 5, 9], 10);
SumArray([2, 4, 5, 9], 10);
