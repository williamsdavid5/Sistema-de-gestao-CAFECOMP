import { verificarLoginLocal } from './global.js';

document.addEventListener('DOMContentLoaded', () => {
    // Verificação de login e redirecionamento caso o usuário não esteja logado
    if (!verificarLoginLocal()) {
        console.warn("Usuário não está logado. Redirecionando para /login");
        window.location.href = '/login';  // Redireciona para a página de login
    }

    // Controle do slider de transparência
    const slider = document.getElementById("deslizante");
    const box = document.getElementById("conteudo");

    // Atualiza a opacidade do elemento sempre que o valor do slider mudar
    slider.addEventListener("input", () => {
        const opacityValue = (slider.value / 100); // Pega o valor do slider
        box.style.opacity = opacityValue; // Define a opacidade no estilo inline
    });

    // Controle da visibilidade da janela de registrar alteração de caixa
    const botaoRegistrarCaixa = document.getElementById('botaoRegistrarCaixa');
    const registrarCaixa = document.getElementById('registrarCaixa');
    const botaoCancelar = document.getElementById('botaoCancelar');

    // Verifica se os elementos existem antes de adicionar os eventos
    if (botaoRegistrarCaixa && registrarCaixa && botaoCancelar) {
        // Mostrar a div registrarCaixa ao clicar no botão botaoRegistrarCaixa
        botaoRegistrarCaixa.addEventListener('click', () => {
            registrarCaixa.style.display = 'flex';  // Mostra a div
        });

        // Esconder a div registrarCaixa ao clicar no botão botaoCancelar
        botaoCancelar.addEventListener('click', () => {
            registrarCaixa.style.display = 'none';  // Esconde a div
        });
    }
});

function verificarVisibilidadeBotaoRegistrarCaixa() {
    const botaoRegistrarCaixa = document.getElementById('botaoRegistrarCaixa');

    // Verifica se "membroCafecomp" existe no localStorage
    if (localStorage.getItem('membroCafecomp') === 'true') {
        // Se existir, torna o botão visível
        if (botaoRegistrarCaixa) {
            botaoRegistrarCaixa.style.display = 'block';
        }
    } else {
        // Caso contrário, oculta o botão
        if (botaoRegistrarCaixa) {
            botaoRegistrarCaixa.style.display = 'none';
        }
    }
}

// Chama a função para verificar e ajustar a visibilidade do botão ao carregar a página
document.addEventListener('DOMContentLoaded', verificarVisibilidadeBotaoRegistrarCaixa);
