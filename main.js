const getRandomLower = () => String.fromCharCode(crypto.getRandomValues(new Uint8Array(1))[0] % 26 + 97);
const getRandomUpper = () => String.fromCharCode(crypto.getRandomValues(new Uint8Array(1))[0] % 26 + 65);
const getRandomNumber = () => String.fromCharCode(crypto.getRandomValues(new Uint8Array(1))[0] % 10 + 48);

const getRandomSymbol = () => {
  const symbols = '!@#$%^&*(){}[]=<>/,.';
  return symbols[crypto.getRandomValues(new Uint8Array(1))[0] % symbols.length];
}

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol
}

const resultEl = document.querySelector('#result');
const lengthEl = document.querySelector('#length');
const uppercaseEl = document.querySelector('#uppercase');
const lowercaseEl = document.querySelector('#lowercase');
const numbersEl = document.querySelector('#numbers');
const symbolsEl = document.querySelector('#symbols');
const generateEl = document.querySelector('#generate');
const clipboardEl = document.querySelector('#clipboard');

const generatePassword = (lower, upper, number, symbol, length) => {
  const typesCount = lower + upper + number + symbol;
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    item => Object.values(item)[0]
  );

  if (typesCount === 0) return '';

  const defaultLength = typesArr.length * 8;
  const finalLength = Math.max(length, defaultLength);

  let newPassword = Array(finalLength).fill(null).flatMap(() => typesArr)
    .map(type => {
      const funcName = Object.keys(type)[0];
      return randomFunc[funcName]();
    });

  return newPassword.join('').slice(0, length);
}

generateEl.addEventListener('click', () => {
  const length = +lengthEl.value;
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  resultEl.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
})

clipboardEl.addEventListener('click', async () => {
  const password = resultEl.innerText;

  if (!password) return;

  try {
    await navigator.clipboard.writeText(password);
    alert('Password copied to clipboard');
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
})
