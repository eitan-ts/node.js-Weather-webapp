const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and view location
app.set('view engine' , 'hbs')
app.set('views' , viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req,res) =>{
    res.render('index',{
        title:'Weather App',
        name: 'Eitan Tshernihovsky'
    })
})

app.get('/about', (req,res) =>{
    res.render('about',{
        title: 'About me',
        name: 'Eitan Tshernihovsky'
    })
})

app.get('/help', (req,res) =>{
    res.render('help',{
        title: 'Help page',
        name: 'Eitan Tshernihovsky'
    })
})

app.get('/weather', (req,res) =>{
    if(!req.query.adress){
        return res.send({
            error:'Please enter adress.'
        })
    }
        geocode(req.query.adress,(error,{latitude,longitude,location} = {}) => {
            if(error)
                return res.send({error: error})
            
            forecast(latitude,longitude,(forecastError,forecastData) =>{
                if(forecastError)
                    return res.send({error: forecastError})
                

                return res.send({
                    location: location,
                    forecast: forecastData
                })
            })  
        }
    )
})
    


app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name: 'Eitan Tshernihovsky',
        msg:'Help artical not found!'
    })
})

app.get('/*', (req,res) =>{
    res.render('404',{
        title:'404',
        name:'Eitan Tshernihovsky',
        msg: 'Page not found!'
    })
})


app.listen(port,() =>{
    console.log('Server is up on port 3000.')
})