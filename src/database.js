const mongoose = require('mongoose')

const { PROJECTFTTX_APP_HOST, PROJECTFTTX_APP_DATABASE } = process.env;
const MONGODB_URI = `mongodb://${PROJECTFTTX_APP_HOST}/${PROJECTFTTX_APP_DATABASE}`;

mongoose.connect(MONGODB_URI)
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err));