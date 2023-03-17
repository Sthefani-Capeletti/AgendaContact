const validator = require('validator');
module.exports = class FormValidator {
    constructor(){
        this.#eventStarter()
    }
    #eventStarter(){
        document.addEventListener('submit', (event) => {
            this.#handleSubmit(event)
        }) 
    }
    #handleSubmit(event){
        event.preventDefault();
        const validFields = this.#fieldValidator(event.target);

        if(validFields){
            event.target.submit();
        }
    }
    #fieldValidator(target){
        let valid = true;
        target.querySelectorAll('.field-error').forEach( error => error.remove())
        if(target.classList.contains('formRegister')){
            target.querySelectorAll('.valida').forEach( field => {
                if(field.id === 'name'){
                    if(!field.value){
                        valid = false;
                        this.#writeError(field, "This field can't be empty.")
                        field.focus()
                    }
                }
                if(field.id === 'cellphone'){
                    if(!field.value){
                        valid = false;
                        this.#writeError(field,"This field can't be empty");
                        field.focus()
                    }
                }
                if(field.id === 'email'){
                   if(field.value && !validator.isEmail(field.value)){
                        valid = false;
                        this.#writeError(field,'E-mail invalid.');
                        field.focus()
                   }
                }
            })
        }
        else{
            target.querySelectorAll('.valida').forEach( field => {
                if(!field.value){
                    valid = false;
                    this.#writeError(field,"The field can't be empty.")
                }
                if(field.id === 'user'){
                    if(field.value.length < 5 || field.value.length > 20 ){
                        valid = false;
                        this.#writeError(field,"User must be between 5 and 20 characters.")
                    }
                }
                if(field.id === 'email'){
                    if(!validator.isEmail(field.value)){
                        valid = false;
                        this.#writeError(field,'Invalid e-mail.')
                    }
                }
                if(field.id === 'pass'){
                    if(field.value.length < 4){
                        valid = false;
                        this.#writeError(field,'Password must be at least 4 characters long. ')
                    }
                }
                
            })
        }
        return valid;
    }
    #writeError(field, msg){
        const div = document.createElement('div');
        div.classList.add('field-error')
        div.classList.add('text-danger');
        div.innerHTML = msg;
        field.insertAdjacentElement('afterend', div);
    }
}