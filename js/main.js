document.querySelector('#buttonFifteen').classList.add('buttonActive');

document.querySelector('#submit').addEventListener('click', displayResults);
document.querySelector('#custom').addEventListener('click', showCustom);
document.querySelector('#reset').addEventListener('click', reset);

document.querySelector('#five').addEventListener('click', hideCustom);
document.querySelector('#ten').addEventListener('click', hideCustom);
document.querySelector('#fifteen').addEventListener('click', hideCustom);
document.querySelector('#twentyFive').addEventListener('click', hideCustom);
document.querySelector('#fifty').addEventListener('click', hideCustom);

document.querySelector('#buttonFive').addEventListener('click', activeEffect);
document.querySelector('#buttonTen').addEventListener('click', activeEffect);
document.querySelector('#buttonFifteen').addEventListener('click', activeEffect);
document.querySelector('#buttonTwentyFive').addEventListener('click', activeEffect);
document.querySelector('#buttonFifty').addEventListener('click', activeEffect);
document.querySelector('#buttonCustom').addEventListener('click', activeEffect);



document.querySelector('#five').addEventListener('click', uncheckDefault);
document.querySelector('#ten').addEventListener('click', uncheckDefault);
document.querySelector('#twentyFive').addEventListener('click', uncheckDefault);
document.querySelector('#fifty').addEventListener('click', uncheckDefault);

let checked = document.querySelector('input[name="percent"]:checked');
const bill = document.querySelector('#billAmount');
let percentage = getPercentage();
const people = document.querySelector('#peopleAmount');


const billError = document.querySelector('#billError');
const peopleError = document.querySelector('#peopleError');
const percentError = document.querySelector('#percentError');

function displayResults() {

  const billAmount = Number(bill.value);
  percentage = getPercentage();
  const numPeople = Number(people.value);
  
  if(confirmResults(billAmount, percentage, numPeople)) {
    clearErrors();
    const tip = billAmount * (percentage / 100);
    const totalWithTip = billAmount + tip;
    document.querySelector('#totalResult').innerText = ('$' + totalWithTip.toFixed(2));
    
    document.querySelector('#tipResult').innerText = ('$' + tip.toFixed(2));

    document.querySelector('#tipPerPerson').innerText = ('$' + (tip/numPeople).toFixed(2));
    
    document.querySelector('#totalPerPerson').innerText = ('$' + (totalWithTip/numPeople).toFixed(2));
  
  
  }
}


function getPercentage() {
  checked = document.querySelector('input[name="percent"]:checked');
  if(checked !== null) {
    let checkedValue = checked.id;
    
    let tipPercent;
    switch(checkedValue) {
      case 'five':
        tipPercent = 5;
        break;
      case 'ten':
        tipPercent = 10;
        break;
      case 'fifteen':
        tipPercent = 15;
        break;
      case 'twentyFive':
        tipPercent = 25;
        break;
      case 'fifty':
        tipPercent = 50;
        break;
      case 'custom':
        tipPercent = customPercent();
        break;
      default:
        break;
    }
    return tipPercent;
  }
  
}

function customPercent() {
  return Number(document.querySelector('#customInput').value);
}

function showCustom() {
  document.querySelector('.percentSymbol').classList.remove('removed');
  document.querySelector('#customInput').focus();
  document.querySelector('#buttonCustom').classList.add('removed');
}

function hideCustom() {
  document.querySelector('.percentSymbol').classList.add('removed');
  document.querySelector('#buttonCustom').classList.remove('removed');
}

function confirmResults(billInput, percentInput, peopleInput) {
  let billEmpty = billInput === 0 ? true : false;
  let peopleEmpty = peopleInput === 0 ? true : false;
  
  if(billEmpty && peopleEmpty) {
    billError.classList.remove('hidden');
    peopleError.classList.remove('hidden');
    bill.classList.add('emptyError');
    people.classList.add('emptyError');
    return false;
  } else if(billEmpty) {
    billError.classList.remove('hidden');
    bill.classList.add('emptyError');
    return false;
  } else if(peopleEmpty) {
    peopleError.classList.remove('hidden');
    people.classList.add('emptyError');
    return false;
  }
  return true;
}

function clearErrors() {
  billError.classList.add('hidden');
  bill.classList.remove('emptyError')
  peopleError.classList.add('hidden');
  people.classList.remove('emptyError');
}

function uncheckDefault() {
  // checked.removeAttribute('checked');
  checked.checked = false;
}



function reset() {
  billAmount.value = '';
  peopleAmount.value = '';
  document.querySelector('#totalResult').innerText = '$0.00';
  document.querySelector('#tipResult').innerText = '$0.00';
  document.querySelector('#totalPerPerson').innerText = '$0.00';
  document.querySelector('#tipPerPerson').innerText = '$0.00';
  document.querySelector('#customInput').value = '';
  document.querySelector('#buttonCustom').classList.remove('buttonActive');
  hideCustom();
  removeEffects();
  clearErrors();
  document.querySelector('#buttonFifteen').classList.add('buttonActive');
  let defaultPercent = document.getElementById('fifteen');
  defaultPercent.checked = true;
}

function activeEffect() {
  removeEffects();
  this.classList.add('buttonActive');
}

function removeEffects() {
  let buttons = document.querySelectorAll('.button');
  buttons.forEach(element => {
    element.classList.remove('buttonActive');
  });
}
