import express from 'express'
import { IUser } from '@fuse-starter-typescript/shared/interfaces'
export const app = express()

app.use(express.json())

app.get('/api/test', function(req, res){

    let user: IUser = {
        firstName: "First",
        lastName: "Last"
    }
    res.send(user)
})


app.listen(3000, function (){
    console.log("Listening on port 3000")
})