const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTransactions = [
//   { id: 1, text: 'Flower', amount: -20 },
//   { id: 2, text: 'Salary', amount: 300 },
//   { id: 3, text: 'Book', amount: -10 },
//   { id: 4, text: 'Camera', amount: 150 }
// ]; 

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
let trasactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

const removeTransaction = (id) => {
    trasactions = trasactions.filter(trasaction => trasaction.id !== id);
    updateTransactionLocalStorage();
    init();
}
const addTransaction = (transaction) => {
    const sign = transaction.amount > 0 ? '+' : '-';

    const item = document.createElement('li');
    item.classList.add(sign === '+' ? 'plus' : 'minus')
    item.innerHTML = `
        ${transaction.text}<span>${transaction.amount}</span><button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `
    list.appendChild(item);
}
const generateId = () => {
    return Math.floor(Math.random() * 1000000000);
};

const updateAmount = () => {
    const amounts = trasactions.map(transaction => transaction.amount);
    const amountTotal = trasactions.reduce((acc,cum) => acc + cum.amount,0).toFixed(2);
    balance.innerText = `$${amountTotal}`;
    const income = amounts.filter((amount => amount > 0)).reduce((acc,cum) => acc + cum,0).toFixed(2);
    const expense = amounts.filter((amount => amount < 0)).reduce((acc,cum) => acc + cum,0).toFixed(2);
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${Math.abs(expense)}`
};
const updateTransactionLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(trasactions));
}
const addTransactions = (e) => {
    if(text.value.trim() === '' || amount.value.trim() === '') {
        alert('please add text and amount');
    }
    console.log(amount.value)
    const transaction = {
        id: generateId(),
        text: text.value,
        amount: +amount.value
    };
    trasactions.push(transaction);
    addTransaction(transaction);
    updateAmount();
    updateTransactionLocalStorage();
    text.value = '';
    amount.value = '';
}
const init = () => {
    list.innerHTML = '';
    trasactions.forEach((trasaction) => addTransaction(trasaction));
    updateAmount();
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTransactions(e);
})

init();