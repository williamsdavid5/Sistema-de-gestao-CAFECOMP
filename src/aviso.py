class Aviso:
    def __init__(self, 
                 titulo:str,
                 subtitulo:str,
                 texto:str, 
                 data_public:str, 
                 imagens:list[str] = None, 
                 links:list[str] = None):
        self._id = 0
        self.titulo = titulo
        self.subtitulo = subtitulo
        self.texto = texto
        self.data_public = data_public
        self.imagens = imagens if not imagens == None else [] 
        self.links = links if not links == None else []

    @property
    def id(self) -> int:
        return self._id
    
    @id.setter
    def id(self, id):
        if not isinstance(id, int):
            raise TypeError('O id deve ser inteiro')
        self._id = id