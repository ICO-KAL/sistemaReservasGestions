import mongoose from 'mongoose';
import adminModels from '../models/adminModels';

const getId = (req) => req.params.id || req.body.id;

export default new class adminController {
    async crearAdmin(req, res) {
        try {
            const { name } = req.body;
            if (!name) return res.status(400).json({ message: 'El nombre es obligatorio' });

            const admin = await adminModels.createAdmin({ name });
            return res.status(201).json({ message: 'Administrador creado', data: admin });
        } catch (error) {
            return res.status(500).json({ message: 'Error al crear el administrador', error: error.message });
        }
    }

    async obtenerAdmin(req, res) {
        try {
            const id = getId(req);
            const admin = id ? await adminModels.getAdmin(id) : await adminModels.getAllAdmin();
            if (id && !admin) return res.status(404).json({ message: 'Administrador no encontrado' });
            return res.status(200).json({ data: admin });
        } catch (error) {
            return res.status(400).json({ message: 'ID de administrador inválido', error: error.message });
        }
    }

    async actualizarAdmin(req, res) {
        try {
            const id = getId(req);
            const { name } = req.body;
            if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'ID de administrador inválido' });
            if (!name) return res.status(400).json({ message: 'El nombre es obligatorio' });

            const admin = await adminModels.updateAdmin(id, { name });
            if (!admin) return res.status(404).json({ message: 'Administrador no encontrado' });
            return res.status(200).json({ message: 'Administrador actualizado', data: admin });
        } catch (error) {
            return res.status(500).json({ message: 'Error al actualizar el administrador', error: error.message });
        }
    }

    async eliminarAdmin(req, res) {
        try {
            const id = getId(req);
            if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'ID de administrador inválido' });

            const admin = await adminModels.deleteAdmin(id);
            if (!admin) return res.status(404).json({ message: 'Administrador no encontrado' });
            return res.status(200).json({ message: 'Administrador eliminado', data: admin });
        } catch (error) {
            return res.status(500).json({ message: 'Error al eliminar el administrador', error: error.message });
        }
    }
};