const Login = require('../models/loginModel')

exports.index = (req, res) => {
    if(req.session.user){
        req.flash('success',"You've logged in. Welcome.")
        req.session.save(()=> res.redirect('/contact/index'))
        return;
    }
    res.render('login')
}

exports.register = async (req, res) => {
    try{
        const login = new Login(req.body);
        await login.register();
        if(login.errors.length > 0){
            req.flash('errors', login.errors);
            req.session.save(() => res.redirect('/login/index'))
            return;
        }
        req.flash('success','Registration completed successfully');
        req.session.save(() => res.redirect('/login/index') )
        return;
    }
    catch(e){
        console.log(e)
        res.render('404')
    }
}

exports.login = async (req, res) => {
    try{
        const login = new Login(req.body);
        await login.login();

        if(login.errors.length > 0 ){
            req.flash('errors', login.errors);
            req.session.save(() => res.redirect('/login/index'))
            return;
        }
        else{
         
            req.session.user = login.user;  
            req.session.save(() => res.redirect('/login/index'))  
            return;
        }
    }
    catch(e){
        console.log(e)
        res.render('404')
    }
}

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/')
}