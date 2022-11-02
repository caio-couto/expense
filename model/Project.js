const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
{
    name:
    {
        type: String,
        max: 30,
        required: true,
    },
    budget:
    {
        type: Number,
        required: true, 
    },
    category:
    {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    cost:
    {
        type:  Number,
        default: 0
    },
    services:
    [
        {
            name:
            {
                type: String,
                required: true
            },
            cost:
            {
                type: Number,
                required: true,
                default: 0
            },
            description:
            {
                type: String,
                required: true
            }
        }
    ]
})

module.exports = mongoose.model('Project', userSchema);