// Importação das funções do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Configuração do Firebase
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

const botaoEntrar = document.getElementById('botaoEntrar');
const inputEmail = document.getElementById('inputEmail');
const inputSenha = document.getElementById('inputSenha');
const botaoRedefinirSenha = document.getElementById('linkRedefinirSenha');

// Evento de clique no botão de login
botaoEntrar.addEventListener('click', async (e) => {
    e.preventDefault();

    const email = inputEmail.value;
    const senha = inputSenha.value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, senha);
        const user = userCredential.user;
        console.log("Usuário autenticado:", user.email);

        window.location.href = 'inicio.html';
    } catch (error) {
        alert("Erro ao fazer login: " + error.message);
    }
});

botaoRedefinirSenha.addEventListener('click', async (e) => {
    e.preventDefault();

    const email = inputEmail.value;

    if (!email) {
        alert("Por favor, insira um email para redefinir a senha.");
        return;
    }

    try {
        await sendPasswordResetEmail(auth, email);
        alert("Email de redefinição de senha enviado!");
    } catch (error) {
        alert("Erro ao enviar email de redefinição de senha: " + error.message);
    }
});