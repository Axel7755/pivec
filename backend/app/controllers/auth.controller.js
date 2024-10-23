const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require("../models");
const Docentes = db.Docentes;
const Alumnos = db.Alumnos;
const secretKey = 'PIAVC-credenciales-usuarios';

exports.login = async (req, res) => {
    const { identificador, password } = req.body;

    // Inicializamos user como null
    let user = null;

    // Verificamos si es un alumno (boleta de longitud 10)
    if (identificador.length == 10) {
        user = await Alumnos.findOne({ where: { boleta: identificador } });
    } else {
        // Si no es alumno, asumimos que es un docente
        user = await Docentes.findOne({ where: { noTrabajador: identificador } });
    }

    // Si no se encuentra el usuario
    if (!user) {
        return res.status(404).send({ message: "Usuario no encontrado" });
    }

    // Verificamos la contraseña, diferenciando entre docente y alumno
    let isPasswordValid = false;
    if (user.contraseña_Al) {
        isPasswordValid = await bcrypt.compare(password, user.contraseña_Al); // Comparar con contraseña de alumno
    } else if (user.contraseña_Do) {
        isPasswordValid = await bcrypt.compare(password, user.contraseña_Do); // Comparar con contraseña de docente
    }

    if (!isPasswordValid) {
        return res.status(401).send({
            accessToken: null,
            message: 'Contraseña incorrecta.'
        });
    }

    // Generar el token
    const token = jwt.sign(
        { id: user.noTrabajador || user.boleta, role: user.noTrabajador ? 'docente' : 'alumno' },
        secretKey,
        { expiresIn: '24h' }
    );

    res.send({ token });
};