const cash = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDue = document.getElementById("change-due");
const changeInDrawer = document.getElementById("change-in-drawer");
const priceInput = document.getElementById("price")
console.log(cash.value);
const enterPriceBtn = document.getElementById("enter-price-btn");
const cashTotal = document.getElementById("cash-total")

let price = 0;
let currencyUnitAmount = [1, 3, 2, 11, 90, 17, 31, 41, 101]
let money = [10000, 2000, 1000, 500, 100, 25, 10, 5, 1]
const currencyUnitNames = ["Houndreds", "Twenties", "Tens", "Fives", "Ones", "Quarters", "Dimes", "Nickels", "Pennies"]

const checkTotalChangeSinceIndex = (index) => {
  let totalChange = 0;
  for(let i = index; i < money.length; i++){
    totalChange += currencyUnitAmount[i]*money[i]
  }
  return totalChange
}

const updateChangeInDrawer = () => {

  if (changeInDrawer.innerHTML !== "") {
    changeInDrawer.innerHTML = '';
  }

  let updatedContent = [];

  for (let i = 0; i < currencyUnitAmount.length; i++) {
    updatedContent.push(`
      ${currencyUnitNames[i]}: $${convertToDollars(currencyUnitAmount[i] * money[i])}
      <br>
    `);
  }

  changeInDrawer.innerHTML = `<p class="change-in-drawer-title">Change in drawer: </p>` + updatedContent.reverse().join('');
};

const selectPrice = () => {
  console.log(priceInput.value)
  if(!priceInput.value || priceInput.value <= 0) {
    alert("Please introduce a valid total price!")
    return
  }
  
  price = convertToPennies(priceInput.value)
  cashTotal.innerHTML = `
    Total: $${convertToDollars(price)}
  `
}

const convertToPennies = num => num*100;
const convertToDollars = (priceCents) => (Math.round(priceCents) / 100);

const getChange = (cash) => {
  let changeInPennies = convertToPennies(cash) - price;
  if(!price || price === 0) {
    alert("Please introduce a valid total price!");
    return
  }
  if (convertToPennies(cash) < price) {
    alert("Customer does not have enough money to purchase the item");
    return
  }

  changeDue.style.display = "block"
  changeDue.innerHTML = `Status: Open </br>`;
  if(changeDue.innerHTML !== "") {
    changeDue.innerHTML = `Status: Open </br>`;
  }

  for(let i = 0; i < money.length; i++) {
    if(changeInPennies === 0) {
      break

    } else if(checkTotalChangeSinceIndex(i) < changeInPennies) {
      changeDue.innerHTML = "Status: INSUFFICIENT_FUNDS";
      break

    } else if (checkTotalChangeSinceIndex(i) === changeInPennies) {
      changeDue.innerHTML = "Status: CLOSED </br>"; 
      for(let i = 0; i < money.length; i++) {
        if(currencyUnitAmount[i] === 0) {
          continue
        } else {
          changeDue.innerHTML += `
          ${currencyUnitNames[i]}: $${convertToDollars(currencyUnitAmount[i] * money[i])}
          <br>
          `
          currencyUnitAmount[i] = 0
          continue
        }
      }
      break

    } else if(changeInPennies/money[i] >= 1) {

      const billsToReduce = Math.floor(changeInPennies/money[i]);
      if(currencyUnitAmount[i] < billsToReduce) {
        changeInPennies -= (currencyUnitAmount[i]*money[i])

        if (currencyUnitAmount[i] > 0) {
          changeDue.innerHTML += `
          ${currencyUnitNames[i]}: $${convertToDollars(currencyUnitAmount[i] * money[i])}
          <br>
        `}

        currencyUnitAmount[i] = 0;
        
      } else {
        changeInPennies -= billsToReduce*money[i];
        changeDue.innerHTML += `
          ${currencyUnitNames[i]}: $${convertToDollars(billsToReduce * money[i])}
          <br>
        `
        currencyUnitAmount[i] -= billsToReduce;
      }

    } else {
      continue
    }
  }

  
  updateChangeInDrawer();
}
updateChangeInDrawer();

enterPriceBtn.addEventListener('click', () => {
  selectPrice()
});

priceInput.addEventListener('keydown', (e) => {
  if(e.key === 'Enter') {
    selectPrice()
  }
})

purchaseBtn.addEventListener('click', () => getChange(cash.value));

cash.addEventListener('keydown', (e) => {
  if(e.key === 'Enter') {
    getChange(cash.value)
  }
})