USUARIO = 'INSERT INTO Usuario (nMatricula, nome, email) VALUES (%s, %s, %s)'

PRIVILEGIO = 'INSERT INTO Privilegio (matricula, cargo) VALUES(%s, %s)'

TRANSACAO = '''
INSERT INTO Transacao (categoria, valor, data_transacao, descricao, caminho_arquivo, arquivo)
VALUES (%s, %s, %s, %s, %s, %s)'''

MURAL = '''
INSERT INTO Mural (titulo, subtitulo, texto, data_publicacao, conteudo, nome)
VALUES (%s, %s, %s, %s, %s, %s, %s)''' 

CHAMADO = '''
INSERT INTO Chamado (titulo, descricao, status, nMatricula, data_criacao)
VALUES (%s, %s, %s, %s, %s)'''