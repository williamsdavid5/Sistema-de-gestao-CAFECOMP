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

document.addEventListener('DOMContentLoaded', () => {
    const botoesImagem = document.querySelectorAll('.imagemBotao'); // Seleciona todos os elementos com a classe 'imagemBotao'
    const verChamado = document.getElementById('verChamado');
    const botaoFechar = document.getElementById('botaoFechar');

    // Mostrar a div verChamado ao clicar em qualquer botão com a classe 'imagemBotao'
    botoesImagem.forEach(botao => {
        botao.addEventListener('click', () => {
            verChamado.style.display = 'flex'; // Mostra a div
        });
    });

    // Esconder a div verChamado ao clicar no botão botaoCancelar
    if (botaoFechar) {
        botaoFechar.addEventListener('click', () => {
            verChamado.style.display = 'none'; // Esconde a div
        });
    } else {
        console.error("Botão 'botaoCancelar' não encontrado no DOM.");
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const statusChamado = document.getElementById('statusChamado');

    // Adiciona o evento de clique no elemento com id 'statusChamado'
    statusChamado.addEventListener('click', () => {
        if (statusChamado.textContent === 'Pendente') {
            // Altera o texto e classe para "Resolvido"
            statusChamado.textContent = 'Resolvido';
            statusChamado.classList.remove('pendente');
            statusChamado.classList.add('resolvido');
        } else {
            // Altera o texto e classe de volta para "Pendente"
            statusChamado.textContent = 'Pendente';
            statusChamado.classList.remove('resolvido');
            statusChamado.classList.add('pendente');
        }
    });
});
