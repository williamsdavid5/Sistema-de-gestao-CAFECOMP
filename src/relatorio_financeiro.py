from src.transacao import Transacao

class Relatorio:
    def __init__(self, id:int, data:str, movimentacoes:list[Transacao]):
        self._id = id
        self.data = data
        self.movimentacoes = movimentacoes
        self.saldo_total:float = 0.0

    def calcular_saldo_total(self): ...

    def exportarRelatorio(self): ...

    def adiciona_transacao(self): ...

    def excluir_transacao(self): ...