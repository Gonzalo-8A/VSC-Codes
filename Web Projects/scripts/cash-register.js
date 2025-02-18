const cash = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDue = document.getElementById("change-due");
const changeInDrawer = document.getElementById("change-in-drawer");
const price = 326
console.log(cash.value)

let change = {
  Pennies: 101,
  Nickels: 205,
  Dimes: 310,
  Quarters: 425,
  Ones: 9000,
  Fives: 5500,
  Tens: 2000,
  Twenties: 6000,
  Hundreds: 10000,
}

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
  if(changeInDrawer.innerHTML !== "") {
    changeInDrawer.innerHTML = "";
  }
  
  for(let i=0; i < currencyUnitAmount.length; i++) {
    {changeInDrawer.innerHTML = `
    ${currencyUnitNames[i]}: $${convertToDollars(currencyUnitAmount[i] * money[i])}
    <br>
    ${changeInDrawer.innerHTML}
    `}
  }
}


const convertToPennies = num => num*100;
const convertToDollars = (priceCents) => (Math.round(priceCents) / 100);

const getChange = (cash) => {
  let changeInPennies = convertToPennies(cash) - price;
  if (convertToPennies(cash) < price) {
    alert("Customer does not have enough money to purchase the item")
    return
  }

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
  
  
  console.log(currencyUnitAmount)
}



updateChangeInDrawer();

purchaseBtn.addEventListener('click', () => getChange(cash.value))