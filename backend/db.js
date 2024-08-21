const mongoose = require('mongoose')

const connection = async (url) => {
    try {
        await mongoose.connect(url)
        console.log('connected to db')
        
    } catch (error) {
        console.log('something went wrong')
        console.log(error.message)
    }
}

module.exports  = {connection}