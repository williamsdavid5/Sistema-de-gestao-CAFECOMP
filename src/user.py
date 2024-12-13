from src.chamado import Chamado

class User():
    def __init__(self, n_matricula:str, nome:str, senha:str, email:str, privilegio:bool = False):
        self._n_matricula = n_matricula
        self.nome = nome
        self._senha = senha
        self._email = email
        self._privilegio = privilegio

    # Property e setter para n_matricula
    @property
    def n_matricula(self):
        return self._n_matricula

    @n_matricula.setter
    def n_matricula(self, value: str):
        if not isinstance(value, str):
            raise ValueError("O número de matrícula deve ser uma string.")
        self._n_matricula = value

    # Property e setter para senha
    @property
    def senha(self):
        return self._senha

    @senha.setter
    def senha(self, value: str):
        if not isinstance(value, str):
            raise ValueError("A senha deve ser uma string.")
        self._senha = value

    # Property e setter para email
    @property
    def email(self):
        return self._email

    @email.setter
    def email(self, value: str):
        if "@" not in value or "." not in value:
            raise ValueError("O email fornecido não é válido.")
        self._email = value

    # Property e setter para privilegio
    @property
    def privilegio(self):
        return self._privilegio
    
    @privilegio.setter
    def privilegio(self, value:bool):
        if not isinstance(value, bool):
            raise ValueError("O privilégio deve ser booleano")
        self._privilegio = value

    # Função que cria o chamado de um aluno e retorna
    def criar_chamado(self, titulo:str, descricao:str, data_public:str) -> Chamado:
        chamado = Chamado(titulo, descricao, self.n_matricula, data_public)

        return chamado