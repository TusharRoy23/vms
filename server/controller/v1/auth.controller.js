import User from "@model/User";

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ userEmail:email });
    if (user) {
        if (user.comparePasswords(password)) {
            const token = user.generateToken();
            req.session.token = token;
            req.session.userId = user._id;

            return res.json({
                user, token
            });
        }
    }
    return res.status(400).json({
        email: 'Username/Password is incorrect !'
    });
};

const getUserInfo = async (req, res) => {
    if (req.session.userId) {
        const user = await User.findOne({_id:req.session.userId});
        if (user) {
            return res.json({
                user
            });
        }
    }
    return res.status(400).json({
        msg: 'User not found !'
    });
};

const logout = async (req, res) => {
    if (req.body.log_exp == '3227') {
        
        if (req.session.userId) {
            req.session.userId = null;
            req.session.token = null;

            return res.status(200);
        }
        return res.status(201);
    }
};

export default {
    getUserInfo,
    login,
    logout
};