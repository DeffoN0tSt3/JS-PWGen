const getRandomLower = () => {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

const getRandomUpper = () => {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

const getRandomNumber = () => {
	return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

const getRandomSymbol = () => {
	// return String.fromCharCode(Math.floor(Math.random() * 16) + 33)
	const symbols = '!@#$%^&*(){}[]=<>/,.'
	return symbols[Math.floor(Math.random() * symbols.length)]
}

const randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol
}

const resultEl = document.querySelector('#result')
const lengthEl = document.querySelector('#length')
const uppercaseEl = document.querySelector('#uppercase')
const lowercaseEl = document.querySelector('#lowercase')
const numbersEl = document.querySelector('#numbers')
const symbolsEl = document.querySelector('#symbols')
const generateEl = document.querySelector('#generate')
const clipboardEl = document.querySelector('#clipboard')

const generatePassword = (lower, upper, number, symbol, length) => {
	let newPassword = ''
	const typesCount = lower + upper + number + symbol
	const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
		item => Object.values(item)[0]
	)

	if (typesCount === 0) {
		return ''
	}

	for (let i = 0; i < length; i += typesCount) {
		typesArr.forEach(type => {
			const funcName = Object.keys(type)[0]
			newPassword += randomFunc[funcName]()
		})
	}

	const finalPassword = newPassword.slice(0, length)
	return finalPassword
}

generateEl.addEventListener('click', () => {
	const length = +lengthEl.value
	const hasLower = lowercaseEl.checked
	const hasUpper = uppercaseEl.checked
	const hasNumber = numbersEl.checked
	const hasSymbol = symbolsEl.checked
	resultEl.innerText = generatePassword(
		hasLower,
		hasUpper,
		hasNumber,
		hasSymbol,
		length
	)
})

/* clipboardEl.addEventListener('click', () => {
	const textarea = document.createElement('textarea')
	const password = resultEl.innerText

	if (!password) {
		return
	}

	textarea.value = password
	document.body.appendChild(textarea)
	textarea.select()
	document.execCommand('copy')
	textarea.remove()
	alert('Password copied to clipboard')
}) */

clipboardEl.addEventListener('click', event => {
	const range = document.createRange()
	range.selectNode(resultEl)
	window.getSelection().addRange(range)

	try {
		const successful = document.execCommand('copy')
		const msg = successful ? 'successful' : 'unsuccessful'
		// console.log('Copied text: ' + msg)
	} catch (err) {
		// console.log('Error copy text');
	}

	window.getSelection().removeAllRanges()
})
