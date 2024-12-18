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

                    // Remove a div de novo chamado
                    document.getElementById('novoChamado').remove();

                    // Recarrega a página para exibir os dados atualizados
                    location.reload();
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

document.addEventListener('DOMContentLoaded', () => {
    // Obtém o número de matrícula do usuário, por exemplo, do localStorage
    const usuarioString = localStorage.getItem('usuario');
    const usuario = usuarioString ? JSON.parse(usuarioString) : null;

    if (!usuario) {
        console.log('Usuário não encontrado no localStorage.');
        alert("Usuário não encontrado. Faça login novamente.");
        return;
    }

    // Garantir que o número de matrícula seja tratado como string
    const matricula = String(usuario.nMatricula);  // Transformando em string

    // Faz a requisição para pegar os chamados do usuário
    fetch(`/chamados/user/${matricula}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Falha ao buscar chamados.');
            }
            return response.json();
        })
        .then(chamados => {
            if (chamados.error) {
                console.error(chamados.error);
                alert("Erro ao obter os chamados.");
            } else {
                // Se não houver erro, vamos criar o HTML e inserir na página
                const conteudo = document.getElementById('chamadosDiv');

                chamados.forEach(chamado => {
                    // Verifica e formata a data
                    const dataFormatada = chamado.data_criacao ? new Date(chamado.data_criacao).toLocaleDateString('pt-BR') : 'Data não disponível';

                    // Criando o objeto HTML para cada chamado
                    const chamadoDiv = document.createElement('div');
                    chamadoDiv.classList.add('chamado', 'imagemBotao');

                    // Criando o conteúdo do chamado
                    chamadoDiv.innerHTML = `
                        <div class="textoChamado">
                            <h3>Assunto: ${chamado.titulo}</h3>
                            <p>${dataFormatada}</p>
                        </div>
                        <div class="statusChamado ${chamado.status ? 'resolvido' : 'pendente'}">
                            <h2>${chamado.status ? 'Resolvido' : 'Pendente'}</h2>
                        </div>
                    `;

                    // Adiciona o novo chamado na div 'conteudo'
                    conteudo.appendChild(chamadoDiv);
                });
            }
        })
        .catch(error => {
            console.error('Erro ao obter os chamados:', error);
        });
});
