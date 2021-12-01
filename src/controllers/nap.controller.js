const napCtrl = {};
const NAP = require('../models/NAP'); //requiero la estructura de los datos

napCtrl.renderNapForm = (req, res) =>
{
    document.write("iniciando el proceso de creacion de nueva NAP");
    res.render('nap/new-nap')
};

napCtrl.createNewNap = async (req, res) =>
{
    document.write("Inicio de creacion de la nap");
    const {title, origin, position} = req.body;
    const newNap = new NAP({title, origin, position});
    newNap.user = req.user._id;
    await newNap.save();
    req.flash('success_msg','NAP added successfully');
    res.redirect('/nap');
};

napCtrl.renderNap = async (req, res) =>
{
    document.write("renderizado de la nap nueva");
    const nap = await NAP.find({user: req.user.id}).lean();
    res.render('nap/all-naps', { nap });
};

napCtrl.renderEditForm = async (req, res) =>
{
    const nap = await NAP.findById(req.params.id).lean();
    if (nap.user != req.user.id)
    {
        req.flash('error_msg', 'Not authorized')
        return res.redirect('/nap');
    }
    res.render('nap/edit-nap', { nap });
};

napCtrl.updateNap = async (req, res) =>
{
    const { title, origin, position} =req.body;
    await NAP.findByIdAndUpdate(req.params.id, { title, origin, position});
    req.flash('success_msg', 'NAP updated successfully');
    res.redirect('/nap');
};

napCtrl.deleteNap = async (req, res) =>
{
    await NAP.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'NAP deleted successfully');
    res.redirect('/nap');
};

module.exports = napCtrl;