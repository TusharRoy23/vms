import Category from "@model/Category";

const createCategory = async (req, res) => {
    const { categoryName, status } = req.body;
    const create = await Category.create({
        categoryName: categoryName,
        status: status
    });

    return res.status(201).json(create);
};

const getCategoryList = async (req, res) => {
    const categoryList = await Category.find();
    return res.status(201).json(categoryList);
};

const updateStatus = async (req, res) => {
    let status = 0;
    if (!req.body.status) {
        status = 1;
    }
    const update = {
        status: status
    };
    const category = await Category.findOneAndUpdate(
        {_id:req.body.id}, update, { new: true}
    );

    res.status(201).json(category);
};

const updateCategory = async (req, res) => {
    if (req.session.userId) {
        console.log(req.body);
        const update = {
            categoryName: req.body.categoryName
        };

        const category = await Category.findOneAndUpdate(
            {_id:req.body.id}, update, { new: true }
        );

        res.status(201).json(category);
    }
};

const deleteCategory = async (req, res) => {
    if (req.session.userId) {
        const deleted = await Category.deleteOne(
            {_id:req.body.id}
        );
        
        return res.status(201).json(deleted);
    }
    else{
        return res.status(201).json(0);
    }
};

export default {
    createCategory,
    getCategoryList,
    updateCategory,
    deleteCategory,
    updateStatus
};
