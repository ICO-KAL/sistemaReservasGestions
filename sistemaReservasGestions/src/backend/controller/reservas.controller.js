import reservasModels from "../models/reservasModels";
import userModels from "../models/userModels";

export default new class reservas{
   async crearReservas(req,res){
      try{
         const {usuario,fecha,recurso,horaInicio,horaFinal,cantidadPersonas} = req.body;
         const buscarUsuario = await userModels.getUserOne({Email:usuario});
         const reservaExiste = await reservasModels.getOneReservas({usuario,fecha});

         if(!buscarUsuario) return res.status(404).json({Error: "usuario no encontrado"});
         if(reservaExiste) return res.status(404).json({Error: "Tienes una reserva para ese dia"});
         
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
        const reservaExiste = await reservasModels.getOneReservas({usuario,fecha});

        if(!reservaExiste) return res.status(404).json({message: "no se encontro reserva"});
   
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

   }
   async AllReservas(req,res){
    
   }
}