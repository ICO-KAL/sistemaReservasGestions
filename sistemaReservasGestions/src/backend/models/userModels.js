import mongoose from 'mongoose';
import userSchemes from '../schemes/userSchemes';

export default new class userModels{
     constructor(){}

    async createUser(user){
       return await userSchemes.create(user);
    }
    async deleteUser(id){
        return await userSchemes.deleteOne({_id: new mongoose.Types.ObjectId(id)});
    }
    async getAllUser(){ //getAll
        return await userSchemes.find();
    }
    async getUserOne(filter){
        return await userSchemes.findOne(filter);
    }
    async getUserById(id){
        return await userSchemes.findById({_id: new mongoose.Types.ObjectId(id)});
    }
    async  upDateUser(id,user){
        return await userSchemes.updateOne({_id: new mongoose.Types.ObjectId(id)},user,{new: true});
    }

}