let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
let startButton = document.getElementById('start'),
      incomePlus = document.getElementsByTagName('button')[0],
      expensesPlus = document.getElementsByTagName('button')[1],
      depositCheck = document.querySelector('#deposit-check'),
      additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
      budgetDayValue = document.querySelector('.budget_day-value'),
      expensesMonthValue = document.querySelector('.expenses_month-value'),
      additionalIncomeValue = document.querySelector('.additional_income-value'),
      additionalExpensesValue = document.querySelector('.additional_expenses-value'),
      periodSelect = document.querySelector('.period-select'),
      targetMonthValue = document.querySelector('.target_month-value'),
      budgetMonthValue = document.querySelector('.budget_month-value'),
      salaryAmount = document.querySelector('.salary-amount'),
      incomeTitle = document.querySelector('.income-title'),
      expensesTitle = document.querySelector('.expenses-title'),
      expensesItems = document.querySelectorAll('.expenses-items'),
      depositAmount = document.querySelector('.deposit-amount'),
      depositPercent = document.querySelector('.deposit-percent'),
      targetAmount = document.querySelector('.target-amount'),
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      incomePeriodValue = document.querySelector('.income_period-value'),
      incomeItem = document.querySelectorAll('.income-items');
      periodAmount = document.querySelector('.period-amount');

let appData = {
    budget: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    resultIncomePeriod: 0,
    start: function() {
        
       if (salaryAmount.value === ''){
            return;
        }//помощь зала
    
        appData.budget = +salaryAmount.value;

        appData.getExpenses();
        appData.expensesMonth();
        appData.getIncome();
        appData.targetMonth();
        appData.statusMission();
        appData.statusIncome();
        appData.getInfoDeposit();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.budgetMonth();
        appData.budgetDay();
        appData.getIncomePeriodValue();
        appData.showResult();
        
       
    },
    showResult: function() {
        budgetMonthValue.value = appData.budgetMonth();
        budgetDayValue.value = Math.ceil(appData.budgetDay());
        expensesMonthValue.value = appData.expensesMonth();
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.targetMonth());
        incomePeriodValue.value = appData.calcPeriod();
        periodSelect.addEventListener('click', appData.getIncomePeriodValue);//помощь зала
       
    },
    addExpensesBlock: function () {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');

        if(expensesItems.length === 3){
            expensesPlus.style.display = 'none';
        }
    },
    getExpenses: function() {
        expensesItems.forEach(function(item){
            console.log(item);
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                appData.expenses[itemExpenses] = +cashExpenses;
            }
        });

    },
    addIncomeBlock: function(){
        let cloneIncomeItem = incomeItem[0].cloneNode(true);
        incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItem = document.querySelectorAll('.income-items');

        if(incomeItem.length === 3){
            incomePlus.style.display = 'none';
            }
    },
    getIncome: function() {
         incomeItem.forEach(function(item){
            console.log(item);
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
             if(itemIncome !== '' && cashIncome !== ''){
            appData.income[itemIncome] = +cashIncome;
            }
        });
        for (let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }
    },
    getAddExpenses: function(){
         let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== ''){
                appData.addExpenses.push(item);
                }
            });
    },
    getAddIncome: function() {
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if(itemValue !== ''){
                appData.addIncome.push(itemValue);
                }
            });
    },
    expensesMonth: function () {
        let summed = 0;
            for (let key in appData.expenses) {
            summed += appData.expenses[key];
    }
            return (summed);
    },
    budgetDay: function() {
        return appData.budgetMonth()/30;
    },
    budgetMonth: function() {
        return (appData.budget + appData.incomeMonth - appData.expensesMonth());  
    },
    targetMonth: function() {
        return  targetAmount.value / appData.budgetMonth();
    },
    statusMission: function() {
        if (appData.targetMonth() >= 0) {
            return ('Цель будет достигунта за: ' + Math.ceil(appData.targetMonth()) + ' месяцев');
    } else {
            return ('Цель не будет достигнута');
    }
},
    statusIncome: function() {
        if (appData.budgetDay() >= 1200) {
            return ('У вас высокий уровень дохода');
    } else if (appData.budgetDay() >= 600 && appData.budgetDay() < 1200) {
            return ('У вас средний уровень дохода');
    } else if (appData.budgetDay() > 0 && appData.budgetDay() < 600) {
            return ('К сожалению у вас уровень дохода ниже среднего');
    } else {
            return ('Что то пошло не так');  
    }
},
getInfoDeposit: function() {
    if(appData.deposit){
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        do {
            appData.percentDeposit = prompt('Какой годовой процент?');
            }
        while (!isNumber(appData.percentDeposit));

        do {
            appData.moneyDeposit = prompt('Какая сумма заложена?');
            }
        while (!isNumber(appData.moneyDeposit));
    }
},
calcSavedMoney: function() {
    return appData.budgetMonth() * appData.period;
},
calcPeriod: function () {
    return appData.budgetMonth() * periodSelect.value;
},
getIncomePeriodValue: function(){
    incomePeriodValue.value = budgetMonthValue.value * periodSelect.value;
} //помощь зала
}
startButton.addEventListener('click', appData.start);

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', function () {
    periodAmount.innerHTML = periodSelect.value;
  });