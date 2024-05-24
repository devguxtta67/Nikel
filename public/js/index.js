const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = sessionStorage.getItem("session");



document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checkSession = document.getElementById("session-check").checked;

    const account = getAccount(email);
    if (!account) {
        alert("Erro no login. Verifique o usuário ou a senha.");
        return;
    }

    if (account.password !== password) {
        alert("Erro no login. Verifique o usuário ou a senha.");
        return;
    }
    saveSession(email, checkSession); // Adicionado aqui para salvar a sessão

    window.location.href = "home.html";
});

  


document.getElementById("create-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;

    if (email.length < 5) {
        alert("Preencha o campo com seu email válido");
        return;
    }

    if (password.length < 4) {
        alert("Preencha o campo com no mínimo 4 dígitos.");
        return;
    }

    saveAccount({
        login: email,
        password: password,
        transactions: []
    });
    function checkLogged() {
        if (session) {
            sessionStorage.setItem("logged", session);
            logged = session;
    
        }
        if (logged) {
            saveSession(logged, true); // Salvando a sessão atual como verdadeira
            window.location.href = "home.html";
        }
    }
    checkLogged();
    
    

    myModal.hide();
    alert("Conta criada com sucesso!");
});

function saveAccount(data) {
    // Simulação de hashing da senha (não use em produção)
    const hashedPassword = hashPassword(data.password);

    localStorage.setItem(data.login, JSON.stringify({
        password: hashedPassword,
        transactions: data.transactions
    }));
}

function getAccount(key) {
    const account = localStorage.getItem(key);
    return account ? JSON.parse(account) : null;
}
function saveSession(data, saveSession){
    if(saveSession){
        localStorage.setItem("session", data);
    }
    sessionStorage.setItem("logged", data);
}


function hashPassword(password) {
    // Esta função é uma simulação e não deve ser usada em produção
    // Use bibliotecas de hashing de senha adequadas (por exemplo, bcrypt)
    return password;
}
document.getElementById('create-form').addEventListener('submit', function(event) {
    var password = document.getElementById('password-create-input').value;
    var confirmPassword = document.getElementById('password-confirm-input').value;
    var passwordError = document.getElementById('password-error');
    
    if (password !== confirmPassword) {
        passwordError.classList.remove('d-none');
        event.preventDefault(); // Impede o envio do formulário
    } else {
        passwordError.classList.add('d-none');
    }
});
