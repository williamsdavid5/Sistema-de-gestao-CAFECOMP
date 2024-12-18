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


document.addEventListener('DOMContentLoaded', () => {
    const conteudo = document.getElementById('conteudo'); // Elemento que contém os chamados
    const verChamado = document.getElementById('verChamado'); // Div oculta para exibir o chamado
    const botaoFechar = document.getElementById('botaoFechar'); // Botão para fechar a div de visualização

    // Adiciona evento para capturar cliques nos chamados
    conteudo.addEventListener('click', async (event) => {
        const chamadoDiv = event.target.closest('.chamado');
        if (!chamadoDiv) return; // Ignora cliques fora dos chamados

        const chamadoIdMatch = chamadoDiv.className.match(/id-(\d+)/);
        const chamadoId = chamadoIdMatch ? chamadoIdMatch[1] : null;

        if (!chamadoId) {
            console.error('ID do chamado não encontrado.');
            return;
        }

        // Armazena o ID e o número de matrícula do chamado no localStorage
        try {
            const response = await fetch(`/chamados/id/${chamadoId}`);
            if (!response.ok) throw new Error('Erro ao buscar chamado.');

            const chamado = await response.json();
            if (chamado.error) throw new Error(chamado.error);

            // Armazena o número de matrícula no localStorage
            localStorage.setItem('matriculaChamado', chamado.user);

            // Armazena o ID do chamado no localStorage
            localStorage.setItem('chamadoSelecionado', chamadoId);

            // Atualiza os dados da div de visualização
            verChamado.querySelector('h2').textContent = `Assunto: ${chamado.titulo}`;
            verChamado.querySelector('.textBold').textContent = chamado.user;
            verChamado.querySelector('p:nth-of-type(2)').textContent = chamado.email;
            verChamado.querySelector('#descricaoChamado').textContent = `Descrição: ${chamado.descricao}`;
            verChamado.querySelector('#statusChamado').textContent = chamado.status ? 'Resolvido' : 'Pendente';
            verChamado.querySelector('#statusChamado').className = chamado.status ? 'resolvido' : 'pendente';

            // Exibe a div de visualização
            verChamado.style.display = 'flex';
        } catch (error) {
            console.error('Erro ao carregar o chamado:', error);
            alert('Erro ao carregar o chamado. Tente novamente.');
        }
    });

    // Adiciona evento para fechar a div de visualização
    botaoFechar.addEventListener('click', () => {
        // Remove o ID e o número de matrícula do localStorage
        localStorage.removeItem('chamadoSelecionado');
        localStorage.removeItem('matriculaChamado');

        verChamado.style.display = 'none';
    });
});

// Evento para atualizar o status do chamado
statusChamado.addEventListener('click', async () => {
    // Recupera o ID do chamado e a matrícula armazenados no localStorage
    const chamadoIdLocal = localStorage.getItem('chamadoSelecionado');
    const matriculaChamado = localStorage.getItem('matriculaChamado');

    if (!chamadoIdLocal || !matriculaChamado) {
        console.error('ID do chamado ou matrícula não encontrados no localStorage.');
        return;
    }

    // Converte o ID do chamado para inteiro
    const chamadoId = parseInt(chamadoIdLocal, 10);  // Convertendo a string para número inteiro

    if (isNaN(chamadoId)) {
        console.error('ID do chamado não é um número válido.');
        return;
    }

    // Alterna o status no frontend
    const isResolvido = statusChamado.textContent === 'Resolvido';
    statusChamado.textContent = isResolvido ? 'Pendente' : 'Resolvido';
    statusChamado.classList.toggle('pendente', isResolvido);
    statusChamado.classList.toggle('resolvido', !isResolvido);

    // Envia a atualização ao backend com a matrícula correta do chamado
    try {
        const response = await fetch(`/chamados/id/${chamadoId}`);
        if (!response.ok) throw new Error('Erro ao buscar chamado.');

        const chamado = await response.json();
        if (chamado.error) throw new Error(chamado.error);

        // Envia a atualização do status
        const updateResponse = await fetch(`/chamados/${matriculaChamado}/${chamadoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (updateResponse.ok) {
            console.log('Status do chamado atualizado com sucesso.');
        } else {
            console.error('Falha ao atualizar o status do chamado.');
            alert('Erro ao atualizar o status. Tente novamente. A');
        }
    } catch (error) {
        console.error('Erro ao enviar a atualização do status:', error);
        alert('Erro ao atualizar o status. Tente novamente. B');
    }
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
    const matricula = String(usuario.nMatricula);

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
                    chamadoDiv.classList.add('chamado', 'imagemBotao', `id-${chamado.id}`); // Adiciona o ID do chamado como classe

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

