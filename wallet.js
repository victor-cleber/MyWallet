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
    amount: -50000,
    date: "26/01/2021",
  },
  {
    id: 2,
    description: "Website",
    amount: 1000000,
    date: "26/01/2021",
  },
  {
    id: 3,
    description: "Internet",
    amount: -5489000,
    date: "26/01/2021",
  },
  {
    id: 4,
    description: "Water",
    amount: -300900,
    date: "26/01/2021",
  },
];

const Transaction = {
  incomes() {
    //sum incomes
  },
  expenses() {
    //sum expenses
  },
  total() {
    //incomes - expenses
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
  addTransaction(transaction, index) {
    const tr = document.createElement("tr");
    tr.innerHTML = DOM.innerHTMLtransaction(transaction);
    DOM.transactionsContainer.appendChild(tr);
  },
  innerHTMLtransaction(transaction) {
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
};

//method from collections object
transactions.forEach(function (transaction) {
  DOM.addTransaction(transaction);
});
