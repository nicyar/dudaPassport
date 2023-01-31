import MongoContainer from "../container/MongoContainer.js";
import { db,model } from "../schema/usuarios.js";


class UsersDao extends MongoContainer {
    constructor() {
      super(db,model);
    }
}

export default UsersDao;