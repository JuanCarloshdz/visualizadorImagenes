import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'

import Cards from './dbCards.js'

// App config

const app = express();
const port = process.env.PORT || 8001;
const connection_url = 'mongodb+srv://admin:KyZfZwL5en534rr@cluster0.3gltk.mongodb.net/tinderdb?retryWrites=true&w=majority'

//middleware
app.use(express.json())
app.use(Cors())
//bdConfig
mongoose.connect(connection_url,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})



//API endpoints
app.get('/', (req, res) =>{
    res.status(200).send( 'hello world'  )
});

app.post('/tinder/cards', (req, res) => {
    const dbCar =  req.body

    Cards.create(dbCar, (err, data)=>{
        if (err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    } )
})

app.get('/tinder/cards', (req, res) => {
    Cards.find( (err, data)=>{
        if (err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    } )
});


//listener
app.listen(port, ()  => console.log( `listening on localhost:${port}` ) )


