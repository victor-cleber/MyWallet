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

const transactions = [
  {
    id: 1,
    description: "Power",
    amount: -50001,
    date: "26/01/2021",
  },
  {
    id: 2,
    description: "Website",
    amount: 500000,
    date: "26/01/2021",
  },
  {
    id: 3,
    description: "Internet",
    amount: -20012,
    date: "26/01/2021",
  },
  {
    id: 4,
    description: "Water",
    amount: 200000,
    date: "26/01/2021",
  },
];

const Transaction = {
  incomes() {
    let income = 0;
    transactions.forEach((transaction) => {
      if (transaction.amount > 0) {
        income += transaction.amount;
      }
    });
    return income;
  },
  expenses() {
    let expense = 0;
    transactions.forEach((transaction) => {
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
    const signal = Number(value) < 0 ? "-" : "";

    value = String(value).replace(/\D/g, "");

    value = Number(value) / 100;

    value = value.toLocaleString("en-NZ", {
      style: "currency",
      currency: "NZD",
    });

    return signal + value;
  },
};

//Show transactions in HTML
const DOM = {
  transactionsContainer: document.querySelector("#data-table tbody"),
  AddTransaction(transaction, index) {
    const tr = document.createElement("tr");
    tr.innerHTML = DOM.InnerHTMLtransaction(transaction);
    DOM.transactionsContainer.appendChild(tr);
  },
  InnerHTMLtransaction(transaction) {
    const CSSClass = transaction.amount > 0 ? "income" : "expense";
    const amount = Utils.formatCurrency(transaction.amount);
    const html = `
        <td class="description">${transaction.description}</td>
        <td class="${CSSClass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
            <img src="./assets/minus.svg" alt="Remove transaction">
        </td>
    `;
    return html;
  },
  UpdateBalance() {
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
};

//method from collections object
transactions.forEach(function (transaction) {
  DOM.AddTransaction(transaction);
});

DOM.UpdateBalance();
