const {Router} = require('express');
const router = Router();
const notesCtrl = require('../controllers/notes.controllers');
const helper = require('../helpers/validate');

router.get('/notes/add',helper.isAuthenticated, notesCtrl.renderNoteForm);

router.post('/notes/new-note', helper.isAuthenticated, notesCtrl.createNewNotes);

router.get('/notes', helper.isAuthenticated, notesCtrl.renderNotes);

router.get('/notes/edit/:id', helper.isAuthenticated, notesCtrl.rendeEditForm);

router.put('/note/edit/:id', helper.isAuthenticated, notesCtrl.updateNote);

router.delete('/note/delete/:id', helper.isAuthenticated, notesCtrl.deleteNote);



module.exports = router;