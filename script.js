const Modal = {
    open(){
        // Abrir modal 
        // Adicionar a class active ao modal
        document
        .querySelector('.modal-overlay')
        .classList
        .add('active')

    },
    close(){
        // Fechar modal
        // Remover a class active do modal
        document
        .querySelector('.modal-overlay')
        .classList
        .remove('active')
    }
}

const transactions = [
    {
        id: 1,
        description: 'Luz',
        amount: -50000,
        date: '23/01/2021',
    }, 
    {
        id: 2,
        description: 'Website',
        amount: 500000,
        date: '23/01/2021',
    }, 
    {
        id: 3,
        description: 'Internet',
        amount: -20000,
        date: '23/01/2021',
    },
    {
        id: 4,
        description: 'App',
        amount: 200000,
        date: '23/01/2021',
    }
]

// Eu preciso somar as entradas
// depois eu preciso somar as saídas e
// remover das entradas o valor das saídas
// assim terei o total

const Transaction = {
    incomes() {
        // somar as entradas

        let income = 0;
        // pegar todas as transações
        // para cada transação
        transactions.forEach(transaction => {
            // se for maior que zero 
            if(transaction.amount > 0) {
                // somar a uma variável e retornar a variável
                income += transaction.amount;
            }
        })
       
        return income;
    },
    expenses() {
            // somar as entradas
    
            let expense = 0;
            // pegar todas as transações
            // para cada transação
            transactions.forEach(transaction => {
                // se for menor que zero 
                if(transaction.amount < 0) {
                    // somar a uma variável e retornar a variável
                    expense += transaction.amount;
                }
            })
           
            return expense;
    },
    total() {
        return Transaction.incomes() + Transaction.expenses()
    }
}

// Substituir os dados do HTML com os dados do JS

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)
    },
    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
            <img src="assets/minus.svg" alt="Remover Transação">
        </td>
        `

        return html
    },

    updateBalance() {
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes())
        document
            .getElementById('expensiveDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.expenses())
        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.total())
    }
}

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value
    }
}

transactions.forEach(function(transaction) {
    DOM.addTransaction(transaction)
})

DOM.updateBalance()