const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
},{
    timestamps: true
});



userSchema.statics.encriptPassword = async password =>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async (password, passwordFound) =>{
   return await bcrypt.compare(password, passwordFound);
}

module.exports = model('user', userSchema);