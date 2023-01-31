import bCrypt from 'bcrypt';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createHash = password => {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
  }
  
export const isValidPassword = (userPassword, password) => {
    return bCrypt.compareSync(password, userPassword)
  }

  
  
  export default __dirname;
// const auth = async (req, res, next) => {
//     if (req.session.user) {
//       next();
//     }
//     else {
//       res.redirect('/login.html');
//     }
//   };
