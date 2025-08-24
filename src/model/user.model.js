const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {type:String, require:true},
    email:{type:String, require:true, match:[/^\S+@\S+\.\S+$/,"Please enter Valid E-mail"], unique:true},
    username:{type:String, require:true, unique:true},
    password:{type:String, require:true}
})

const userModel = mongoose.model('user',userSchema);

module.exports=userModel;