const db = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const Alumnos = db.Alumnos;
const saltRounds = 10;

// Crear un nuevo alumno
exports.create = async (req, res) => {
    if (!req.body.boleta) {
        res.status(400).send({
            message: "El contenido no puede estar vacío!"
        });
        return;
    }
    const hashedPassword = await bcrypt.hash(req.body.contraseña_Al, saltRounds);
    const alumno = {
        boleta: req.body.boleta,
        nombres_Al: req.body.nombres_Al,
        apellidoP_Al: req.body.apellidoP_Al,
        apellidoM_Al: req.body.apellidoM_Al,
        contraseña_Al: hashedPassword,
        correoRec_Al: req.body.correoRec_Al
    };

    Alumnos.create(alumno)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear el alumno."
            });
        });
};

// Obtener todos los alumnos
exports.findAll = (req, res) => {
    Alumnos.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar los alumnos."
            });
        });
};

// Obtener un alumno por boleta
exports.findOne = (req, res) => {
    const boleta = req.params.id;

    Alumnos.findByPk(boleta)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró el alumno con la boleta ${boleta}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar el alumno."
            });
        });
};

// Enviar enlace de restablecimiento de contraseña
exports.sendResetEmail = async (req, res) => {
    const correo = req.body.correo;
    const urlbase = req.body.urlbase;
    const usuario = await Alumnos.findOne({ where: { correoRec_Al: correo } });
    
    if (!usuario) {
      return res.status(404).send({ message: "Correo no encontrado." });
    }
  
    // Generar un token (puedes usar una biblioteca como `jsonwebtoken`)
    const token = jwt.sign({ id: usuario.boleta }, "tu_llave_secreta", { expiresIn: '1h' });
  
    // Configurar y enviar el correo electrónico con el enlace de restablecimiento
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'piavcipn@gmail.com',
        pass: 'cduj muvh zwmc ucuw'
      }
    });
  
    const mailOptions = {
      from: 'piavcipn@gmail.com',
      to: correo,
      subject: 'Restablecimiento de contraseña',
      text: `Para restablecer tu contraseña, haz clic en el siguiente enlace: ${urlbase}:8081/login/resetPassword/0/${token}`
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send({ message: error.message });
      }
      res.send({ message: 'Correo enviado.' });
    });
};
  
// Manejar la actualización de la contraseña
exports.resetPassword = async (req, res) => {
    const token = req.params.token;
    let decoded;
  
    try {
      decoded = jwt.verify(token, "tu_llave_secreta");
    } catch (error) {
      return res.status(400).send({ message: 'Token inválido o expirado.' });
    }
  
    const newPassword = req.body.newPassword;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
  
    Alumnos.update({ contraseña_Al: hashedPassword }, { where: { boleta: decoded.id } })
      .then(num => {
        if (num == 1) {
          res.send({ message: "Contraseña actualizada exitosamente." });
        } else {
          res.send({ message: "No se pudo actualizar la contraseña." });
        }
      })
      .catch(err => {
        res.status(500).send({ message: err.message || "Ocurrió un error al actualizar la contraseña." });
      });
};

// Actualizar un alumno por boleta
exports.update = (req, res) => {
    const boleta = req.params.boleta;

    Alumnos.update(req.body, {
        where: { boleta: boleta }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El alumno fue actualizado exitosamente."
                });
            } else {
                res.send({
                    message: `No se pudo actualizar el alumno con la boleta ${boleta}. Quizás el alumno no fue encontrado o el cuerpo de la solicitud está vacío.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al actualizar el alumno."
            });
        });
};

// Eliminar un alumno por boleta
exports.delete = (req, res) => {
    const boleta = req.params.boleta;

    Alumnos.destroy({
        where: { boleta: boleta }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El alumno fue eliminado exitosamente."
                });
            } else {
                res.send({
                    message: `No se pudo eliminar el alumno con la boleta ${boleta}. Quizás el alumno no fue encontrado.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al eliminar el alumno."
            });
        });
};
