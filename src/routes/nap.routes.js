const { Router } = require('express')
const router = Router()

const { renderNapForm, createNewNap, renderNap, renderEditForm, updateNap, deleteNap } = require('../controllers/nap.controller');

const {isAuthenticated} = require('../helpers/auth');

//New NAP
router.get('/nap/add', isAuthenticated, renderNapForm);
router.post('/nap/new-nap', isAuthenticated, createNewNap);

//Get all NAPs
router.get('/nap', isAuthenticated, renderNap);

//Edit NAPs
router.get('/nap/edit/:id', isAuthenticated, renderEditForm)
router.put('/nap/edit/:id', isAuthenticated, updateNap)

//Delete NAPs
router.delete('/nap/delete/:id', isAuthenticated, deleteNap)

module.exports = router