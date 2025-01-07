const db = require("../models");
const bcrypt = require('bcrypt');
const Docentes = db.Docentes;

// Crear y guardar un nuevo Alumno
exports.create = async (req, res) => {
    // Validar la solicitud
    if (!req.body.noTrabajador) {
        res.status(400).send({
            message: "El contenido no puede estar vacío!"
        });
        return;
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.contraseña_Do, saltRounds);
    console.log(hashedPassword)
    // Crear un Alumno
    const docente = {
        noTrabajador: req.body.noTrabajador,
        nombres_Do: req.body.nombres_Do,
        apellidoP_Do: req.body.apellidoP_Do,
        apellidoM_Do: req.body.apellidoM_Do,
        contraseña_Do: hashedPassword,
        correoRec_Do: req.body.correoRec_Do
    };

    // Guardar Alumno en la base de datos
    Docentes.create(docente)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear el Alumno."
            });
        });
};

// Obtener todos los Alumnos
exports.findAll = (req, res) => {
    Docentes.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar los Alumnos."
            });
        });
};

// Obtener un Alumno por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Docentes.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se puede encontrar el Alumno con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al recuperar el Alumno con id=" + id
            });
        });
};

// Enviar enlace de restablecimiento de contraseña
exports.sendResetEmail = async (req, res) => {
    const correo = req.body.correo;
    const urlbase = req.body.urlbase;
    const usuario = await Docentes.findOne({ where: { correoRec_Do: correo } });
    
    if (!usuario) {
      return res.status(404).send({ message: "Correo no encontrado." });
    }
  
    // Generar un token (puedes usar una biblioteca como `jsonwebtoken`)
    const token = jwt.sign({ id: usuario.noTrabajador }, "tu_llave_secreta", { expiresIn: '1h' });
  
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
      text: `Para restablecer tu contraseña, haz clic en el siguiente enlace: ${urlbase}:8081/login/resetPassword/1/${token}`
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
  
    Docentes.update({ correoRec_Do: hashedPassword }, { where: { noTrabajador: decoded.id } })
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

// Actualizar un Alumno por id
exports.update = (req, res) => {
    const id = req.params.id;

    Docentes.update(req.body, {
        where: { noTrabajador: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El Alumno fue actualizado exitosamente."
                });
            } else {
                res.send({
                    message: `No se puede actualizar el Alumno con id=${id}. Tal vez el Alumno no fue encontrado o req.body está vacío!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar el Alumno con id=" + id
            });
        });
};

// Eliminar un Alumno por id
exports.delete = (req, res) => {
    const id = req.params.id;

    Docentes.destroy({
        where: { noTrabajador: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El Alumno fue eliminado exitosamente!"
                });
            } else {
                res.send({
                    message: `No se puede eliminar el Alumno con id=${id}. Tal vez el Alumno no fue encontrado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar el Alumno con id=" + id
            });
        });
};
