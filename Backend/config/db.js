const mongoose = require('mongoose');

const mongoDB = async()=>{
try {
        await mongoose.connect(process.abort.env.MONGO_URI);
        console.log('Connected');
} catch (error) {
    console.log(error);
}


}

module.exports=mongoDB;
