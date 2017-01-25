import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var router = express.Router();


app.use('/merlin', router);
app.listen(8080);
