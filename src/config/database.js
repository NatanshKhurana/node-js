const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://khurananatansh_db_user:oQ4QeTbxsiI8PIp1@namastenode.3spyyvy.mongodb.net/devTinder");
}

module.exports = connectDB;