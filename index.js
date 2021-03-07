const express = require('express');
const app = express();
const conection = require('./db/db');

app.use(express.json());

//port

var  port = process.env.PORT || 3456;
app.listen(port, () => console.log(port));

//db

conection.dbconection();

//routers

const registerRouter = require('./routers/register');
app.use(registerRouter);
const loginRouter = require('./routers/login');
app.use(loginRouter);
const ticketsRouter = require('./routers/tickets');
app.use(ticketsRouter);

