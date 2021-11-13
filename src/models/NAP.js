const {Schema, model} = require('mongoose');

const NAPSchema = new Schema(
    {
        title: { type: String, required: true},
        origin: { type: String, required: true},
        position: { type: String, required: true},
        user: { type: String, required:true }
    },
    {
        timestamps: true
    });

module.exports = model('NAP', NAPSchema);