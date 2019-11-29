import * as Yup from 'yup';

const LoginValidator = Yup.object().shape({
    username: Yup.string().email().required(),
    password: Yup.string().min(6).required()
});

export default (req, res, next) => {
    const { username, password } = req.body;
    LoginValidator.validate({ username, password })
    .then(() => next())
    .catch(error => res.status(422).json({
        [error.path]: error.message
    }));
};
