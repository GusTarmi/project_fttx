const coordinateCtrl = {};
const Coordinate = require('../models/Coordinate'); //requiero la estructura de los datos

napCtrl.renderCoordinateForm = (req, res) =>
{
    res.render('nap/new-nap')
};

coordinateCtrl.createNewCoordinate = async (req, res) =>
{
    const {latitude, longitude} = req.body;
    const newCoordinate = new Coordinate({latitude, longitude});
    newCoordinate.nap = req.nap._id;
    await newCoordinate.save();
    req.flash('success_msg','Coordinate added successfully');
    res.redirect('/nap');
};

napCtrl.renderCoordinate = async (req, res) =>
{
    const coordinate = await Coordinate.find({nap: req.nap.id}).lean();
    res.render('nap/all-naps', { coordinate });
};

napCtrl.renderEditForm = async (req, res) =>
{
    const coordinate = await Coordinate.findById(req.params.id).lean();
    if (coordinate.nap != req.nap.id)
    {
        req.flash('error_msg', 'Not authorized')
        return res.redirect('/nap');
    }
    res.render('nap/edit-nap', { coordinate });
};

napCtrl.updateCoordinate = async (req, res) =>
{
    const { latitude, longitude} =req.body;
    await Coordinate.findByIdAndUpdate(req.params.id, { latitude, longitude});
    req.flash('success_msg', 'Coordinate updated successfully');
    res.redirect('/nap');
};

napCtrl.deleteCoordinate = async (req, res) =>
{
    await Coordinate.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Coordinate deleted successfully');
    res.redirect('/nap');
};

module.exports = coordinateCtrl;