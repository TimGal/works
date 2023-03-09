function add(a, b) {
  let arrA, arrB;
  let oneInMind = false;
  let arrRes = [];
  arrA = a.split("");
  arrB = b.split("");
  function zeroFill(arr, diff) {
    for (let i = 1; i <= diff; i++) {
      arr.unshift("0");
    }
  }
  if (arrA.length > arrB.length) {
    let diff = arrA.length - arrB.length;
    zeroFill(arrB, diff);
  } else {
    let diff = arrB.length - arrA.length;
    zeroFill(arrA, diff);
  }
  for (let i = arrB.length - 1; i >= 0; i--) {
    let operandA = Number(arrA[i]);
    let operandB = Number(arrB[i]);
    if (operandA === "0" || operandB === "0") {
      if (operandA === "0") {
        arrRes.unshift(operandB);
      } else if (operandB === "0") {
        arrRes.unshift(operandA);
      } else {
        arrRes.unshift(operandB);
      }
    } else {
      let divSum = Number(operandA) + Number(operandB);
      if (oneInMind) {
        //console.log("Один в уме, потому к сумме добавили 1");
        divSum = divSum + 1;
        oneInMind = false;
        if (divSum > 9) {
          // console.log(
          //   "Сумма после добавления в уме сумма больше 9, потому снова запоминаем"
          // );
          divSum = divSum % 10;
          oneInMind = true;
          arrRes.unshift(divSum);
          continue;
        }
      }
      if (divSum > 9) {
        //console.log("Сумма разрядов больше 9");
        divSum = divSum % 10;
        arrRes.unshift(divSum);
        oneInMind = true;
        continue;
      }
      // console.log("Просто запишем, сумма не больше 9");
      arrRes.unshift(divSum);
    }
  }
  if (oneInMind) {
    arrRes.unshift("1");
  }
  return arrRes.join("");
}

console.log(add("1", "1"), "2");
console.log(add("123", "456"), "579");
console.log(add("888", "222"), "1110");
console.log(add("1372", "69"), "1441");
console.log(add("12", "456"), "468");
console.log(add("101", "100"), "201");
console.log(add("99999999999", "1"), "100000000000");
console.log(
  add("63829983432984289347293874", "90938498237058927340892374089"),
  "91002328220491911630239667963"
);
