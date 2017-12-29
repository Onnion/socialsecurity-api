const promise = require('bluebird');
const googleMaps = require("./google-maps-utils");

var options = {
  // Initialization Options
  promiseLib: promise
};

const pgp = require('pg-promise')(options);
const connectionString = 'postgres://lfkmdwrycxmxrs:54c776c77f59fb4a8e86e2fec893078b0a8f8843a7dd27580475d4fcb454dc1d@ec2-23-21-189-181.compute-1.amazonaws.com:5432/db32m348ed6gsi?ssl=true';
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
      res.status(500)
      .json({
        status: 'error',
        data: {},        
        message: 'Usuáro não cadastrado'
      });
    });
}

function createUser(req, res, next) {
  db.none('insert into usuarios(nome_usuario, email_usuario, senha_usuario, sexo)' +
      'values(${nome_usuario}, ${email_usuario}, ${senha_usuario}, ${sexo})',
    req.body)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: {},
          message: 'Inserted one user'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

/* Login queries functions */

function verifyUser(req, res, next) {
  let json = JSON.parse(req.params.userJSON);
  let email_usuario = json.email_usuario;
  let senha_usuario = json.senha_usuario;
  db.one('select codigo_usuario from usuarios where email_usuario = $1 and senha_usuario = $2',[email_usuario, senha_usuario])
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Usuário c adastrado'
          });
      })
      .catch(function (err) {
        res.status(500)
        .json({
          status: 'error',
          data: {},
          message: 'Usuário não cadastrado'
        });
      });
}

/* Update User */
function updateUser(req, res, next) {
  let codigo_usuario = parseInt(req.params.codigo_usuario);
  let user = req.body;
  let url = "update usuarios set nome_usuario = \'" + user.nome_usuario + "\', email_usuario = \'" + user.email_usuario + "\', senha_usuario = \'" + user.senha_usuario +"\' where codigo_usuario = \'" + codigo_usuario + "\'";
  db.none(url)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: {},
          message: 'Dados atualizados com sucesso'
        });
    })
    .catch(function (err) {
      return {
        status: 'error',
        data: {},
        message: 'Alteração não efetuada'
      };
    });
}

function login(req, res, next) {
  let cod_usuario = parseInt(req.body.cod_usuario);
  let device = req.params.device;
  let url ="update logs set cod_usuario = "+cod_usuario+", status_log = \'logged\' where cod_device = \'"+device+"\' and status_log = \'not_logged\'";
  db.none(url)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: {},          
          message: 'logado'
        });
    })
    .catch(function (err) {
      return {
        status: 'error',
        data: {},        
        message: 'login não efetuado'
      };
    });
}

function logout(req, res, next) {
  let device = req.params.device.toString();
  let url = "update logs set cod_usuario = 1, status_log = \'not_logged\' where cod_device = \'"+device+"\' and status_log = \'logged\'"
  db.none(url)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: {},                  
          message: 'deslogado'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function verifyDevice(req, res, next) {
  var device = req.params.device.toString();
  let url ="select * from logs where cod_device = \'"+device+"\'";
  db.one(url)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'device cadastrado'
        });
    })
    .catch(function (err) {
      res.status(500)
      .json({
        status: 'error',
        data: {},        
        message: 'device não cadastrado'
      });
    });
}

function verifyLogin(req, res, next) {
  let json = JSON.parse(req.params.user_deviceJSON);
  let cod_usuario = json.cod_usuario;
  let cod_device = json.cod_device;
  db.one('select status_log from logs where cod_device = $1 and cod_usuario = $2 and status_log = \'logged\'',[cod_device,cod_usuario])
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'usuario logado'
        });
    })
    .catch(function (err) {
      res.status(500)
      .json({
        status: 'error',
        message: 'usuario não logado'
      });
    });
}

function createDevice(req, res, next) {
  db.none('insert into logs(cod_device, cod_usuario, status_log)' +
      'values(${cod_device}, 1, \'not_logged\')',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          data: {},        
          message: 'Inserted device'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

/* Contact queries functions */

function getContact(req, res, next){
  var codigoUsuario = parseInt(req.params.cod_usuario);
  db.one('select * from contatos where cod_usuario = $1', codigoUsuario)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE contact'
        });
    })
    .catch(function (err) {
      res.status(500)
        .json({
          status: 'error',
          data: {},
          message: 'No contacts'
        });
    });
}

function createContact(req, res, next){
  db.none('insert into contatos(cod_usuario, nome_contato, numero_contato)' +
    'values(${cod_usuario}, ${nome_contato}, ${numero_contato})',
    req.body)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: {},
          message: 'Inserted one contact'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateContact(req, res, next){
  let cod_usuario = parseInt(req.params.cod_usuario);
  let contact = req.body;
  let url = "update contatos set nome_contato = \'" + contact.nome_contato + "\', numero_contato = \'" + contact.numero_contato + "\' where cod_usuario = \'" + cod_usuario + "\'";
  db.none(url)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: {},
          message: 'Dados atualizados com sucesso'
        });
    })
    .catch (function (err) {
      return {
        status: 'error',
        data: {},
        message: 'Alteração não efetuada'
      };
    });
  }



/* Ocurrences queries functions*/

function getAllOcurrences(req, res, next) {
  db.any('SELECT * FROM ocorrencias as o JOIN tipos_ocorrencias as toc ON o.codigo_tipo_ocorrencia = toc.codigo_tipo_ocorrencia')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: googleMaps.export(data),
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
  db.any('select * from ocorrencias where codigo_tipo_ocorrencia = $1', codigoOcorrenciaType)
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
  db.none('insert into ocorrencias(codigo_usuario, codigo_tipo_ocorrencia, titulo_ocorrencia, endereco_ocorrencia, posicao_ocorrencia, data_ocorrencia, hora_ocorrencia, boletim_ocorrencia)' +
    'values(${codigo_usuario}, ${codigo_tipo_ocorrencia}, ${titulo_ocorrencia}, ${endereco_ocorrencia}, ${posicao_ocorrencia}, ${data_ocorrencia}, ${hora_ocorrencia}, ${boletim_ocorrencia})',
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
  db.none('insert into tipos_ocorrencias(descricao_ocorrencia)' +
    'values(${descricao_ocorrencia})',
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
  getAllUsers:            getAllUsers,
  getSingleUser:          getSingleUser,
  createUser:             createUser,
  updateUser:             updateUser,

  verifyUser:             verifyUser,
  verifyDevice:           verifyDevice,
  createDevice:           createDevice,
  login:                  login,
  logout:                 logout,
  verifyLogin:            verifyLogin,

  getContact:             getContact,
  createContact:          createContact,
  updateContact:          updateContact,

  getAllOcurrences:       getAllOcurrences,
  getSingleOcurrence:     getSingleOcurrence,
  getOcurrencePerTypes:   getOcurrencePerTypes, 
  createOcurrence:        createOcurrence,

  getAllOcurrenceTypes:   getAllOcurrenceTypes,
  getSingleOcurrenceType: getSingleOcurrenceType,
  createOcurrenceType:    createOcurrenceType,
};
