const axios = require("axios")

const url = "http://localhost/bluehost"
exports.send = function send(id, name) {
    axios.get(url, {
        params: {
            id: id,
            name:name
        }
    })
    
        .then(function (response) {
            console.log(response.data);
        })
    
}

exports.new  = function newre(id,json) {
    
    axios.post('url'+"/req.php", {
        id: id,
        json:json
    })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });

}

