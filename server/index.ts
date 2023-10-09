require('dotenv').config()
import express, { Express, Request, Response } from 'express';
const sequelize = require("./db")
const cors = require("cors")
const router = require("./routes/index")
const errorHandler = require("./middleware/ErrorHandlingMiddleware")
const path = require("path")


import scrapeSReality from './src/scrape';

const PORT = process.env.PORT || 54321;

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use('/api', router);
// app.use(errorHandler);

const start = async () => {
  try {
    // await sequelize.authenticate();
    // await sequelize.sync();
    const data = await scrapeSReality();
    // console.log("Scraping is complete", data); // Добавьте сообщение, чтобы убедиться, что скрапинг завершен

    app.listen(PORT, () => console.log(`Server is starting on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();