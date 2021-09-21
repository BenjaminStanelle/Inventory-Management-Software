const mongoose = require('mongoose');


const CONNECTION_URL = process.env.DATABASE;



//Creating a Connection with mangodb
mongoose.connect( CONNECTION_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log(`connection successful`))
.catch((error) => console.log(error.message));