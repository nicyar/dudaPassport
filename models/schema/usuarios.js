import mongoose from 'mongoose';
import config from '../../config.js'


const usuariosCollection = 'usuarios';

const UsuariosSchema = new mongoose.Schema({
    username:{type:String,require:true},
    password:{type:String,require:true},
    create_at:{type:Date,default:Date.now}
})
export const db =mongoose.connect(`mongodb+srv://matias:${config.mongo.PWD}@cluster0.tqiapux.mongodb.net/?retryWrites=true&w=majority`)
export const model = mongoose.model(usuariosCollection,UsuariosSchema)
