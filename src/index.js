const dotenv = require('dotenv').config();
const app = require('./server');
require('./database');

app.listen(app.get('port'), _ =>{
    console.log(`server on port ${app.get('port')}`);
});