# Bluehost Npm Pakage

## To Start New File You Can Use  `npx bluehost <your app name>`


## Add File in The `Routes` Folder with `name.route.js` to add a new route to The Package 

### In The  `name.route.js` and the following lines of code : `const express    = require('express');

<code>
const express    = require('express');
const router     = express.Router();



router.get('/', (req, res) => {
    res.render('users/index.ejs')
})
module.exports = router;

</code>