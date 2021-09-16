import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import getUser from './database/creator.js'
import mysql from 'mysql'
import Validacion from './database/validacion.js'

const app = express()
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '011298',
    database: 'phila'
})


app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))


app.post('/Registro/api/insert', (req,res) => {
    try {
        const {user, password, type} = req.body
        const x = getUser(user, password, type)
        const {isUser,isPassword,isType} = Validacion.validateAll(x)
        const sqlInsert = "INSERT INTO user (user,password,type) VALUES (?,?,?)"
        if (isUser && isPassword && isType){

            db.query(sqlInsert, [user,password,type] , (err, result) => {
                if(err){
                    return res.status(200).send({isUser,isPassword,isType, error:err.errno})
                }else{
                    return res.status(200).send({isUser,isPassword,isType, error:-1})
                }
            })
        }else{
            return res.status(200).send({isUser,isPassword,isType, error:-1})
        }
        
    } catch (err) {
        return res.status(400).send('bad request')
    }
})


app.post('/Login/api/auth', (req,res) => {
    try {
        const {user, password,type} = req.body
        const x = getUser(user, password, type)
        const sqlInsert = "SELECT * FROM user WHERE user=?"

            db.query(sqlInsert, [user] , (err, result) => {
                if(err){
                    return res.status(200).send({error:err.errno})
                }else{
                    if(result.length== 0){
                        return res.status(200).send({goodUser:false,goodPassword:true})
                    }else if(result[0].type != type){
                        return res.status(200).send({goodUser:false,goodPassword:true})
                    }else if(result[0].password !=password){
                        return res.status(200).send({goodUser:true,goodPassword:false})
                    }else{
                        return res.status(200).send({goodUser:true,goodPassword:true})
                    }
                }
            })

        
    } catch (err) {
        return res.status(400).send('bad request')
    }
})



app.listen(3001,()=>{
    console.log('running on 3001')
})

