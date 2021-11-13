const {Schema, model} = require('mongoose');

const CoordinateSchema = new Schema(
    {
        latitude: { type: String, required: true},
        longitude: { type: String, required: true},
        nap: { type: String, required:true }
    },
    {
        timestamps: true
    });

module.exports = model('Coordinate', CoordinateSchema);