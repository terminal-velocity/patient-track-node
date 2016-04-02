var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:form/:id', function(req, res) {
  res.render('form', {
    formid: req.params.form,
    existingdata: req.params.id
  });
});



module.exports = router;
