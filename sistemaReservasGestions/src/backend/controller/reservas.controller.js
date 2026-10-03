import reservasModels from "../models/reservasModels";
import userModels from "../models/userModels";

export default new class reservas{

   async crearReservas(req,res){
      try{
         const {usuario,fecha,recurso,horaInicio,horaFinal,cantidadPersonas} = req.body;
         if(!await userModels.getUserOne({Email:usuario})) return res.status(404).json({Error: "usuario no encontrado"});
         if(await reservasModels.getOneReservas({usuario,fecha})) return res.status(404).json({Error: "Tienes una reserva para ese dia"});
         
         const crearReserva = await reservasModels.createReservas({
            usuario,
            fecha,
            recurso,
            horaInicio,
            horaFinal,
            cantidadPersonas,
         });
         
         res.status(202).json({
            message: "reservas Creadaas",
            crearReserva
         });
      }catch(e){
         console.log("Error al crer una reserva: ",e);
         return res.status(404).json({message: "Error al crear una reserva", Error: e})
      }
   }
   async EliminarReservas(req,res){
      try{
        const {usuario,fecha,horaInicio,horaFinal,cantidadPersonas} = req.body;
        if(!await reservasModels.getOneReservas({usuario,fecha})) return res.status(404).json({message: "no se encontro reserva"});
   
        const eliminarReserva = await reservasModels.deleteReservas({
          usuario,
          fecha,
          horaInicio,
          horaFinal,
          cantidadPersonas
        });
        res.status(202).json({
         message: "reserva eliminadas correctame",
         eliminarReserva
        });
 
      }catch(e){
         console.log('error al eliminar: ',e);
         return res.status(404).json({message: "un error al eliminar una reservas", Error: e});
      }
   }
   async ActualizarReservas(req,res){
      try{
         const {usuario,fecha,horaInicio,horaFinal,cantidadPersonas} = req.body;
         if(!await reservasModels.getOneReservas({usuario})) return res.status(404).json({Error: "no se encontro el usuario"});

         const Actualizar = await reservasModels.updateReservas({
            usuario,
            fecha,
            horaInicio,
            horaFinal,
            cantidadPersonas
         });
 
         res.status(202).json({message: "Actualizacion correctamente", Actualizar});
      }catch(e){
         console.log('Error al actualizar el producto',e);
         return res.status(404).json({message: "un error al actualizar una reserva", Error: e})
      }
   }
   async AllReservas(req,res){
     try{
         const {usuario,fecha,horaInicio,horaFinal,cantidadPersonas} = req.body;
         if(!await reservasModels.getOneReservas({usuario, fecha})) return res.status(404).json({Error: "no se encontro el usuario"});

         const todasReservas = await reservasModels.getAllReservas({
            usuario,
            fecha,
            horaInicio,
            horaFinal,
            cantidadPersonas
         })
         res.status(202).json({message: "todas las reservas", reservas: todasReservas});
     }catch(e){
         console.log('Error al mirar todos las reservas',e);
         return res.status(404).json({message: "Error al mirar todas las reservas",Error: e});
     }
   }
}