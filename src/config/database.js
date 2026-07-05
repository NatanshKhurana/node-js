const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://khurananatansh_db_user:ArNatansh14687@namastenode.3spyyvy.mongodb.net/DevTinder");
}

module.exports = connectDB;