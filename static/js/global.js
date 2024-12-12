// Funções para gerenciar o estado do login com localStorage
function salvarLoginLocal(userId) {
    console.log("Salvando login no localStorage:", userId);
    localStorage.setItem('usuarioLogado', 'true');
    localStorage.setItem('userId', userId); // Opcional: Salvar informações do usuário
}

function removerLoginLocal() {
    console.log("Removendo login do localStorage");
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('userId');
}

function verificarLoginLocal() {
    const loginStatus = localStorage.getItem('usuarioLogado') === 'true';
    console.log("Verificando login no localStorage:", loginStatus);
    return loginStatus;
}

// Função para redirecionar se o login não for detectado
function verificarAcessoAtual() {
    if (!verificarLoginLocal()) {
        console.warn("Usuário não está logado. Redirecionando para login.html");
        window.location.href = 'login.html';
    }
}

// Função para deslogar o usuário
function deslogar() {
    removerLoginLocal();
    window.location.href = 'login.html'; // Redireciona para a tela de login
}

// Eventos de inicialização ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM carregado. Verificando estado de login...");
    verificarAcessoAtual(); // Verifica o login ao carregar a página

    // Botão de sair
    const botaoSair = document.getElementById('botaoSair');
    if (botaoSair) {
        botaoSair.addEventListener('click', deslogar);
    }

    // Navegação protegida
    const botaoNoticias = document.querySelector('a[href="noticias.html"]');
    if (botaoNoticias) {
        botaoNoticias.addEventListener('click', (e) => {
            e.preventDefault();
            if (verificarLoginLocal()) {
                window.location.href = 'noticias.html';
            } else {
                window.location.href = 'login.html'; // Redireciona para login se não estiver logado
            }
        });
    }

    const botaoPortalTransparencia = document.querySelector('a[href="portalTransparencia.html"]');
    if (botaoPortalTransparencia) {
        botaoPortalTransparencia.addEventListener('click', (e) => {
            e.preventDefault();
            if (verificarLoginLocal()) {
                window.location.href = 'portalTransparencia.html';
            } else {
                window.location.href = 'login.html'; // Redireciona para login se não estiver logado
            }
        });
    }

    const botaoChamados = document.querySelector('a[href="chamados.html"]');
    if (botaoChamados) {
        botaoChamados.addEventListener('click', (e) => {
            e.preventDefault();
            if (verificarLoginLocal()) {
                window.location.href = 'chamados.html';
            } else {
                window.location.href = 'login.html'; // Redireciona para login se não estiver logado
            }
        });
    }
});
