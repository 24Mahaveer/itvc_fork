import express from 'express'
import jwt from 'jsonwebtoken'

const app=express()
const port= 7777;

app.use(express.json())

const secret="secret-key"

let user= {id:1, username:"xyz", password:"123", role:"manager"}

app.post('/login',(req,res)=>{
    if((req.body.username!==user.username)||(req.body.password!==user.password))
        return res.send("wrong credentials")

    const token=jwt.sign({user:user.name},secret,{expiresIn:"1h"})
    res.send(token)
})

const auth=(req,res,next)=>{
    try {
        res.user=jwt.verify(req.headers.authorization.split(" ")[1],secret)
        next()
    } catch (error) {
        res.send("not an authentic user")
    }
}

app.get('/role',auth,(req,res)=>{
    if (user.role!=="manager")
        return res.send("you are not manager")
    res.send("welcome manager")
})

app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})