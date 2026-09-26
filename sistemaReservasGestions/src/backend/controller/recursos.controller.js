import recursosModels from '../models/recursosModels';

export default new class recursoController{
    async crearRecursos(req,res){
       try{
           const {nombre,descripcion,capacidad,precio,estado} = req.body;
            const read = await recursosModels.getOneRecursos({nombre});
            if(!read) return res.status(404).json({message: "no se encontro el recurso"});

            const crearRecursos = await recursosModels.createRecursos({
                nombre,
                descripcion,
                capacidad,
                precio,
                estado
            });

            res.status(202).json({message: "recurso encontrado",crearRecursos});
       }catch(e){
         console.log('Error al crear un recurso',e);
         return res.status(404).json({message: "Error al crear un resucro", Error: e});
       }
    }
    async eliminarRecursos(req,res){
        try{
            const {nombre,descripcion,capacidad,precio,estado} = req.body;
            const read = await recursosModels.getOneRecursos({nombre});
            if(!read) return res.statu(404).json({message: "No se encontro el nombre"});

            const eliminar = await recursosModels.deleteRecursos({
                nombre,
                descripcion,
                capacidad,
                precio,
                estado
            });
            res.status(202).json({message: "Recurso Eliminado", eliminar});
        }
        catch(e){
            console.log('Error al eliminar un recurso',e);
            return res.status(404).json({message: "Error al eliminar",Error: e});
        }
    }
    async obtenerRecursos(req,res){
        try{
          const {nombre,descripcion,capacidad,precio,estado} = req.body;
          const read = await recursosModels.getOneRecursos({nombre});
          if(!read) return res.statu(404).json({message: "No se encontro el Nombre"});
          const obtener = await recursosModels.getAllRecursos({
              nombre,
              descripcion,
              capacidad,
              precio,
              estado
          })  
          res.statu(202).json({message: "Recurso Obtenido",obtener})
        }
        catch(e){
            console.log('Error de obtener el recurso',e);
            return res.status(404).json({message: "Error al obtener el recurso",Error:e});
        }
    }
}