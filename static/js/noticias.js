import { verificarLoginLocal } from './global.js';

document.addEventListener('DOMContentLoaded', () => {
    if (!verificarLoginLocal()) {
        console.warn("Usuário não está logado. Redirecionando para login.html");
        window.location.href = 'login.html';  // Redireciona para a página de login
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