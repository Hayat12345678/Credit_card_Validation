function validateCreditCard(creditCardNum) {
  creditCardNum = creditCardNum.replaceAll("-", "");

  if (creditCardNum.length !== 16) {
    return {
      valid: false,
      number: creditCardNum,
      error: "wrong_length",
    };
  }

  let obj = {};
  for (let i = 0; i < creditCardNum.length; i++) {
    obj[creditCardNum[i]] = true;
  }
  if (Object.keys(obj).length < 2) {
    return {
      valid: false,
      number: creditCardNum,
      error: "min two diferent digits required",
    };
  }

  for (let num of creditCardNum) {
    let currentNumber = parseInt(num);
    if (!Number.isInteger(currentNumber)) {
      return {
        valid: false,
        number: creditCardNum,
        error: "leter is not avalable",
      };
    }
  }

  const lastDigit = parseInt(creditCardNum[creditCardNum.length - 1]);
  if (lastDigit % 2 != 0) {
    return {
      valid: false,
      number: creditCardNum,
      error: "Last digit must to be even",
    };
  }

  //sum greter then 16
  let sum = 0;
  for (let i = 0; i < creditCardNum.length; i++) {
    sum += Number(creditCardNum[i]);
  }

  if (sum <= 16) {
    return {
      valid: false,
      number: creditCardNum,
      error: "Sum of all digits must to be greter then 16",
    };
  }

  return { valid: true, number: creditCardNum };
}

/**** tests *****/
console.log(validateCreditCard("9999-7777-8888-0000")); //{ valid: true, number: '9999-7777-8888-0000' }
console.log(validateCreditCard("6666-6666-6666-1666")); //{ valid: true, number: '6666-6666-6666-1666' }
console.log(validateCreditCard("a923-3211-9c01-1112")); //{ valid: false,number: 'a923-3211-9c01-1112',error: '_invalid characters_' }
console.log(validateCreditCard("4444-4444-4444-4444")); //{ valid: false,number: '4444-4444-4444-4444',error: '_only one type of number_' }
console.log(validateCreditCard("0000-1111-1111-1112")); //{ valid: true, number: '1211-1111-1111-1112' }
