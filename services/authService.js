const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET, SALT_ROUNDS } = require('../config/config')


async function register({email, fullName, password}) { 
    const repeatUser = await User.findOne({email})
    if(repeatUser){
        throw {message: 'Username already in use!'};
    }
    const user = new User({email, fullName, password});
    return await user.save();
    }
async function login({email,password}){
    let user = await User.findOne({email})
    if(!user) throw {message: 'User not found!'};

    let isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw {message: 'Passwords do not match!'};
    let token = jwt.sign({_id: user._id, email: user.email, fullName: user.fullName}, SECRET)

    return token
}

module.exports = {
    register,
    login
}