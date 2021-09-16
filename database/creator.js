import  Usuario from './Usuario.js'
import validacion from './validacion.js'

export default function getUser(user, password,type) {
    return new Usuario(user, password,type)
}