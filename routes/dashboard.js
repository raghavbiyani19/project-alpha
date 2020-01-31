var express = require('express');
var fs = require('fs');
var router = express.Router();
const adminUID = ["3btcfJeRxsa1HlFrpIXACWAJYrD2", "MYacLsqfhHa8wE8FWf5WhrUFajB2"];

function renderHTML(path, res) {
  fs.readFile(path, null, function (error, data) {
    res.writeHeader(200, { 'Content-Type': 'text/html' });
    res.write(data);
    res.end();
  })
}

function renderUnauthorizedAccess(path, res) {
  fs.readFile(path, null, function (error, data) {
    res.writeHeader(401, { 'Content-Type': 'text/html' });
    res.write(data);
    res.end();
  })
}

/* GET users listing. */
router.get('/', function (req, res, next) {
  const uid = req.query.accessId;
  //only admin@tnp.com has access to Admin Dashboard!!
  if (adminUID.includes(uid)) {
    renderHTML('./public/admin/dashboard.html', res);
  } else {
    renderHTML('./public/user/dashboard.html', res);
  }
});

router.get('/student', function (req, res, next) {
  const uid = req.query.accessId;
  if (adminUID.includes(uid)) {
    renderHTML('./public/admin/dashboard/studentSection.html', res);
  } else {
    renderUnauthorizedAccess('./public/unauthorizedAccess.html', res);
  }
});

router.get('/alumni', function (req, res, next) {
  const uid = req.query.accessId;
  if (adminUID.includes(uid)) {
    renderHTML('./public/admin/dashboard/alumniSection.html', res);
  } else {
    renderUnauthorizedAccess('./public/unauthorizedAccess.html', res);
  }
});

router.get('/company', function (req, res, next) {
  const uid = req.query.accessId;
  if (adminUID.includes(uid)) {
    renderHTML('./public/admin/dashboard/companySection.html', res);
  } else {
    renderUnauthorizedAccess('./public/unauthorizedAccess.html', res);
  }
});


module.exports = router;
