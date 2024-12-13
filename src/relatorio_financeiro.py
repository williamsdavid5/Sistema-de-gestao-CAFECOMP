from src.transacao import Transacao

class Relatorio:
    def __init__(self, data:str, transacoes:list[Transacao]):
        self._id = 0
        self.data = data
        self.transacoes = transacoes
        self.saldo_total:float = 0.0

    @property
    def id(self) -> int:
        return self._id
    
    @id.setter
    def id(self, id):
        if not isinstance(id, int):
            raise TypeError('O id deve ser inteiro')
        self._id = id

    def calcular_saldo_total(self): ...

    def exportarRelatorio(self): ...

    def adiciona_transacao(self): ...

    def excluir_transacao(self): ...