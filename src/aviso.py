class Aviso:
    def __init__(self, id:int, 
                 titulo:str,
                 subtitulo:str,
                 conteudo:str, 
                 data_public:str, 
                 imagens:list[str] = None, 
                 links:list[str] = None):
        self._id = id
        self.titulo = titulo
        self.subtitulo = subtitulo
        self.conteudo = conteudo
        self.data_public = data_public
        self.imagens = imagens if not imagens == None else [] 
        self.links = links if not links == None else []

    @property
    def id(self) -> int:
        return self._id
    
    @id.setter
    def id(self, value:int):
        self._id = value