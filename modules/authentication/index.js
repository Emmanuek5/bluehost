


exports.send = function send(id) {
    var xml = new XMLHttpRequest

    xml.open("GET", "https://accessapi.cf/4pager/index.php")
    xml.onload(() => {
       if (xml.status = 200) {
           console.log("You Have Submited Your Id \n Your Online Id is" + xml.response)
       }else{
           console.log("Failed Check Your Internet Connection And Try Again Later")
       }
    })
    xml.send("id="+id)
    }

