from src.user import User

class Menbro(User):
    def __init__(self, n_matricula: str, nome: str, senha: str, email: str):
        super().__init__(n_matricula, nome, senha, email)