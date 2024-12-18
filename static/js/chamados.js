import { verificarLoginLocal } from './global.js';

document.addEventListener('DOMContentLoaded', () => {
    // Verifica o login do usuário
    if (!verificarLoginLocal()) {
        console.warn("Usuário não está logado. Redirecionando para login.");
        window.location.href = '/login'; // Redireciona para a rota de login do Flask
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const botaoNovoChamado = document.getElementById('botaoNovoChamado');
    const conteudo = document.getElementById('conteudo');

    botaoNovoChamado.addEventListener('click', () => {
        // Adiciona o código HTML dinamicamente
        const novoChamadoHtml = `
            <div class="telaSobreposta flex" id="novoChamado">
                <div class="janelaSobreposta">
                    <h1>Novo chamado</h1>
                    <input type="text" placeholder="Assunto" id="inputTitulo">
                    <textarea name="" id="areaDescricao" placeholder="Descrição"></textarea>
                    <button id="botaoEnviarChamado">Enviar</button>
                    <button id="botaoCancelar">Cancelar</button>
                    <p>Atenção: após enviar, não será possível desfazer!</p>
                </div>
            </div>
        `;
        conteudo.insertAdjacentHTML('beforeend', novoChamadoHtml);

        // Força o estilo display flex
        const novoChamado = document.getElementById('novoChamado');
        if (novoChamado) {
            novoChamado.style.display = 'flex';
        }

        // Adiciona o evento de cancelar após inserir o HTML
        document.getElementById('botaoCancelar').addEventListener('click', () => {
            if (novoChamado) {
                novoChamado.remove();
            }
        });

        // Adiciona o evento de clique no botão "Enviar" após a inserção
        document.getElementById('botaoEnviarChamado').addEventListener('click', async (e) => {
            e.preventDefault(); // Previne o comportamento padrão do botão

            const descricao = document.getElementById('areaDescricao').value;
            const titulo = document.getElementById('inputTitulo').value;

            // Recupera os dados do usuário armazenados no localStorage
            const usuarioString = localStorage.getItem('usuario');
            const usuario = usuarioString ? JSON.parse(usuarioString) : null;

            if (!usuario) {
                console.log('Nenhum usuário encontrado no localStorage.');
                alert("Usuário não encontrado. Faça login novamente.");
                return;
            }

            // Converte todas as propriedades do usuário para strings
            const nome = String(usuario.nome || "");
            const matricula = String(usuario.nMatricula || "");
            const email = String(usuario.email || "");

            // Monta o objeto do chamado
            const chamado = {
                titulo: String(titulo || ""),
                descricao: String(descricao || ""),
                user: nome,
                matricula: matricula,
                email: email,
                data: new Date().toISOString().split('T')[0], // Formato yyyy-mm-dd
            };

            // Exibe os dados do chamado para depuração
            console.log("Dados do chamado a ser enviado:", chamado);

            // Exibe um alerta com o número de matrícula
            alert(`Número de matrícula: ${matricula}`);

            try {
                const response = await fetch(`/chamados/new/${matricula}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(chamado),
                });

                if (response.ok) {
                    console.log("Chamado criado com sucesso");
                    alert("Chamado criado com sucesso");
                    document.getElementById('novoChamado').remove(); // Remove a div após o sucesso
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
});

// Exibe a div "verChamado" quando qualquer botão de imagem for clicado
document.addEventListener('DOMContentLoaded', () => {
    const botoesImagem = document.querySelectorAll('.imagemBotao');
    const verChamado = document.getElementById('verChamado');
    const botaoFechar = document.getElementById('botaoFechar');

    botoesImagem.forEach(botao => {
        botao.addEventListener('click', () => {
            verChamado.style.display = 'flex';
        });
    });

    if (botaoFechar) {
        botaoFechar.addEventListener('click', () => {
            verChamado.style.display = 'none';
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
