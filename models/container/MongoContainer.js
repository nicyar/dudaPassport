import mongoose from "mongoose";

class MongoContainer{
    constructor(db,model){
       this.db=db;
       this.model=model;
    }

    static async disconnect() {
        await mongoose.disconnect();
      }

    async getAll(){
        const documents = await this.model.find({})
        return documents
    }
    async save(item){
        const newDocument=this.model(item);
        return await newDocument.save()
    }
}


export default MongoContainer;