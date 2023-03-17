const moongose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs');


const LoginSchema = new moongose.Schema({
    user: { type: String, require: true },
    email: { type: String, require: true },
    pass: { type: String, require: true }
})

const LoginModel = moongose.model('Login', LoginSchema);

module.exports = class Login {
    constructor(data){
        this.data = data;
        this.user = null;
        this.errors = [];
        this.#cleanUp();
    }
    #cleanUp(){
        for(let key in this.data){
            if(typeof this.data[key] !== 'string'){
                this.data[key] = '';
            }
        }
        this.data = {
            user: this.data.user,
            email: this.data.email,
            pass: this.data.pass
        }
    }

     async validate(){
        const emailExists = await this.emailAlreadyExists(this.data.email);
        if(emailExists) {
            this.errors.push('E-mail already exists. Try a different one.')
            return;
        }
        const userExists = await this.userAlreadyExists(this.data.user);
        if(userExists){
            this.errors.push('User already exists. Try a different one.')
            return;
        }
    }

    async register(){
        await this.validate();
        if(this.errors.length > 0) return;
    
        const salt = bcrypt.genSaltSync();
        this.data.pass = bcrypt.hashSync(this.data.pass,salt)
        this.user = await LoginModel.create(this.data);
        return;
    }

    async login(){
        this.user = await LoginModel.findOne( { user: this.data.user } );
        if(!this.user){
            this.errors.push("User doesn't exists.");
            return;
        }
        if(!bcrypt.compareSync(this.data.pass, this.user.pass)){
            this.errors.push('Password invalid.');
            return;
        }
        return;
    }

    async emailAlreadyExists(email){
        const emailExists = await LoginModel.findOne( { email: email });
        return emailExists;
    }

    async userAlreadyExists(user){
        const userExists = await LoginModel.findOne({ user: user })
        return userExists;
    }
    
}