class Chamado:
    def __init__(self, id:int, titulo:str, descricao:str, user:str, data_public:str):
        self._id = id
        self.titulo = titulo
        self.descricao = descricao
        self.user = user
        self.data_public = data_public
        self.status = 0
    