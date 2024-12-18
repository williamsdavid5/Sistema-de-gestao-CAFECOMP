import { verificarLoginLocal } from './global.js';

document.addEventListener('DOMContentLoaded', () => {
    // Verifica o login do usuário
    if (!verificarLoginLocal()) {
        console.warn("Usuário não está logado. Redirecionando para login.");
        window.location.href = '/login';  // Redireciona para a rota de login do Flask
    }
});

// Exibe e esconde a div "novoChamado"
document.addEventListener('DOMContentLoaded', () => {
    const botaoNovoChamado = document.getElementById('botaoNovoChamado');
    const novoChamado = document.getElementById('novoChamado');
    const botaoCancelar = document.getElementById('botaoCancelar');

    botaoNovoChamado.addEventListener('click', () => {
        novoChamado.style.display = 'flex';  // Mostra a div
    });

    botaoCancelar.addEventListener('click', () => {
        novoChamado.style.display = 'none';  // Esconde a div
    });
});

// Exibe a div "verChamado" quando qualquer botão de imagem for clicado
document.addEventListener('DOMContentLoaded', () => {
    const botoesImagem = document.querySelectorAll('.imagemBotao'); // Seleciona todos os elementos com a classe 'imagemBotao'
    const verChamado = document.getElementById('verChamado');
    const botaoFechar = document.getElementById('botaoFechar');

    botoesImagem.forEach(botao => {
        botao.addEventListener('click', () => {
            verChamado.style.display = 'flex'; // Mostra a div
        });
    });

    if (botaoFechar) {
        botaoFechar.addEventListener('click', () => {
            verChamado.style.display = 'none'; // Esconde a div
        });
    } else {
        console.error("Botão 'botaoFechar' não encontrado no DOM.");
    }
});

// Altera o status do chamado entre 'Pendente' e 'Resolvido'
document.addEventListener('DOMContentLoaded', () => {
    const statusChamado = document.getElementById('statusChamado');

    statusChamado.addEventListener('click', () => {
        if (statusChamado.textContent === 'Pendente') {
            statusChamado.textContent = 'Resolvido';
            statusChamado.classList.remove('pendente');
            statusChamado.classList.add('resolvido');
        } else {
            statusChamado.textContent = 'Pendente';
            statusChamado.classList.remove('resolvido');
            statusChamado.classList.add('pendente');
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const botaoEnviar = document.getElementById('botaoEnviarChamado');
    const novoChamado = document.getElementById('novoChamado');

    // Evento de clique no botão 'Enviar'
    botaoEnviar.addEventListener('click', async (e) => {
        e.preventDefault();  // Previne o comportamento padrão do botão

        // Verifica se a div está visível (após o clique em "Novo Chamado")
        if (novoChamado.style.display === 'none' || !novoChamado.style.display) {
            console.error("A div 'novoChamado' não está visível.");
            return;
        }

        // Acessa os inputs após a exibição da div
        const descricao = document.getElementById('areaDescricao');
        const titulo = document.getElementById('inputTitulo');

        // Recupera os dados do usuário armazenados no localStorage
        const usuarioString = localStorage.getItem('usuario');
        const usuario = usuarioString ? JSON.parse(usuarioString) : null;

        if (usuario === null) {
            console.log('Nenhum usuário encontrado no localStorage.');
            alert("Usuário não encontrado. Faça login novamente.");
            return;
        }

        // Cria o objeto Chamado com os dados do formulário e do usuário
        const chamado = {
            titulo: 'titulo qualquer',
            descricao: 'descricao',
            user: usuario.nome, // Usando o nome do usuário armazenado
            data: new Date().toISOString().split('T')[0], // Data atual no formato yyyy-mm-dd
        };

        // Exibe o objeto Chamado no console para verificação
        console.log('Objeto Chamado:', chamado);

        // Envia os dados do Chamado para o servidor via POST
        try {
            const response = await fetch(`/chamados/new/${usuario.n_matricula}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(chamado),
            });

            if (response.ok) {
                console.log("Chamado criado com sucesso");
                alert("Chamado criado com sucesso");
                // Pode adicionar redirecionamento ou outra lógica aqui
            } else {
                console.log("Erro ao criar chamado");
                alert("Erro ao criar chamado. Tente novamente.");
            }
        } catch (error) {
            console.error("Erro ao enviar os dados para o servidor:", error);
            alert("Erro ao criar chamado. Tente novamente.");
        }
    });
});

