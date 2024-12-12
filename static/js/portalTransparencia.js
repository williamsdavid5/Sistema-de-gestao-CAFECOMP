const slider = document.getElementById("deslizante");
const box = document.getElementById("conteudo");

// Atualiza a opacidade do elemento sempre que o valor do slider mudar
slider.addEventListener("input", () => {
    const opacityValue = (slider.value / 100); // Pega o valor do slider
    box.style.opacity = opacityValue; // Define a opacidade no estilo inline
});

document.addEventListener('DOMContentLoaded', () => {
    if (!verificarLoginLocal()) {
        console.warn("Usuário não está logado. Redirecionando para login.html");
        window.location.href = 'login.html';  // Redireciona para a página de login
    }
});

import { verificarLoginLocal } from './global.js';

document.addEventListener('DOMContentLoaded', () => {
    if (!verificarLoginLocal()) {
        console.warn("Usuário não está logado. Redirecionando para login.html");
        window.location.href = 'login.html';  // Redireciona para a página de login
    }
});
