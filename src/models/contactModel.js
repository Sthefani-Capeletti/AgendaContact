const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
    userid: { type: String, require: true },
    name: { type: String, require: true },
    surname: { type: String, require: false, default: ''},
    email: { type: String, require: false, default: ''},
    cellphone: { type: String, require: false, default: ''},
    homephone: { type: String, require: false, default: ''},
    creationDate: { type: Date, require: false, default: Date.now }
})

const ContactModel = mongoose.model('Contact', ContactSchema)

module.exports = class Contact {
    constructor(data){
        this.data = data;
        this.#cleanUp();
        this.contact = null;
        this.errors = []
    }
    #cleanUp(){
        for(const key in this.data){
            if(typeof this.data[key] != "string"){
                this.data[key] = ''
            }
            this.data = {
                userid: this.data.userid,
                name: this.data.name,
                surname: this.data.surname,
                email: this.data.email,
                cellphone: this.data.cellphone,
                homephone: this.data.homephone       
            }
        }
    }
    async register(){
        this.contact = await ContactModel.create(this.data);
        return;
    }

    async edit(id){
        this.contact = await ContactModel.findByIdAndUpdate(id, this.data, { new: true });
        if(!this.contact){
            this.errors.push('Unable do edit contact.');
            return;
        }
        return;
    }

    static async delete(id){
        await ContactModel.findByIdAndDelete({ _id : id});
        return;
    }
    
    static async listAll(userid){
        const contacts = await ContactModel.find({ userid : userid });
        return contacts;
    }

    static async findById(id){
        const contact = await ContactModel.findById(id);
        return contact;
    }
}