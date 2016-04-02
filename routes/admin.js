var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET users listing. */
router.get('/admin/forms', function(req, res) {
  var forms = fs.readdirSync("./public/forms");
  console.log(forms);
  res.render('admin', {
    forms: forms
  });
});

router.get('/admin/forms/:id', function(req, res) {
  var form = fs.readFileSync("./public/forms/"+req.params.id);
  if(form){
    form = form.toString();
    console.log(form);
    res.render('admin-form-edit', {
      formname: req.params.id,
      form: form
    });
  }else{
    res.send("~");
  }
});

router.post('/admin/forms/:id', function(req, res) {
  fs.writeFileSync("./public/forms/"+req.params.id,req.body.data);
  res.redirect("/admin/forms/"+req.params.id);
});

router.post('/admin/forms', function(req, res) {
  if(!fs.existsSync("./public/forms/"+req.body.name)){
    fs.writeFileSync("./public/forms/"+req.body.name,"");
    res.redirect("/admin/forms/"+req.body.name);
  }else{
    res.send("File exists")
  }
});


module.exports = router;
