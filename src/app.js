import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import MongoConnection from './configs/db.config';
import apiRoutes from './routes/api.routes';

dotenv.config();

class App {
    constructor() {
        this.app = express();
        this.mongoConnection = new MongoConnection(process.env.MONGODB_URI);

        this.connectToDatabase();
        this.activateAppRoutes();
    }
    connectToDatabase() {
        this.mongoConnection.startDbConnection();
    }
    activateAppRoutes() {
        this.app.use('/api', apiRoutes);
      }
}

export default new App().app;