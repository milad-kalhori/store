const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require('config');
const error = require("./middleware/error");
const io = require("socket.io");

const app = express();


const setupExpressAndSocket = () => {
  const server = app.listen(config.get("PORT"), () => console.log(`Listening on port ${config.get("PORT")}...`));


  const socket = io(server);
  const mySocket = socket.of("/socket");

  mySocket.on("connection", (socket) => {
    console.log("new User Connected");

    socket.on("newMessage", (message) => {
      console.log(message.msg);
      mySocket.emit("newMessage", {...message, date: new Date(), id: Math.floor(Math.random() * Math.pow(10, 7))});
    });
    socket.on("deleteMsg", (id) => {
      console.log(id);
      mySocket.emit("deleteMsg",id);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected")
    })
  });

};

const setMongoConnection = () => {
  mongoose.connect(config.get('MONGO_URI'), {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
    .then(() => console.log('Mongo connected...'))
    .catch(err => console.log('Could not connect to MongoDB...', err));
};

const setRouters = () => {
  const apiRouter = require('./routes/index');
  app.use(cors());
  app.use(bodyParser());
  app.use('/api', apiRouter);
  app.use(error);
  app.use(express.static('public'));
};

setupExpressAndSocket();
setMongoConnection();
setRouters();





/*
// Set security HTTP headers
app.use(helmet());

// Limit requests from same API (DDos)
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);


// Body parser, reading data from body into req.body (Size)
app.use(express.json({ limit: '10kb' }));


// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'maxGroupSize',

    ]
  })
*/