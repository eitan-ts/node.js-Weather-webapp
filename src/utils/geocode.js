const request = require('request')

const geocode = (adress,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adress) + '.json?access_token=pk.eyJ1IjoiZWl0YW4xOTk3dHMiLCJhIjoiY2tzMHN1YjN1MTV0cDJ3bzk2czI2bHpyMCJ9.4Kv0SEkgo8f6-PEP1xSmTg&limit=1'
    
    request({url,json: true},(error,{body} = {}) => {
        if(error){
            callback('Unable to connect to location services!', undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location. Try another search.',undefined)
        }else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
           })
        }
    })
}

module.exports = geocode