import { verificarLoginLocal } from './global.js';

document.addEventListener('DOMContentLoaded', () => {
    if (!verificarLoginLocal()) {
        console.warn("Usuário não está logado. Redirecionando para login.html");
        window.location.href = 'login.html';  // Redireciona para a página de login
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const botaoNovoCHamado = document.getElementById('botaoNovoChamado');
    const novoChamado = document.getElementById('novoChamado');
    const botaoCancelar = document.getElementById('botaoCancelar');

    // Mostrar a div registrarCaixa ao clicar no botão botaoRegistrarCaixa
    botaoNovoCHamado.addEventListener('click', () => {
        novoChamado.style.display = 'flex';  // Mostra a div
    });

    // Esconder a div registrarCaixa ao clicar no botão botaoCancelar
    botaoCancelar.addEventListener('click', () => {
        novoChamado.style.display = 'none';  // Esconde a div
    });
});