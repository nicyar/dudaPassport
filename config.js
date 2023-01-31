import dotenv from 'dotenv';
dotenv.config();
const config ={
    mongo:{
        PWD: process.env.PASSWORD
    }
}

export default config;