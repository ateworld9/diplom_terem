require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const errorMiddleware = require('./middlewares/error.middleware');

const userRouter = require('./components/user/user.routes');
const categoriesRouter = require('./components/categories/categories.routes');
const projectsRouter = require('./components/projects/projects.routes');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL,
}));

app.use('/api', userRouter);
app.use('/api', categoriesRouter);
app.use('/api', projectsRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3001;

const start = () => {
  try {
    app.listen(PORT, () => {
      console.log(`app is listening on port: ${PORT}`);
    });
  } catch (e) {
    console.log('starting app error: \n', e);
  }
};

start();
