import mongoose from 'mongoose';
import pagosModels from '../models/pagosModels';
import reservasModels from '../models/reservasModels';

const getId = (req) => req.params.id || req.body.id;

export default new class pagosController {
    async crearPago(req, res) {
        try {
            const { reserva, monto, metodo, estado } = req.body;
            if (!mongoose.isValidObjectId(reserva)) return res.status(400).json({ message: 'Reserva inválida' });
            if (monto === undefined || !metodo) return res.status(400).json({ message: 'Monto y método son obligatorios' });

            const reservaExiste = await reservasModels.getOneReservas({ _id: reserva });
            if (!reservaExiste) return res.status(404).json({ message: 'Reserva no encontrada' });

            const pago = await pagosModels.createPago({ reserva, monto, metodo, estado });
            return res.status(201).json({ message: 'Pago creado', data: pago });
        } catch (error) {
            return res.status(500).json({ message: 'Error al crear el pago', error: error.message });
        }
    }

    async obtenerPagos(req, res) {
        try {
            const id = getId(req);
            const pagos = id ? await pagosModels.getByIdPago(id) : await pagosModels.getAllPagos();
            if (id && !pagos) return res.status(404).json({ message: 'Pago no encontrado' });
            return res.status(200).json({ data: pagos });
        } catch (error) {
            return res.status(400).json({ message: 'ID de pago inválido', error: error.message });
        }
    }

    async actualizarPago(req, res) {
        try {
            const id = getId(req);
            if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'ID de pago inválido' });
            const pago = await pagosModels.updatePago(id, req.body);
            if (!pago) return res.status(404).json({ message: 'Pago no encontrado' });
            return res.status(200).json({ message: 'Pago actualizado', data: pago });
        } catch (error) {
            return res.status(500).json({ message: 'Error al actualizar el pago', error: error.message });
        }
    }

    async eliminarPago(req, res) {
        try {
            const id = getId(req);
            if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'ID de pago inválido' });
            const pago = await pagosModels.deletePago(id);
            if (!pago) return res.status(404).json({ message: 'Pago no encontrado' });
            return res.status(200).json({ message: 'Pago eliminado', data: pago });
        } catch (error) {
            return res.status(500).json({ message: 'Error al eliminar el pago', error: error.message });
        }
    }
};