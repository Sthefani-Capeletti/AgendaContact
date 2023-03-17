exports.globalMiddleware = (req, res, next) => {
    res.locals.errors = req.flash('errors')
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    next();
}

exports.checkCrsfError = (err, req, res, next) => {
    if(err){ 
        res.render('404')
    }
}
exports.generateCrsfToken = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken()
    next(); 
}

exports.requiredLogin = (req, res, next) => {
    if(!req.session.user){
        return res.render('404')
    }    
    next()
}