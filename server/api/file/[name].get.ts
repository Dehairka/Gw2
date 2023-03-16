const express = require('express');
const app = express();

app.use(express.static('public')); 
app.use('/images', express.static('images'));