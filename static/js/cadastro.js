import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAT9q9Yqs8NL4_c0egcwxRjcgPBXC1pbcg",
    authDomain: "cafecomp-gestao.firebaseapp.com",
    projectId: "cafecomp-gestao",
    storageBucket: "cafecomp-gestao.firebasestorage.app",
    messagingSenderId: "271234898667",
    appId: "1:271234898667:web:631ca66b9a38bd195d7cae",
    measurementId: "G-ZCJMYJ893E"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const inputEmail = document.getElementById('inputEmail');
const inputSenha = document.getElementById('inputSenha');
const inputConfirmaSenha = document.getElementById('inputConfirmaSenha');
const botaoConfirmar = document.getElementById('botaoConfirmar');

const mostrarErro = (mensagem) => {
    alert(mensagem);
};

// Evento de clique no botão de cadastro
botaoConfirmar.addEventListener('click', async (e) => {
    e.preventDefault();

    const email = inputEmail.value;
    const senha = inputSenha.value;
    const confirmaSenha = inputConfirmaSenha.value;

    if (!email || !senha || !confirmaSenha) {
        mostrarErro("Por favor, preencha todos os campos.");
        return;
    }

    if (senha !== confirmaSenha) {
        mostrarErro("As senhas não coincidem.");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
        const user = userCredential.user;
        console.log("Usuário criado com sucesso:", user.email);

        // Redireciona para a página inicial após o cadastro usando a rota do Flask
        cadastrarUsuario();
        window.location.href = '/'; // Altere a URL para a rota desejada

    } catch (error) {
        // Captura erro e exibe uma mensagem de erro ao usuário
        let mensagemErro = "Erro desconhecido.";

        // Verifica o tipo de erro retornado pelo Firebase e exibe uma mensagem específica
        switch (error.code) {
            case 'auth/email-already-in-use':
                mensagemErro = "Este email já está cadastrado.";
                break;
            case 'auth/invalid-email':
                mensagemErro = "Email inválido.";
                break;
            case 'auth/weak-password':
                mensagemErro = "A senha deve ter pelo menos 6 caracteres.";
                break;
            default:
                mensagemErro = error.message;
        }

        // Exibe a mensagem de erro
        mostrarErro(mensagemErro);
    }
});





// Função para cadastrar o usuário
async function cadastrarUsuario() {

    // Resgata os valores dos inputs
    const nome = document.getElementById('inputNome').value;
    const email = document.getElementById('inputEmail').value;
    const matricula = document.getElementById('inputMatricula').value;

    // Define o objeto usuario com os dados dos inputs
    const usuario = {
        n_matricula: matricula,  // Número de matrícula resgatado
        nome: nome,              // Nome resgatado
        email: email             // Email resgatado
    };

    try {
        // Envia a solicitação POST para a rota Flask
        const response = await fetch('/cadastro/user-new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuario),
        });

        // Verifica a resposta
        if (response.ok) {
            const result = await response.json();
            if (result.success) {
                alert('Usuário cadastrado com sucesso!');
            } else {
                alert(`Erro ao cadastrar usuário: ${result.error}`);
            }
        } else {
            const errorMessage = await response.text();
            alert(`Erro ao cadastrar usuário: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Erro ao enviar a solicitação:', error);
        alert('Erro ao cadastrar usuário. Por favor, tente novamente.');
    }
}

