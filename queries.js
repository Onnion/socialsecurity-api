var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
const cn = {
  host: 'ec2-23-21-189-181.compute-1.amazonaws.com', // 'localhost' is the default;
  port: 5432, // 5432 is the default;
  database: 'db32m348ed6gsi',
  user: 'lfkmdwrycxmxrs',
  password: '54c776c77f59fb4a8e86e2fec893078b0a8f8843a7dd27580475d4fcb454dc1d'
};
var connectionString = 'postgres://lfkmdwrycxmxrs:54c776c77f59fb4a8e86e2fec893078b0a8f8843a7dd27580475d4fcb454dc1d@ec2-23-21-189-181.compute-1.amazonaws.com:5432/db32m348ed6gsi?ssl=true';
var db = pgp(connectionString);

// add query functions
function getAllUsers(req, res, next) {
  db.any('select * from usuarios')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL users'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleUser(req, res, next) {
  var codigoUsuario = parseInt(req.params.codigo_usuario);
  db.one('select * from usuarios where codigo_usuario = $1', codigoUsuario)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE user'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createUser(req, res, next) {
  req.body.codigo_usuario = parseInt(req.body.codigo_usuario);
  db.none('insert into usuarios(codigo_usuario, nome_usuario, email_usuario, senha_usuario, sexo)' +
      'values(${codigo_usuario}, ${nome_usuario}, ${email_usuario}, ${senha_usuario}, ${sexo})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one user'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

/* Login queries functions */

function verifyLogin(req, res, next) {
  db.one('select * from usuarios where email_usuario = $1 and senha_usuario = $2',[req.params.email_usuario, req.params.senha_usuario])
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved ONE login'
          });
      })
      .catch(function (err) {
        return next(err);
      });
}

/*
function updatePuppy(req, res, next) {
  db.none('update pups set name=$1, breed=$2, age=$3, sex=$4 where id=$5',
    [req.body.name, req.body.breed, parseInt(req.body.age),
      req.body.sex, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated puppy'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removePuppy(req, res, next) {
  var pupID = parseInt(req.params.id);
  db.result('delete from pups where id = $1', pupID)
    .then(function (result) {
      // jshint ignore:start
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} puppy`
        });
      // jshint ignore:end
    })
    .catch(function (err) {
      return next(err);
    });
}
*/


/* Ocurrences queries functions*/

function getAllOcurrences(req, res, next) {
  db.any('select * from ocorrencias')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL ocurrences'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleOcurrence(req, res, next) {
  var codigoOcorrencia = parseInt(req.params.codigo_ocorrencia);
  db.one('select * from ocorrencias where codigo_ocorrencia = $1', codigoOcorrencia)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE ocurrence'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getOcurrencePerTypes(req, res, next) {
  var codigoOcorrenciaType = parseInt(req.params.codigo_tipo_ocorrencia);
  db.one('select * from ocorrencias where codigo_tipo_ocorrencia = $1', codigoOcorrenciaType)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved PER ocurrence type'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createOcurrence(req, res, next) {
  req.body.codigo_ocorrencia = parseInt(req.body.codigo_ocorrencia);
  db.none('insert into ocorrencias(codigo_ocorrencia, codigo_usuario, codigo_tipo_ocorrencia, titulo_ocorrencia, endereco_ocorrencia, posicao_ocorrencia, data_ocorrencia, hora_ocorrencia, boletim_ocorrencia)' +
    'values(${codigo_ocorrencia}, ${codigo_usuario}, ${codigo_tipo_ocorrencia}, ${titulo_ocorrencia}, ${endereco_ocorrencia}, ${posicao_ocorrencia}, ${data_ocorrencia}, ${hora_ocorrencia}, ${boletim_ocorrencia})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one ocurrence'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

/*Ocurrence Types queries functions*/

function getAllOcurrenceTypes(req, res, next) {
  db.any('select * from tipos_ocorrencias')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL ocurrence types'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleOcurrenceType(req, res, next) {
  var codigoTipoOcorrencia = parseInt(req.params.codigo_tipo_ocorrencia);
  db.one('select * from tipos_ocorrencias where codigo_tipo_ocorrencia = $1', codigoTipoOcorrencia)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE ocurrence type'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createOcurrenceType(req, res, next) {
  req.body.codigo_tipo_ocorrencia = parseInt(req.body.codigo_tipo_ocorrencia);
  db.none('insert into tipos_ocorrencias(codigo_tipo_ocorrencia, descricao_ocorrencia)' +
    'values(${codigo_tipo_ocorrencia}, ${descricao_ocorrencia})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one ocurrence type'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  getAllUsers: getAllUsers,
  getSingleUser: getSingleUser,
  createUser: createUser,

  verifyLogin: verifyLogin,

  getAllOcurrences: getAllOcurrences,
  getSingleOcurrence: getSingleOcurrence,
  getOcurrencePerTypes: getOcurrencePerTypes, 
  createOcurrence: createOcurrence,

  getAllOcurrenceTypes: getAllOcurrenceTypes,
  getSingleOcurrenceType: getSingleOcurrenceType,
  createOcurrenceType: createOcurrenceType,
};
