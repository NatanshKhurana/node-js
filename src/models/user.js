const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required: [true, `firstName is required field`],
        minLength : [3, `firstName must include atleast 3 characters, got {VALUE}`],
        maxLength : [100, `firstName must include atmost 100 characters, got {VALUE}`],
        trim : true,
    },
    lastName : {
        type : String,
        minLength : [3, `lastName must include atleast 3, got {VALUE}`],
        maxLength : [100, `lastName must include atmost 100, got {VALUE}`],
        trim:true,
    },
    age : {
        type : Number,
        min : [18, `age should be atleast 18, got {VALUE}`],
        max: [100, `age must be atmost 100, got {VALUE}`],
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        unique : [true, `this email already exists...`],
        trim : true,
    },
    password : {
        type : String,
        required : true,
        minLength : [8, `min length of password should be 8 characters`],
        maxLength : [1000, `max length of password should be 1000 characters`],
    },
    gender : {
        type : String,
        validate(value){
            if(!["male", "female", "other"].includes(value)){
                throw new Error("Please enter a valid gender...");
            }
        }
    },
    photoUrl : {
        type : String,
        default : "https://i.pinimg.com/564x/df/3d/33/df3d337449a55926b196debf6e138e5a.jpg",
        trim : true,
    },
    skills : {
        type : [String],
    }
}, {timestamps : true});

module.exports = mongoose.model("User", userSchema);