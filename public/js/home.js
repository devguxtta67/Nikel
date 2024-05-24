const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = sessionStorage.getItem("session");

let data = {
    transactions: []
};

document.getElementById("button-logout").addEventListener("click", logout);
document.getElementById("transactions-button").addEventListener("click", function(){
    window.location.href = "transactions.html";
});


// ADICIONAR LANÇAMENTO
document.getElementById("transaction-form").addEventListener("submit", function(e){
    e.preventDefault();
    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector('input[name="type-input"]:checked').value;

    data.transactions.unshift({
        value: value, type: type, description: description, date: date
    });

    saveData(data);
    e.target.reset();
    alert("Lançamento adicionado com sucesso.");
    myModal.hide();

    getCashIn();
    getCashOut();
    getTotal();
});

checkLogged();

function checkLogged(){
    if(session){
        sessionStorage.setItem("logged", session);
        logged = session;
    }
    if(!logged){
        window.location.href = "index.html";
        return;
    }
    const dataUser = localStorage.getItem(logged);
    if(dataUser){
        data = JSON.parse(dataUser);
    }

    getCashIn();
    getCashOut();
    getTotal();
}

function logout(){
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}

function getCashIn(){
    const transactions = data.transactions;

    const cashIn = transactions.filter((item) => item.type === "1");

    if(cashIn.length){
        let cashInHtml = ``;
        let limit = 0;
        if(cashIn.length > 5){
            limit = 5;
        } else {
            limit = cashIn.length;
        }
        for (let index = 0; index < limit; index++) {
            cashInHtml += `
            <div class="row mb-4">
                <div class="col-12">
                    <h3 class="fs-2"> R$ ${cashIn[index].value.toFixed(2)}</h3>
                    <div class="container p-0">
                        <div class="row">
                            <div class="col-12 col-md-8">
                                <p>${cashIn[index].description}</p>
                            </div>
                            <div class="col-12 col-md-3 d-flex justify-content-end">
                                ${cashIn[index].date}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }
        document.getElementById("cash-in-list").innerHTML = cashInHtml;
    }
}

function getCashOut(){
    const transactions = data.transactions;

    const cashOut = transactions.filter((item) => item.type === "2");

    if(cashOut.length){
        let cashOutHtml = ``;
        let limit = 0;
        if(cashOut.length > 5){
            limit = 5;
        } else {
            limit = cashOut.length;
        }
        for (let index = 0; index < limit; index++) {
            cashOutHtml += `
            <div class="row mb-4">
                <div class="col-12">
                    <h3 class="fs-2"> R$ ${cashOut[index].value.toFixed(2)}</h3>
                    <div class="container p-0">
                        <div class="row">
                            <div class="col-12 col-md-8">
                                <p>${cashOut[index].description}</p>
                            </div>
                            <div class="col-12 col-md-3 d-flex justify-content-end">
                                ${cashOut[index].date}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }
        document.getElementById("cash-out-list").innerHTML = cashOutHtml;
    }
}

function getTotal(){
    const transactions = data.transactions;
    let total = 0;
    transactions.forEach((item) => {
        if(item.type ==="1"){
            total+= item.value;
        } else{
            total -= item.value;
        }
 }
);
    document.getElementById("total").innerHTML = `R$ ${total.toFixed(2)}`;
}

function saveData(data) {
    localStorage.setItem(logged, JSON.stringify(data));
}

document.getElementById('transaction-form').addEventListener('submit', function(event) {
    // Previne o envio do formulário para verificar o saldo
    event.preventDefault();

    // Calcula o saldo após adicionar a despesa
    let value = parseFloat(document.getElementById('value-input').value);
    let type = parseInt(document.querySelector('input[name="type-input"]:checked').value);
    let saldoAtual = parseFloat(document.getElementById('total').innerText.replace('R$ ', '').replace(',', '.'));

    if (type === 2 && value > saldoAtual) {
        // Exibe o alerta se o saldo ficar negativo
        document.querySelector('.alert-saldo-negativo').style.display = 'block';
    } else {
        // Submete o formulário se o saldo não for negativo
        this.submit();
    }
});

// Evento para o envio do formulário
document.getElementById('transaction-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o envio do formulário para verificar o saldo

    let value = parseFloat(document.getElementById('value-input').value);
    let type = parseInt(document.querySelector('input[name="type-input"]:checked').value);
    let saldoAtual = parseFloat(document.getElementById('total').innerText.replace('R$ ', '').replace(',', '.'));

    if (type === 2 && value > saldoAtual) {
        // Exibe o alerta se o saldo ficar negativo
        document.querySelector('.alert-saldo-negativo').style.display = 'block';
    } else {
        // Submete o formulário se o saldo não for negativo
        this.submit();
    }
});

// Evento para o botão de confirmar saldo negativo
document.getElementById('confirmar-saldo-negativo').addEventListener('click', function() {
    // Submete o formulário se o usuário confirmar
    document.getElementById('transaction-form').submit();
});


