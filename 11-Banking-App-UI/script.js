'use strict';
// BANKIST APP

/////////////////////// Data////////////////////////

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2022-10-19T21:31:17.178Z',
    '2022-10-20T07:42:02.383Z',
    '2022-10-21T09:15:04.904Z',
    '2022-10-25T10:17:24.185Z',
    '2022-10-28T14:11:59.604Z',
    '2022-10-29T17:01:17.194Z',
    '2022-10-30T23:36:17.929Z',
    '2022-10-30T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
  currency: 'INR',
  locale: 'en-IN',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
  currency: 'INR',
  locale: 'en-GB',
};

const accounts = [account1, account2, account3, account4];

////////////////////////DOM Elements/////////////////////////////////

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const btnLogin = document.querySelector('.login__btn');
const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const labelWelcome = document.querySelector('.welcome');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnClose = document.querySelector('.form__btn--close');
let inputCloseUserName = document.querySelector('.form__input--user');
let inputClosePin = document.querySelector('.form__input--pin');
const btnLoan = document.querySelector('.form__btn--loan');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const btnSort = document.querySelector('.btn--sort');
const labelDate = document.querySelector('.date');
const labelTimer = document.querySelector('.timer');

/////////////////////////////// Functions //////////////////////////////

//Username
const createUserName = function (accounts) {
  accounts.forEach(function (account) {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(namePart => namePart[0])
      .join('');
  });
};
createUserName(accounts);
// UpadteUI
const updateUi = function (currentAccount) {
  calcDisplayBalance(currentAccount);
  displayMovements(currentAccount);
  changeTableRowCol();
  calcDisplaySummary(currentAccount);
};

// Dom manipulations

const changeTableRowCol = function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) {
      row.style.backgroundColor = '#dddd';
    }
  });
};

// date of transaction
const formatMovementDate = function (date, locale) {
  const daysPassed = Math.round(
    Math.abs(date - new Date()) / (1000 * 60 * 60 * 24)
  );
  if (daysPassed === 0) return 'Today';
  else if (daysPassed === 1) return 'Yesterday';
  else if (daysPassed <= 7) return `${daysPassed} days ago`;
  else if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth()}`.padStart(2, 0);
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

// Movement of funds
const displayMovements = function (currentAccount, sort = false) {
  const movements = currentAccount.movements;
  containerMovements.innerHTML = '';
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const tDate = new Date(currentAccount.movementsDates[i]);
    const transactionDate = formatMovementDate(tDate, currentAccount.locale);
    const formattedMov = formatCur(
      mov,
      currentAccount.locale,
      currentAccount.currency
    );
    // html
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class = "movements__date">${transactionDate}</div>
    <div class="movements__value">${formattedMov}</div>
  </div>`;
    // push HTML
    containerMovements.insertAdjacentHTML('afterbegin', html);
    // color alternate row
  });
};

// PrintBalance
const calcDisplayBalance = function (currentAccount) {
  const movements = currentAccount.movements;
  currentAccount.balance = movements.reduce((acc, mov) => (acc += mov), 0);
  labelBalance.textContent = formatCur(
    currentAccount.balance,
    currentAccount.locale,
    currentAccount.currency
  );
  // `${currentAccount.balance.toFixed(2)}€`;
  // implementing Date
  // const now = new Date();
  // const date = `${now.getDate()}`.padStart(2, 0);
  // const month = `${now.getMonth()}`.padStart(2, 0);
  // const year = now.getFullYear();
  // const hour = now.getHours();
  // const minute = now.getMinutes();
  // // Experimenting with API
  const now = new Date();
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'long',
    weekday: 'long',
    year: 'numeric',
  };
  // const locale = navigator.language;
  labelDate.textContent = new Intl.DateTimeFormat(
    currentAccount.locale,
    options
  ).format(now);
};
// Display summary
const calcDisplaySummary = function (currentAccount) {
  const movemnts = currentAccount.movements;
  const interestRate = Math.round(currentAccount.interestRate, 2);
  const incomes = movemnts
    .filter(mov => mov > 0)
    .reduce((acc, mov) => (acc += mov), 0);
  labelSumIn.textContent = formatCur(
    incomes,
    currentAccount.locale,
    currentAccount.currency
  );

  // `${incomes.toFixed(2)}€`;

  const expense = movemnts
    .filter(mov => mov < 0)
    .reduce((acc, mov) => (acc += mov), 0);
  labelSumOut.textContent = formatCur(
    Math.abs(expense),
    currentAccount.locale,
    currentAccount.currency
  );

  // `${Math.abs(expense).toFixed(2)}€`;
  const interest = movemnts
    .filter(mov => mov > 0)
    .map(deposits => (deposits * interestRate) / 100)
    .filter(int => int > 1)
    .reduce((acc, int) => (acc += int), 0);
  labelSumInterest.textContent = formatCur(
    interest,
    currentAccount.locale,
    currentAccount.currency
  );
  // `${interest.toFixed(2)}€`;
};

const stratLogoutTimer = function () {
  const tick = function () {
    // show time
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const seconds = String(Math.trunc(time % 60)).padStart(2, 0);
    labelTimer.textContent = `${min}:${seconds}`;
    // logout
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
    }
    // decrease by 1
    time--;
  };
  // set time 2 minutes
  let time = 120;
  // call tick imedietly
  tick();
  // call the timer every second
  const timer = setInterval(tick, 1000);
  return timer;
};

/////////////////////////////Event Handlers/////////////////////////////
let currentAccount, timer;

// fake log in
// currentAccount = account1;
// updateUi(currentAccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  // implementing login
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Welcome message
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;
    // clear input field
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    // Display UI
    containerApp.style.opacity = 100;
    // timer
    if (timer) clearInterval(timer);
    timer = stratLogoutTimer();
    // Upadte UI
    updateUi(currentAccount);
  }
});

//implementing transfers
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  if (
    amount > 0 &&
    receiverAccount &&
    amount <= currentAccount.balance &&
    receiverAccount?.username !== currentAccount.username
  ) {
    console.log('valid');
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAccount.movementsDates.push(new Date().toISOString());
    updateUi(currentAccount);
  }

  inputTransferAmount.value = inputTransferTo.value = '';
  // Reset Timer
  clearInterval(timer);
  timer = stratLogoutTimer();
});

// loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= 0.1 * amount)) {
    setTimeout(function () {
      // add movement
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());
      // update UI
      updateUi(currentAccount);
    }, 2000);
  } else console.log('Denied');
  inputLoanAmount.value = '';
  // Reset Timer
  clearInterval(timer);
  timer = stratLogoutTimer();
});

// account Close
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUserName.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    // findindex returns the index
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    console.log(accounts);
  }
  inputCloseUserName.value = inputClosePin = '';
});
// sort functionality
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  changeTableRowCol();
  sorted = !sorted;
});

// getting the value from UI
labelBalance.addEventListener('click', function () {
  const movemetsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => el.textContent.replace('€', ' ')
  );
  console.log(movemetsUI);

  const movemetsUI2 = [...document.querySelectorAll('.movements__value')];
  console.log(movemetsUI2);
});
labelBalance.addEventListener('click', changeTableRowCol);
