import re

from src.user import User
from src.aviso import Aviso
from src.transacao import Transacao


class Membro(User):
    def __init__(self, n_matricula:str, nome:str, email:str, cargo:str):
        super().__init__(n_matricula, nome, email)
        self.cargo = cargo
    
    def to_dict(self):
        return super().to_dict() | {'cargo':self.cargo}

    def criar_aviso(self,
                    titulo:str,
                    subtitulo:str,
                    texto:str, 
                    data_public:str, 
                    imagens:list[str] = None, 
                    links:list[str] = None) -> Aviso:
        
        pattern = r'^(20|21)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$'
        if not re.match(pattern, data_public):
            raise ValueError('A data deve seguir o formato yyyy-mm-aa')
        
        aviso = Aviso(titulo, subtitulo, texto, data_public, imagens, links)

        return aviso

    def criar_transacao(self, valor:float, data:str, categoria:str,
                        comprovante:str, descricao:str=None) -> Transacao:
         
        pattern = r'^(20|21)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$'
        if not re.match(pattern, data):
            raise ValueError('A data deve seguir o formato yyyy-mm-aa')
        
        transacao = Transacao(valor, data, categoria, comprovante, descricao)

        return transacao

    def edita_status_chamado(self): ...