const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require("../models");
const nodemailer = require('nodemailer');
const Docentes = db.Docentes;
const Alumnos = db.Alumnos;
const saltRounds = 10;
const secretKey = 'PIAVC-credenciales-usuarios';

exports.login = async (req, res) => {
    const { identificador, password } = req.body;
    let user = null;

    if (identificador.length == 10) {
        user = await Alumnos.findOne({ where: { boleta: identificador } });
    } else {
        user = await Docentes.findOne({ where: { noTrabajador: identificador } });
    }

    if (!user) {
        return res.status(404).send({ message: "Usuario no encontrado" });
    }

    let isPasswordValid = false;
    if (user.contraseña_Al) {
        isPasswordValid = await bcrypt.compare(password, user.contraseña_Al);
    } else if (user.contraseña_Do) {
        isPasswordValid = await bcrypt.compare(password, user.contraseña_Do);
    }

    if (!isPasswordValid) {
        return res.status(401).send({ accessToken: null, message: 'Contraseña incorrecta.' });
    }

    const id = user.noTrabajador || user.boleta;
    const role = user.noTrabajador ? 'docente' : 'alumno';

    const token = jwt.sign({ id, role }, secretKey, { expiresIn: '24h' });

    res.send({ token, id, role });
};

// Enviar enlace de restablecimiento de contraseña
exports.sendResetEmail = async (req, res) => {
    const correo = req.body.correo;
    const urlbase = req.body.urlbase;
    let alumno = true;
    let usuario = await Alumnos.findOne({ where: { correoRec_Al: correo } });

    if (!usuario) {
        usuario = await Docentes.findOne({ where: { correoRec_Do: correo } });
        if (!usuario) {
            return res.status(404).send({ message: "Correo no encontrado." });
        }
        alumno = false;
    }

    // Generar un token (puedes usar una biblioteca como `jsonwebtoken`)
    if (alumno) {
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
            subject: 'Restablecimiento de contraseña alumno',
            text: `Para restablecer tu contraseña, haz clic en el siguiente enlace: ${urlbase}:8081/login/restablecer-password/0/${token}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).send({ message: error.message });
            }
            res.send({ message: 'Correo enviado.' });
        });
    } else {
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
            subject: 'Restablecimiento de contraseña docente',
            text: `Para restablecer tu contraseña, haz clic en el siguiente enlace: ${urlbase}:8081/login/restablecer-password/1/${token}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).send({ message: error.message });
            }
            res.send({ message: 'Correo enviado.' });
        });
    }
};

// Manejar la actualización de la contraseña
exports.resetPassword = async (req, res) => {
    const { ident, token } = req.params;
    console.log('identificador', ident)

    console.log('token', token)
    let decoded;
    if(ident == 0){
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
    }else{
        try {
            decoded = jwt.verify(token, "tu_llave_secreta");
          } catch (error) {
            return res.status(400).send({ message: 'Token inválido o expirado.' });
          }
        
          const newPassword = req.body.newPassword;
          const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        
          Docentes.update({ contraseña_Do: hashedPassword }, { where: { noTrabajador: decoded.id } })
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
    }
};
