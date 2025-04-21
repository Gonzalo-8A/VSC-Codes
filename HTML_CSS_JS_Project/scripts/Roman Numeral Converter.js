const number = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const output = document.getElementById("output");


const isValidInput = () => {
  if(!number.value) {
    output.classList.remove("hidden");
    output.classList.add("alert");
    output.innerText = "Please enter a valid number.";
    return
  } else if (number.value <= 0) {
    output.classList.remove("hidden");
    output.classList.add("alert");
    output.innerText = "Please enter a number greater than or equal to 1";
    return
  } else if (number.value > 3999) {
    output.classList.remove("hidden");
    output.classList.add("alert");
    output.innerText = "Please enter a number less than or equal to 3999";
    return
  } else {
    output.classList.remove("hidden");
    output.classList.remove("alert");
    const result = convertToRoman(number.value);
    output.innerText = result;
  }
}

const convertToRoman = (num) => {
 const val = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
 const syms = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IX", "I"];
 let roman = '';

  let i = 0;
  while (num > 0) {
    const div = Math.floor(num / val[i]);
    num -= div * val[i];
    roman += syms[i].repeat(div);
    i++
  }
  return roman
}

convertBtn.addEventListener('click', () => {
  isValidInput();
});

number.addEventListener('keydown', e => {
  if(e.key === "Enter") {
    isValidInput();
  }
})