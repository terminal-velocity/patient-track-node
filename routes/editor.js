var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET users listing. */
router.get('/:form/:id', function(req, res) {
  var data = "";
  if(fs.existsSync("./data/patients/"+req.params.id+".json")){
    console.log("File found")
    data = fs.readFileSync("./data/patients/"+req.params.id+".json");
    data = data.toString().replace(/(?:\r\n|\r|\n)/g, '')
  }
  console.log(data);
  res.render('form', {
    formid: req.params.form,
    actualid: req.params.id,
    existingdata: data
  });
});

router.post('/:form/:id', function(req, res) {
  res.render('form', {
    formid: req.params.form,
    existingdata: req.params.id
  });
});

module.exports = router;
