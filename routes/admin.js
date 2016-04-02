var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET users listing. */
router.get('/admin/patients', function(req, res) {
  var patients = fs.readdirSync("./data/patients");
  console.log(patients);
  res.render('patients', {
    patients: patients
  });
});

router.get('/admin/patients/:id/raw', function(req, res) {
  var patient = fs.readFileSync("./data/patients/"+req.params.id);
  console.log(patient);
  res.send(patient.toString());
});

router.post('/admin/patients', function(req, res) {
  console.log(req.body.id);
  console.log(req.body.payload);
  console.log(req.body.form);
  var path = "data/patients/"+req.body.id+".json"
  var payload = req.body.payload.toString();
  console.log(payload.toString());
  console.log(path);
  fs.writeFile(path,payload,function(err){
    if(err) throw err;
    console.log("Saved");
    res.redirect("/editor/"+req.body.form+"/"+req.body.id);
  });
});
/*
router.get('/admin/patients/:id', function(req, res) {
  var patients = fs.readFileSync("./data/patients/"+req.params.id);
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
});*/

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


router.get("/admin/forceClonetest", function(req, res){
  var Git = require("nodegit");

  Git.Clone("https://github.com/terminal-velocity/patient-track-data.git", "patient-track-data").then(function(repository) {
    // Work with the repository object here.

  });
});

module.exports = router;
