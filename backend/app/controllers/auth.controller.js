const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require("../models");
const Docentes = db.Docentes;
const Alumnos = db.Alumnos;
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
