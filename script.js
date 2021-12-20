const form = document.getElementById('passwordGeneratorForm');
const numberRange = document.getElementById('numberRange');
const playRange = document.getElementById('playRange');
var displayPassword = document.getElementById('displayPassword');
const includeNumber = document.getElementById('numbers');
const includeUpper = document.getElementById('uppercase');
const includeSymbol = document.getElementById('symbol');


const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90)
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122)
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57)
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47).concat(
  arrayFromLowToHigh(58, 64)
).concat(
  arrayFromLowToHigh(91, 96)
).concat(
  arrayFromLowToHigh(123, 126)
)


function copyFunc() {
  const copypass = displayPassword.innerText;
  const el = document.createElement('textarea')
  el.value = copypass
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}

form.addEventListener('submit', e =>{
  e.preventDefault()
  const numberRangeElement = numberRange.value;
  const includeNumberElement = includeNumber.checked;
  const includeUpperElement = includeUpper.checked;
  const includeSymbolElement = includeSymbol.checked;
  const password = generatePassword(numberRangeElement, includeNumberElement, includeUpperElement, includeSymbolElement);
  displayPassword.innerText = password
})


function generatePassword(numberRangeElement, includeNumberElement, includeUpperElement, includeSymbolElement) {
  let charCode = LOWERCASE_CHAR_CODES
  if(includeUpperElement) charCode = charCode.concat(UPPERCASE_CHAR_CODES);
  if(includeSymbolElement) charCode = charCode.concat(SYMBOL_CHAR_CODES);
  if(includeNumberElement) charCode =charCode.concat(NUMBER_CHAR_CODES);

  const passwordCharacter = []
  for(let i = 0; i< numberRangeElement; i++) {
    const characterCode = charCode[Math.floor(Math.random() * charCode.length)]
    passwordCharacter.push(String.fromCharCode(characterCode));
  }
  return passwordCharacter.join('')
}

function arrayFromLowToHigh(low, high) {
  const arry = []
  for(let i = low; i<=high; i++){
    arry.push(i);
  }
  return arry
}


// make equal to input type
numberRange.addEventListener('input', equalityOfRange);
playRange.addEventListener('input', equalityOfRange);

function equalityOfRange(e) {
    const value = e.target.value
    playRange.value = value
    numberRange.value = value
}
