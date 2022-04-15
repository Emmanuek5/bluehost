const express = require("express")
const app = express()

const fs = require("fs")
const { url } = require("inspector")
const isset = require("isset-php")
const { execPath } = require("process")
const commun = require("./modules/server/index");
const login = require("./modules/authentication/index")
app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))




function rand(min, max) {
    var min = min || 0,
        max = max || Number.MAX_SAFE_INTEGER;

    return Math.floor(Math.random() * (max - min + 1)) + min;
}





function file(file) {

    const data = fs.readFileSync(file)
    const appdata = JSON.parse(data)


    return appdata
}


function saver(newfile) {

    var old = file(newfile)
    var id = rand(1, 99999999999)
    old['id'] = id
    old['main'] = "/?"

    var nesw = JSON.stringify(old)
    const filewrite = fs.writeFileSync(newfile, nesw)

}


exports.start = function start(port, filename, route = false) {
    const appdata = file(filename)
    const urls = appdata['urls']
    console.log(appdata['name'])
    console.table(appdata['urls'])
    commun.communicate("709", appdata)
    if (appdata['main'] == "/?") {
        app.get("/", (req, res) => {
            res.render(appdata['urls']['1'])
        })

        if (isset(() => appdata['second'])) {
            console.log(appdata["second"])
        }

        if (route = true) {

            console.table(appdata)
            app.get("/routes", (req, res) => {
                res.json(appdata)
            })
        }

        if (isset(() => appdata.second)) {

            app.get("/" + appdata.second, (req, res) => {
                if (isset(() => appdata.urls['2'])) {
                    res.render(appdata['urls']['2'])
                } else {
                    if (appdata['mode'] == "development") {
                        res.send("No Source Is Found")
                    } else {
                        res.send("Error")
                    }
                }
            })
        }
        
        if (isset(() => appdata.third)) {

            app.get("/" + appdata.third, (req, res) => {
                if (isset(() => appdata.urls['3'])) {
                    res.render(appdata['urls']['3'])
                } else {
                    if (appdata['mode'] == "development") {
                        res.send("No Source Is Found")
                    } else {
                        res.send("Error")
                    }
                }
            })
        }


        if (isset(() => appdata.fourth)) {

            app.get("/" + appdata.fourth, (req, res) => {
                if (isset(() => appdata.urls['4'])) {
                    res.render(appdata['urls']['4'])
                } else {
                    if (appdata['mode'] == "development") {
                        res.send("No Source Is Found")
                    } else {
                        res.send("Error")
                    }
                }
            })
        }
        app.get("/:h", (req, res) => {
            res.render("app.ejs", { name: appdata['name'], port: port, mode: appdata['mode'] })

        })

    } else {
        app.get("/", (req, res) => {
            res.render("app.ejs", { name: appdata['name'], port: port, mode: appdata['mode'] })

        })

    }


    app.post("/", (req, res) => {

        saver(filename)
        res.redirect("/")
    })


    if (port == "80") {

        var url = appdata['url']
    } else {
        var url = appdata['url'] + ":" + port
    }
    app.listen(port, () => {
        console.log('Server Started On Port ' + port + "\n" + "Server Address: " + url)
    })
}


exports.routes = function routes(files) {

    const appdata = file(files)
    console.table(appdata)
    app.get("/routes", (req, res) => {
        res.json(appdata)
    })


}