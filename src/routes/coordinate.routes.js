const { Router } = require('express')
const router = Router()

const { renderCoordinateForm, createNewCoordinate, renderCoordinate, renderEditForm, updateCoordinate, deleteCoordinate } = require('../controllers/coordinate.controller');

const {isAuthenticated} = require('../helpers/auth');

//New Coordinate
router.get('/coordinate/new/:id', isAuthenticated, renderCoordinateForm);
router.post('/coordinate/new-coordinate/:id', isAuthenticated, createNewCoordinate);

//Get all NAPs
router.get('/nap', isAuthenticated, renderCoordinate);

//Edit NAPs
router.get('/nap/edit/:id', isAuthenticated, renderEditForm)
router.put('/nap/edit/:id', isAuthenticated, updateCoordinate)

//Delete NAPs
router.delete('/nap/delete/:id', isAuthenticated, deleteCoordinate)

module.exports = router