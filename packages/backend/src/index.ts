import express from 'express'
export const app = express()

app.use(express.json())

app.get('/api/test', function(req, res){
    res.send({
        "test": "response"
    })
})


app.listen(3000, function (){
    console.log("Listening on port 3000")
})