import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import MongoConnection from './configs/db.config';
import apiRoutes from './routes/api.routes';
import errorHandling from './middlewares/errorHandling';
import request404Handling from './middlewares/request404Handling';

dotenv.config();

class App {
    constructor() {
        this.app = express();
        this.mongoConnection = new MongoConnection(process.env.MONGODB_URI);

        this.connectToDatabase();
        this.activateAppMiddlewares();
        this.activateAppRoutes();
        this.activateErrorHandling();
        this.activateNotFoundRequest();
    }

    connectToDatabase() {
        this.mongoConnection.startDbConnection();
    }

    activateAppMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(cors({
            origin: process.env.FRONT_END_URL,
        }));
    }

    activateAppRoutes() {
        this.app.use('/api', apiRoutes);
    }

    activateErrorHandling() {
        this.app.use(errorHandling.handle);
    }
    
    activateNotFoundRequest() {
        this.app.use(request404Handling.handle);
    }
}

export default new App().app;