const mongoose = require('mongoose');
const mongodbConnection = process.env.MONGODB_CONNECTION;

(()=>{
    try {
        mongoose.connect(mongodbConnection);
        console.log('database is connected')
    } catch (error) {
        console.error(error);
    }
})();