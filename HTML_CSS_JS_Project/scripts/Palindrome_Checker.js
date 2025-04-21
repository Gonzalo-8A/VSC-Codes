const textInput = document.getElementById("text-input");
const checkButton = document.getElementById("check-btn");
const result = document.getElementById("result");

const cleanInputString = (str) => {
  return str.replace(/[^0-9a-z]/gi, '')
};

const checkForPalindrome = input => {
  const originalInput = input;
  
  if(input === '') {
    alert("Please input a value.");
    return
  };

  const cleanInput = cleanInputString(input).toLowerCase();;
  const reversedInput = reverseString(cleanInput);
  return cleanInput === reversedInput ? isAPalindrome(originalInput) : isNotAPalindrome(originalInput);
}

function isAPalindrome(input) {
  result.innerHTML = `
    <p>${input} is a palindrome</p>
  `;
  result.classList.remove("hidden")
}

function isNotAPalindrome(input) {
  result.innerHTML = `
    <p>${input} is not a palindrome</p>
  `;
  result.classList.remove("hidden")
}

function reverseString(str) {
  return str.split("").reverse().join("");
}

checkButton.addEventListener('click', () => {
  checkForPalindrome(textInput.value)
  textInput.value = '';
});

textInput.addEventListener('keydown', (event) => {
  if(event.key === 'Enter') {
    checkForPalindrome(textInput.value)
    textInput.value = '';
  }
});