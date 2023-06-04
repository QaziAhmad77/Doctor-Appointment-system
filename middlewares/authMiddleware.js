const JWT = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res
        .status(200)
        .send({ message: 'Authorization Header is required', success: false });
    } else {
      const decoded = JWT.verify(token, process.env.JWT_SECRET);
      req.body.userId = decoded.id;
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      mesage: 'Auth Failed error',
      success: false,
    });
  }
};
