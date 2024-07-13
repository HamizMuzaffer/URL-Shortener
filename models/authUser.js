const mongoose = require('mongoose')


const authUserSchema = new mongoose.Schema(
    {
      name : {
        type : String,
        required : true
      },
email :{
    type : String,
    required : true,
    unique : true
},

password: {
    type : String,
    required : true,
}
    },
    {
        timestamps : true
    }
)

const authUser = mongoose.model("authUser",authUserSchema)

module.exports = authUser