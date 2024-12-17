CREATE_DATABASE = 'CREATE DATABASE IF NOT EXISTS CAFECOMP;'
USE_DATABASE = 'USE CAFECOMP;'

# Criação da tabela Usuario
TABELA_USUARIO =  '''
CREATE TABLE IF NOT EXISTS Usuario (
	nMatricula VARCHAR(25) UNIQUE NOT NULL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);'''

# Criação da tabela Privilégio
TABELA_PRIVILEGIO = '''
CREATE TABLE IF NOT EXISTS Privilegio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    matricula VARCHAR(50) NOT NULL,
    cargo VARCHAR(50) NOT NULL,
    FOREIGN KEY (matricula)
		REFERENCES Usuario(nMatricula) 
		ON DELETE CASCADE
);'''

# Criação da tabela Transacao
TABELA_TRANSACAO = '''
CREATE TABLE IF NOT EXISTS Transacao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    categoria VARCHAR(100) NOT NULL,
    valor FLOAT NOT NULL,
    data_transacao DATETIME NOT NULL,
    descricao TEXT,
    caminho_arquivo VARCHAR(50),
    arquivo BLOB
);'''


# Criação da tabela Mural
TABELA_MURAL = '''
CREATE TABLE IF NOT EXISTS Mural (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    subtitulo VARCHAR(255),
    texto TEXT NOT NULL,
    data_publicacao DATETIME NOT NULL,
    conteudo BLOB
);'''

# Criação da tabela Chamado
TABELA_CHAMADO = '''
CREATE TABLE IF NOT EXISTS Chamado (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao TEXT NOT NULL,
    status BOOLEAN NOT NULL,
    nMatricula VARCHAR(25),
    data_criacao DATETIME NOT NULL,
    data_atualizacao DATETIME,
    FOREIGN KEY (nMatricula)
		REFERENCES Usuario(nMatricula)
        ON DELETE CASCADE
);'''