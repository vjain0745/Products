const mongoose =require("mongoose");

const URI = "mongodb+srv://product:Abc123@cluster0.ru8if.mongodb.net/Products?retryWrites=true&w=majority";

const connectdb= async()=>{
    await mongoose.connect(URI, { useUnifiedTopology: true , useNewUrlParser: true, useFindAndModify: false });

 console.log("db connected");
};

module.exports = connectdb;



