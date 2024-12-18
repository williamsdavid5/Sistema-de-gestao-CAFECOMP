import { verificarLoginLocal } from './global.js';

document.addEventListener('DOMContentLoaded', () => {
    if (!verificarLoginLocal()) {
        console.warn("Usuário não está logado. Redirecionando para /login");
        window.location.href = '/login';  // Redireciona para a página de login (rota login_route)
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const botaoPublicarNoticia = document.getElementById('botaoPublicarNoticia');
    const janelaPublicarNoticia = document.getElementById('janelaPublicarNoticia');
    const botaoCancelar = document.getElementById('botaoCancelar');

    // Mostrar a div registrarCaixa ao clicar no botão botaoRegistrarCaixa
    botaoPublicarNoticia.addEventListener('click', () => {
        janelaPublicarNoticia.style.display = 'flex';  // Mostra a div
    });

    // Esconder a div registrarCaixa ao clicar no botão botaoCancelar
    botaoCancelar.addEventListener('click', () => {
        janelaPublicarNoticia.style.display = 'none';  // Esconde a div
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const noticias = document.querySelectorAll('.noticia');

    noticias.forEach(noticia => {
        noticia.addEventListener('click', () => {
            // Redireciona para a página da notícia (rota noticia_pagina_route)
            window.location.href = '/noticias-pagina';
        });
    });
});

// Função para verificar se o usuário tem privilégio e exibir o botão
function verificarVisibilidadeBotao() {
    // Obtém o botão pelo ID
    const botaoPublicarNoticia = document.getElementById('botaoPublicarNoticia');

    // Verifica se o item 'membroCafecomp' existe no localStorage
    if (localStorage.getItem('membroCafecomp') === 'true') {
        // Se 'membroCafecomp' estiver presente, torna o botão visível
        if (botaoPublicarNoticia) {
            botaoPublicarNoticia.style.display = 'block';
        }
    } else {
        // Caso contrário, oculta o botão
        if (botaoPublicarNoticia) {
            botaoPublicarNoticia.style.display = 'none';
        }
    }
}

// Chama a função assim que a página carregar
document.addEventListener('DOMContentLoaded', verificarVisibilidadeBotao);
