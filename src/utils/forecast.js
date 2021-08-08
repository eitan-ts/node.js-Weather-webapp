const request = require('request')

const forecast = (lat ,longi,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=eaa4611a48b9b93eae5da709d10dc41d&query='+lat+','+longi
    
    request({url , json: true},(error,{body} = {}) => {
        if(error){
            callback('Unable to connect to weather services.',undefined)
        }else if(body.success === false){
            callback('Unable to find location,Please try another search.', undefined)
        }else{
            callback(undefined,
                'Current Temperature is ' + body.current.temperature + 
                        ' Degress, But it feels like ' + body.current.feelslike 
                                                                                + ' Degress.'
            )
        }
    })
}

module.exports = forecast