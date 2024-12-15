const slider = document.getElementById("deslizante");
const box = document.getElementById("conteudo");

// Atualiza a opacidade do elemento sempre que o valor do slider mudar
slider.addEventListener("input", () => {
    const opacityValue = (slider.value / 100); // Pega o valor do slider
    box.style.opacity = opacityValue; // Define a opacidade no estilo inline
});

import { verificarLoginLocal } from './global.js';

document.addEventListener('DOMContentLoaded', () => {
    if (!verificarLoginLocal()) {
        console.warn("Usuário não está logado. Redirecionando para /login");
        window.location.href = '/login';  // Redireciona para a página de login (rota login_route)
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const botaoRegistrarCaixa = document.getElementById('botaoRegistrarCaixa');
    const registrarCaixa = document.getElementById('registrarCaixa');
    const botaoCancelar = document.getElementById('botaoCancelar');

    // Mostrar a div registrarCaixa ao clicar no botão botaoRegistrarCaixa
    botaoRegistrarCaixa.addEventListener('click', () => {
        registrarCaixa.style.display = 'flex';  // Mostra a div
    });

    // Esconder a div registrarCaixa ao clicar no botão botaoCancelar
    botaoCancelar.addEventListener('click', () => {
        registrarCaixa.style.display = 'none';  // Esconde a div
    });
});
