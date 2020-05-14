const mongoose = require('mongoose')

const trendingnewsSchema = new mongoose.Schema(
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

const TrendingNews = mongoose.model('TrendingNews', trendingnewsSchema);
module.exports = TrendingNews;