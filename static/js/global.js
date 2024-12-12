//configurações globais do menu lateral
const menuLateralIcon = document.getElementById('menuLateralIcon');
const menuLateralIcon2 = document.getElementById('menuLateralIcon2');
const menuLateral = document.getElementById('menuLateral');

menuLateralIcon.addEventListener('click', () => {
    menuLateral.classList.toggle('show');
});

menuLateralIcon2.addEventListener('click', () => {
    menuLateral.classList.remove('show');
});


// Importação das bibliotecas do Firebase
// Importação das bibliotecas do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, setPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";


// Inicializando o Firebase e autenticando
const firebaseConfig = {
    apiKey: "API_KEY",
    authDomain: "AUTH_DOMAIN",
    projectId: "PROJECT_ID",
    storageBucket: "STORAGE_BUCKET",
    messagingSenderId: "MESSAGING_SENDER_ID",
    appId: "APP_ID",
    measurementId: "MEASUREMENT_ID"
};

const app = initializeApp(firebaseConfig); // Inicializa o Firebase
const auth = getAuth(app); // Obtém a instância de autenticação

// Função para verificar o login no localStorage
export function verificarLoginLocal() {
    return localStorage.getItem('usuarioLogado') === 'true';
}

// Função para exibir ou esconder os botões
function atualizarVisibilidadeBotoes() {
    const botaoSair = document.getElementById('botaoSair');

    if (verificarLoginLocal()) {
        // Se estiver logado, exibe os botões
        if (botaoSair) botaoSair.style.display = 'block';

    } else {
        // Se não estiver logado, esconde os botões
        if (botaoSair) botaoSair.style.display = 'none';
    }
}

// Função para deslogar o usuário
function deslogar() {
    signOut(auth).then(() => { // Usa a instância do auth já inicializada
        console.log("Usuário deslogado com sucesso");
        localStorage.removeItem('usuarioLogado');
        localStorage.removeItem('userId');
        atualizarVisibilidadeBotoes(); // Atualiza a visibilidade dos botões
        window.location.href = 'login.html'; // Redireciona para a página de login
    }).catch((error) => {
        console.error("Erro ao deslogar:", error);
    });
}

// Função de redirecionamento para página protegida (ex: portal de transparência ou chamados)
function redirecionarComLogin(url) {
    if (verificarLoginLocal()) {
        window.location.href = url; // Redireciona para a página
    } else {
        window.location.href = 'login.html'; // Redireciona para login se não estiver logado
    }
}

// Eventos de inicialização ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM carregado. Verificando estado de login...");

    atualizarVisibilidadeBotoes(); // Atualiza a visibilidade dos botões ao carregar a página

    // Botão de sair
    const botaoSair = document.getElementById('botaoSair');
    if (botaoSair) {
        botaoSair.addEventListener('click', deslogar);
    }

    // Navegação para a página de Portal Transparência
    const botaoVerCaixa = document.getElementById('botaoVerCaixa');
    if (botaoVerCaixa) {
        botaoVerCaixa.addEventListener('click', (e) => {
            e.preventDefault();
            redirecionarComLogin('portalTransparencia.html');
        });
    }

    // Navegação para a página de Chamados
    const botaoChamado = document.getElementById('botaoChamado');
    if (botaoChamado) {
        botaoChamado.addEventListener('click', (e) => {
            e.preventDefault();
            redirecionarComLogin('chamados.html');
        });
    }
});
