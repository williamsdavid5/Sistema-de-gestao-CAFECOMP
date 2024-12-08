from abc import ABC, abstractmethod

class User(ABC):
    def __init__(self, n_matricula: str, nome: str, senha: str, email: str):
        self._n_matricula = n_matricula
        self._nome = nome
        self._senha = senha
        self._email = email

    # Property e setter para n_matricula
    @property
    def n_matricula(self):
        return self._n_matricula

    @n_matricula.setter
    def n_matricula(self, value: str):
        if not isinstance(value, str):
            raise ValueError("O número de matrícula deve ser uma string.")
        self._n_matricula = value

    # Property e setter para nome
    @property
    def nome(self):
        return self._nome

    @nome.setter
    def nome(self, value: str):
        if not isinstance(value, str):
            raise ValueError("O nome deve ser uma string.")
        self._nome = value

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