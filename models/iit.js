const mongoose = require('mongoose')

const iitSchema = new mongoose.Schema(
    {
        branch:{
            type: String,
        },
        opening:{
            type: String,
        },
        closing:{
            type: String,
        }
    });

const IIT = mongoose.model('IIT', iitSchema);
module.exports = IIT;