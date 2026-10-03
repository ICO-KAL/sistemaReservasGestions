import recursosModels from '../models/recursosModels';
import userModels from '../models/userModels';

const getId = (req) => req.paramas.id || req.body.id;

export default new class recursoController{
    async crearRecursos(req,res){
       try{
           const {nombre,descripcion,capacidad,precio,estado} = req.body;
           const {usuario} = getId(req);
           if(!await userModels.getUserOne({id: usuario})) return res.status(404).json({message: "El usuario no existe no puedes crear recurso"});
           if(await recursosModels.getOneRecursos({id: nombre})) return res.status(409).json({message: "El recurso ya existe"});
            const crearRecursos = await recursosModels.createRecursos({
                nombre,
                descripcion,
                capacidad,
                precio,
                estado
            });

            res.status(201).json({message: "recurso creado",crearRecursos});
       }catch(e){
         console.log('Error al crear un recurso',e);
         return res.status(404).json({message: "Error al crear un resucro", Error: e});
       }
    }
    async eliminarRecursos(req,res){
        try{
            const {nombre,descripcion,capacidad,precio,estado} = req.body;
            const {usuario} = getId(req);
            if(!await userModels.getUserOne({id: usuario})) return res.status(404).json({message: "No se encontro el usuario no puedes eliminar"});
            if(!await recursosModels.getOneRecursos({id: nombre})) return res.status(404).json({message: "No se encontro el recurso"});

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
          const {usuario} = getId(req);
          if(!await userModels.getUserOne({id: usuario})) return res.status(404).json({message: "No se encontro el Usuario no puedes obtener el recurso"});
          if(!await recursosModels.getOneRecursos({id: nombre})) return res.status(404).json({message: "No se encontro el Nombre"});
      
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