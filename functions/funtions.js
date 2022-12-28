const fs = require('fs')


function rand(min, max) {
    var min = min || 0,
        max = max || Number.MAX_SAFE_INTEGER;

    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function routes(files) {

    const appdata = file(files)
    console.table(appdata)
   
}


function file(file) {

    const data = fs.readFileSync(file)
    const appdata = JSON.parse(data)


    return appdata
}


function saver(newfile) {

    var old = file(newfile)
    var id = rand(1, 99999999999)
    var id2 = rand(1, 99999999999)
    old['id'] = id
    old['otp'] = id2
    old['main'] = "/?"

    var nesw = JSON.stringify(old)
    const filewrite = fs.writeFileSync(newfile, nesw)

}

function updater(status, files) {
    var old = file(files)

    old.status = status

    var nesw = JSON.stringify(old)
    const filewrite = fs.writeFileSync(files, nesw)
}


module.exports = {
    routes,
    file,
    saver,
    updater,
    rand
}