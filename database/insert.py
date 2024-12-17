USUARIO = 'INSERT INTO Usuario (nMatricula, nome, email) VALUES (%s, %s, %s)'

PRIVILEGIO = 'INSERT INTO Privilegio (matricula, cargo) VALUES(%s, %s)'

TRANSACAO = '''
INSERT INTO Transacao (categoria, valor, data_transacao, descricao, caminho_arquivo, arquivo)
VALUES (%s, %s, %s, %s, %s, %s)'''

MURAL = '''
INSERT INTO Mural (titulo, subtitulo, conteudo, data_publicacao, conteudo)
VALUES (%s, %s, %s, %s, %s)''' 

CHAMADO = '''
INSERT INTO Chamado (descricao, status, nMatricula, data_criacao, data_atualizacao)
VALUES (%s, %s, %s, %s, %s)'''