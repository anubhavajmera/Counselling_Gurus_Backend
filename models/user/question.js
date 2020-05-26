const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        questionTitle: {
            type: String,
            required: true
        },
        question: {
            type: String,
            required: true,
        },
        questionImage: {
            type: String,
            default: 'NA'
        }
    }
);

const Questions = mongoose.model('Questions', questionSchema);
module.exports = Questions;