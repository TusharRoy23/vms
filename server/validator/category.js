import * as Yup from 'yup';

const CategoryValidator = Yup.object().shape({
    categoryName: Yup.string().min(2).required()
});

export default (req, res, next) => {
    const { categoryName } = req.body;
    
    CategoryValidator.validate({ categoryName })
    .then(() => next())
    .catch(error => res.status(422).json({
        [error.path]: error.message
    }));
};
