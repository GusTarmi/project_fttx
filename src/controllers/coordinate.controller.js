const coordinateCtrl = {};
const Coordinate = require('../models/Coordinate'); //requiero la estructura de los datos
const mqtt = require('mqtt');


coordinateCtrl.renderCoordinateForm = (req, res) => {
    res.render('coordinate/new-coordinate')
};

coordinateCtrl.createNewCoordinate = async (req, res) => {
    var options = {
        port: 1883,
        host: 'unbalancedfttx.ga',
        clientId: 'fttx',
        username: 'admin',
        password: 'GusTdeRuth.1496#',
        keepalive: 60,
        clean: true,
    };
    const {latitude, longitude} = req.body;
    var client = mqtt.connect("mqtt://unbalancedfttx.ga", options);
    client.on('connect', function () {
        console.log("Conexión  MQTT Exitosa!");
        client.subscribe('gpsdata', function (err) {
            console.log("Subscripción exitosa!")
        });
    })
    client.on('message', function (topic, message) {
        console.log("Mensaje recibido desde -> " + topic + " Mensaje -> " + message.toString());
        if (topic == "values") {
            var msg = message.toString();
            var sp = msg.split(",");
            latitude = sp[0];
            longitude = sp[1];
        }
    });
    const newCoordinate = new Coordinate({ latitude, longitude });
    newCoordinate.nap = req.nap._id;
    await newCoordinate.save();
    req.flash('success_msg', 'Coordinate added successfully');
    res.redirect('/nap');
};

coordinateCtrl.renderCoordinate = async (req, res) => {
    const coordinate = await Coordinate.find({ nap: req.nap.id }).lean();
    res.render('nap/all-naps', { coordinate });
};

coordinateCtrl.renderEditForm = async (req, res) => {
    const coordinate = await Coordinate.findById(req.params.id).lean();
    if (coordinate.nap != req.nap.id) {
        req.flash('error_msg', 'Not authorized')
        return res.redirect('/nap');
    }
    res.render('nap/edit-nap', { coordinate });
};

coordinateCtrl.updateCoordinate = async (req, res) => {
    const { latitude, longitude } = req.body;
    await Coordinate.findByIdAndUpdate(req.params.id, { latitude, longitude });
    req.flash('success_msg', 'Coordinate updated successfully');
    res.redirect('/nap');
};

coordinateCtrl.deleteCoordinate = async (req, res) => {
    await Coordinate.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Coordinate deleted successfully');
    res.redirect('/nap');
};

module.exports = coordinateCtrl;