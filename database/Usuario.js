export default class Usuario {
    constructor(user, password,type) {
        this.user = user
        this.password = password
        this.type = type
    }


    get user() {
        return this._user
    }
    
    set user(user) {
        this._user = user
    }

    get password() {
        return this._password
    }

    set password(password) {
        this._password = password
    }

    get type() {
        return this._type
    }

    set type(type) {
        this._type = type
    }
}
