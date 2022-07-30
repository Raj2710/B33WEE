var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
const saltRounds = 10;
const secretKey = 'Nkjnkjn546QWRRnsjhbQW'


async function hashPassword(password){
    var salt = await bcrypt.genSalt(saltRounds);
    console.log(salt)
    var hashedPassword =await  bcrypt.hash(password,salt);
    return hashedPassword;
}


async function hashCompare(password,hashedPassword){
    return await bcrypt.compare(password,hashedPassword)
}


let createToken = async(data)=>{
    let token = await jwt.sign(data,secretKey,{expiresIn:'1m'})
    return token
}

let validate = async(token)=>{
    let data = await jwt.decode(token)

    // console.log(Math.round((+new Date)/1000))
    // console.log(data.exp)
    if(Math.round((+new Date)/1000)<data.exp)
    {
        return {
            email:data.email,
            role:data.role,
            validity:true
        }
    }
    else
    {
        return {
            email:data.email,
            role:data.role,
            validity:false
        }
    }
}

module.exports = {hashPassword,hashCompare,createToken,validate}