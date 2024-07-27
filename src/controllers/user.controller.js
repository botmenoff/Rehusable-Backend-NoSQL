const User = require('../models/user.model');
const userService = require('../services/user.services')

// GETALL
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Register
const register = async (req, res) => {
    try {
        // Verificar que el usuario y el email no estan ya registrados
        const user = req.body;

        // Username
        console.log(user);
        const existingUser = await User.findOne({ userName: user.userName });
        if (existingUser) {
            res.status(400).json({ Error: "This userName has allready been registred" });
        }

        // Email
        const existingEmail = await User.findOne({ email: user.email });
        if (existingUser) {
            res.status(400).json({ Error: "This email has allready been registred" });
        }

        // Hashear password
        const hashedPassword = userService.hashString(user.password)
        // Insertar usuario
        const insertedUser = await User.create({userName: user.userName, email: user.email, password: hashedPassword, isBanned: false, verifiedEmail: false, isAdmin: false})

        // Enviar email de verificacion
        // verificationEmail()

        // Respuesta
        res.status(201).json({
            user: {
                userName: user.userName,
                email: user.email
            }
        })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const verificationEmail = async (req, res, next) => {
    try {
        // Endpoint URL
        const endpointUrl = 'http://127.0.0.1:3000/api/user/verify/';

        // Payload
        const tokenPayload = {
            email: req.body.email
        }
        // Generar un json web token
        const token = jwt.sign(tokenPayload, process.env.SECRET_KEY, { expiresIn: '24h' })
        // Generar la ruta a la que tiene que llegar con el token
        const verificationUrl = `${endpointUrl}${token}`;

        // Enviar email
        // Import the transporter object
        const { transporter } = require('../services/Services.js');
        async function main() {
            // send mail with defined transport object
            const info = await transporter.sendMail({
                from: 'diamondbet@zohomail.eu',
                to: req.body.email,
                subject: "Verification Email",
                html: `
            <p>Clica el boton para verificar tu cuenta </p>
            <a href="${verificationUrl}" target="_blank">
                <button style="padding: 10px; background-color: #4CAF50; color: white; border: none; border-radius: 5px;">
                    Verifica tu Email
                </button>
            </a>
        `,
            });

            console.log("Message sent: %s", info.messageId);
        }

        await main();
        next();
    } catch (error) {
        console.error("Error sending verification email:", error);
        res.status(500).json({ 'Unexpected Error:': error.message });
    }
}

module.exports = {
    getAllUsers,
    register
};
