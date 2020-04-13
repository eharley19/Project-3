const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const verified = jwt.verify(req.body.token, process.env.JWT_KEY);
        req.userData = verified;
        next();
    } catch (err) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
   
}