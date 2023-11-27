import mongoose, { ConnectOptions } from "mongoose"
import config from "config"
import log from "./Logger";

async function connectToDb(){
    const dbUri = config.get<string>('dbUri')
    const dbName = config.get<string>('dbName')
    const user = config.get<string>('user')
    const pass = config.get<string>('pass')
    const options: ConnectOptions = {
        dbName,
        user,
        pass,
        authSource: 'admin',
        autoIndex: true,
        bufferCommands: true,
    };
    try {
        log.info("Connecting to databse...")
        await mongoose.connect(dbUri, options);
        log.info("Connection to database established")
        const db = mongoose.connection
        db.once('open', (stream) => {
            log.info("Connected to database")
        });
        db.on('error', (err) => {
            log.info(err)
        });
        
    } catch (error) {
        process.exit(1);
    }
}

export default connectToDb