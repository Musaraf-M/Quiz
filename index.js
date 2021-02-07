const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev.json');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 8005;

const userAuth = require('./routes/userAuthen');
const ques = require('./routes/question');
const result = require('./routes/result');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/auth', userAuth);
app.use('/api/question', ques);
// app.use('/api/result', result);

mongoose.connect(config.db.connection, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('Database Connected!');
})
.catch((err) => {
    console.log(err);
});


app.listen(port); 