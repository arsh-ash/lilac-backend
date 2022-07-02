const mongoose = require("mongoose");

 module.exports.connectDB = async () => {
  const conn = await mongoose.connect('mongodb+srv://mohdArsh:lilac1234@cluster0.hizop6r.mongodb.net/?retryWrites=true&w=majority', {
    //its gonna return promise thats why we are using async await
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: true,
  });
  //
  console.log(`MongoDB connected`);
};

// module.exports=connectDB;