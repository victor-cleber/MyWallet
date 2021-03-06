const Modal = {
  open() {
    //open a modal
    //add a class active to the modal
    document.querySelector(".modal-overlay").classList.add("active");
  },
  close() {
    //close a modal
    //remove a class active to the modal
    document.querySelector(".modal-overlay").classList.remove("active");
  },
};

const Storage = {
  get() {
    return JSON.parse(localStorage.getItem("my-wallet:transactions") || []);
  },
  set(transactions) {
    localStorage.setItem(
      "my-wallet:transactions",
      JSON.stringify(transactions)
    );
  },
};

const Transaction = {
  //Storage.get(),
  all: [],

  add(transaction) {
    Transaction.all.push(transaction);
    App.reload();
  },

  remove(index) {
    Transaction.all.splice(index, 1);
    App.reload();
  },

  incomes() {
    let income = 0;
    Transaction.all.forEach((transaction) => {
      if (transaction.amount > 0) {
        income += transaction.amount;
      }
    });
    return income;
  },

  expenses() {
    let expense = 0;
    Transaction.all.forEach((transaction) => {
      if (transaction.amount < 0) {
        expense += transaction.amount;
      }
    });
    return expense;
  },

  total() {
    return Transaction.incomes() + Transaction.expenses();
  },
};

const Utils = {
  formatCurrency(value) {
    console.log(value);
    // const signal = Number(value) < 0 ? "-" : "";

    value = Number(value) / 100;

    value = value.toLocaleString("en-NZ", {
      style: "currency",
      currency: "NZD",
    });
    return value;
  },

  formatAmount(value) {
    value = Number(value) * 100;
    return Math.round(value);
  },

  formatDate(date) {
    const splitedDate = date.split("-");
    return `${splitedDate[2]}/${splitedDate[1]}/${splitedDate[0]}`;
  },
};

//Show transactions in HTML
const DOM = {
  transactionsContainer: document.querySelector("#data-table tbody"),
  addTransaction(transaction, index) {
    const tr = document.createElement("tr");
    tr.innerHTML = DOM.innerHTMLtransaction(transaction, index);
    tr.dataset.index = index;
    DOM.transactionsContainer.appendChild(tr);
  },
  innerHTMLtransaction(transaction, index) {
    const CSSClass = transaction.amount > 0 ? "income" : "expense";
    const amount = Utils.formatCurrency(transaction.amount);
    const html = `
        <td class="description">${transaction.description}</td>
        <td class="${CSSClass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
            <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remove transaction">
        </td>
    `;
    return html;
  },
  updateBalance() {
    document.getElementById("incomeDisplay").innerHTML = Utils.formatCurrency(
      Transaction.incomes()
    );
    document.getElementById("expenseDisplay").innerHTML = Utils.formatCurrency(
      Transaction.expenses()
    );
    document.getElementById("totalDisplay").innerHTML = Utils.formatCurrency(
      Transaction.total()
    );
  },
  clearTransactions() {
    DOM.transactionsContainer.innerHTML = "";
  },
};

const Form = {
  description: document.querySelector("input#description"),
  amount: document.querySelector("input#amount"),
  date: document.querySelector("input#date"),

  getValues() {
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value,
    };
  },

  validateFields() {
    const { description, amount, date } = Form.getValues();
    if (
      description.trim() === "" ||
      amount.trim() === "" ||
      date.trim() === ""
    ) {
      throw new Error("Please, fill all fields!");
    }
  },

  formatValues() {
    let { description, amount, date } = Form.getValues();
    amount = Utils.formatAmount(amount);
    date = Utils.formatDate(date);
    return {
      description,
      amount,
      date,
    };
  },
  clearFields() {
    Form.description.value = "";
    Form.date.value = "";
    Form.amount.value = "";
  },

  submit(event) {
    event.preventDefault();
    try {
      Form.validateFields();
      const transaction = Form.formatValues();
      Transaction.add(transaction);
      Form.clearFields();
      Modal.close();
    } catch (error) {
      alert(error.message);
    }
  },
};

const App = {
  init() {
    //method forEach is from collection object

    //Transaction.all.forEach(function(transaction, index) {
    //  DOM.addTransaction(transaction, index)
    //});

    //Transaction.all.forEach((transaction, index) => {
    //  DOM.addTransaction(transaction, index);
    //});

    Transaction.all.forEach(DOM.addTransaction);
    DOM.updateBalance();
    Storage.set(Transaction.all);
  },
  reload() {
    DOM.clearTransactions();
    App.init();
  },
};

App.init();
