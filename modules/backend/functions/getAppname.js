const fs = require('fs')

function getAppName(and) {
    
const data =  fs.readFileSync('config.json', 'utf-8')

return JSON.parse(data).name


}

module.exports = getAppName