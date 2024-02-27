const mongoose = require('mongoose')

module.exports = async function connectToDb(){
    const url = 'mongodb://127.0.0.1:27017'
    console.log(`Connecting to DB... (${url})`)
    
    try{
        await mongoose.connect(url,{
            dbName:"bagrut",
        })
    
        console.log("Connected to DB!")
    }
    catch(e){
        console.error("Failed to Connect to DB!")
        console.error(e)
        console.error("Failed to Connect to DB!")
        process.exit();
    }
}