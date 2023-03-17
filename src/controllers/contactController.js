const { async } = require('regenerator-runtime')
const Contact = require('../models/contactModel')

exports.index = async (req, res) => {
    const contacts = await Contact.listAll(req.session.user._id)
    res.render('contactList', { contacts })
}

exports.form = (req, res) => {
    res.render('contact', { contact: {} })
}

exports.register = async (req, res) => {
    try{
        const contact = new Contact(req.body);
        await contact.register();
        if(!contact){
             req.flash('error', 'UNEXPECTED ERROR: Failed to add a new contact.');
            req.session.save(() => res.redirect('/contact/index') )
        }
        req.flash('success', 'You added a new contact');
        req.session.save(() => res.redirect('/contact/index') )
        return;
    }
    catch(e){
        console.log(e)
        res.render('404')
    }
}

exports.editIndex = async (req, res) => {
    try{
        const contact = await Contact.findById(req.params._id);
        if(!contact){
            req.flash('errors','UNEXPECTED ERROR: Unable to find contact.');
            req.session.save(()=> res.redirect('/contact/index'));
            return;
        }
        res.render('contact', { contact })
    }
    catch(e){
        console.log(e);
        res.render('404')
    }
}

exports.edit = async (req, res) => {
    try{
        const contact = new Contact(req.body);
        await contact.edit(req.params._id)
        if(contact.errors.length > 0){
            req.flash('errors', contact.errors);
            req.session.save(() => res.redirect(`/contact/editId/${req.params._id}`));
            return
        }
        req.flash('success','Contact has been updated.');
        req.session.save(() => res.redirect('/contact/index'));
        return;
    }
    catch(e){
        console.log(e);
        res.render('404')
    }
}

exports.delete = async (req, res) => {
    if(!req.params._id){
        req.flash('error','Failed to delete contact.')
        req.session.save(() => res.redirect('/contact/index'))
        return;
    }
    await Contact.delete(req.params._id);
    req.flash('success','Contact has been deleted.');
    req.session.save(() => res.redirect('/contact/index'));
    return;

}