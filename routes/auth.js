const { OAuth2Client } = require('google-auth-library');
const router = require('express').Router();

const client = new OAuth2Client(process.env.CLIENT_ID);

router.route('/google').post((req,res) => {
    const { token } = req.body
    client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    })
    .then(ticket => {
        const { name, email, picture } = ticket.getPayload();
        const user = {
            name,
            email,
            photoURL: picture
        };
        res.status(201);
        res.json(user);
    })
    .catch(err => {
        res.status(400);
        res.json('Error: ' + err);
    });
});

module.exports = router;