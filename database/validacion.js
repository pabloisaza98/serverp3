import v from "validator";

/* import Controlador from "./Controlador" */

export default class Validacion{

    static validateAll(usuario){

        const {user,password,type} = usuario
            const isUser = this.validateUser(user)
            const isPassword = this.validatePassword(password)
            const isType = this.validateType(type) 

        return {
            isUser,
            isPassword,
            isType
        }
    }

    static validateUser(data){
        var aprobado = (v.isAlphanumeric(data) && v.isLength(data, 4, 20))
        if(!aprobado) console.log(' fallando aqui con '+ data)
        return aprobado
    }

    static validatePassword(data){
        var aprobado = (v.isLength(data, 4, 20) && v.isAlphanumeric(data))
        if(!aprobado) console.log(' fallando aqui con '+ data)
        return aprobado
    }

    static validateType(data){
        var aprobado = data === 'helper' || data === 'philler'
        if(!aprobado) console.log(' fallando aqui con '+ data)
        return aprobado
    }


}

