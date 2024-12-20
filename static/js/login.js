// Importação das funções do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

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

botaoEntrar.addEventListener('click', async (e) => {
    e.preventDefault();

    const email = inputEmail.value;
    const senha = inputSenha.value;

    try {
        // Verificando email e senha no Firebase
        const userCredential = await signInWithEmailAndPassword(auth, email, senha);
        const user = userCredential.user;

        // Salvar login no localStorage
        console.log("Login realizado com sucesso. Salvando estado no localStorage...");
        localStorage.setItem('usuarioLogado', 'true');

        await verificarPrivilegio(email);

        // Redireciona após salvar
        window.location.href = '/';  // Redireciona para a home (rota home_route)
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        alert("Erro ao fazer login: " + error.message);
    }
});

const botaoCadastro = document.getElementById('botaoNaoPossuoUmaConta');
botaoCadastro.addEventListener('click', () => {
    window.location.href = '/cadastro';  // Redireciona para a rota de cadastro (cadasto_route)
});





async function verificarPrivilegio(email) {
    try {
        // Faz a requisição para a rota Flask
        const response = await fetch(`/login/user/${email}`);

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro ao buscar usuário: ${response.statusText}`);
        }

        // Converte a resposta para JSON
        const userData = await response.json();

        // Verifica o privilégio do usuário
        if (userData.privilegio) {
            console.log(`O usuário ${userData.nome} tem privilégios.`);

            // Adiciona "membroCafecomp" no localStorage
            localStorage.setItem('membroCafecomp', 'true');

        } else {
            console.log(`O usuário ${userData.nome} não tem privilégios.`);
        }

        localStorage.setItem('usuario', JSON.stringify(userData));

        return userData.privilegio;
    } catch (error) {
        console.error("Erro ao verificar privilégio do usuário:", error.message);
        alert("Erro ao buscar usuário. Por favor, tente novamente.");
        return null;
    }
}

