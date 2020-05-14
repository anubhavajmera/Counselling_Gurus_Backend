const mongoose = require('mongoose')

const newsSchema = new mongoose.Schema(
    {
        heading:{
            type: String,
            required: true
        },
        subheading:{
            type: String,
            required: true,
        }
    }
);

const News = mongoose.model('News', newsSchema);
module.exports = News;