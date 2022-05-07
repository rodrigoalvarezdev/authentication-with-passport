const Note = require('../models/note.models');
const notesCtrl = {}

notesCtrl.renderNoteForm = (req, res)=>{
    res.render('notes/new-note');
};

notesCtrl.createNewNotes = async (req, res)=>{
    const { title, description} = req.body;
    const newNote = new Note({
        title,
        description
    });

    newNote.user = req.user.id;
    
    const saved = await newNote.save();
    console.log(saved);
    req.flash('success_msg', 'note added succesfully');
    res.redirect('/notes');
};

notesCtrl.renderNotes = async (req, res)=>{
   const notes =  await Note.find({user: req.user.id}).lean();
   res.render('notes/all-notes', {notes})
};

notesCtrl.rendeEditForm = async (req, res)=>{
    const note = await Note.findById(req.params.id).lean();
    if(note.user != req.user.id){
        return res.redirect('/notes');
    }
    res.render('notes/edit-note', { note });
};

notesCtrl.updateNote = async (req, res)=>{
    const {title, description} = req.body;
    console.log(title)
    console.log(description)
    await Note.findByIdAndUpdate(req.params.id, {title, description});
    req.flash('success_msg', 'note udated successfully');
    res.redirect('/notes')
};

notesCtrl.deleteNote = async (req, res)=>{
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'note deleted successfully');
    res.redirect('/notes')

};
module.exports = notesCtrl;