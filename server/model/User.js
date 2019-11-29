import mongoose from 'mongoose';
import Bcrypt from 'bcryptjs';
// import randomString from 'randomstring';
// import Mail from '@fullstackjs/mail';
import config from '@config';
import jwt from 'jsonwebtoken';
// import PasswordReset from '@model/PasswordReset';

var UserSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true,
        trim: true
    },
    userEmail: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    userPassword: {
        type: String,
        required: true,
        trim: true
    },
    userRole: {
       type: Number,
       default: 0
       // required: true
    },
    userPermission: {
      type: String,
      trim: true
    },
    userPhoto: {
        type: String,
        trim: true
    },
    userLoginIP: {
        type: String,
        // required: true,
        trim: true
    },
    lastLogin: {
        type: Date
    },
    lastResetCode: {
        type: String
    },
    createdDate: {
        type: Date
    },
    status: {
        type: Number,
        default: 1 // 1 for active, 0 for in-active
    }
});

UserSchema.pre('save', function(){
    this.userPassword = Bcrypt.hashSync(this.userPassword);
    // this.emailConfirmCode = randomString.generate(72);
    this.createdDate = new Date();
});

// UserSchema.post('save', async function () {
//     await this.sendEmailConfirmation();
// });

UserSchema.methods.generateToken = function () {
    return jwt.sign({ id: this._id}, config.jwtSecret);
};

UserSchema.methods.comparePasswords = function(plainPassword) {
    return Bcrypt.compareSync(plainPassword, this.userPassword);
};

// UserSchema.methods.forgotPassword = async function () {
//     const token = randomString.generate(72);

//     await PasswordReset.create({
//         token,
//         email: this.email,
//         createdAt: new Date()
//     });
//     await new Mail('forgot-password')
//         .to(this.email, this.name)
//         .subject('Password Reset')
//         .data({
//             url: `${config.url}/auth/passwords/reset/${token}`,
//             name: this.name
//         })
//         .send()
// };

// UserSchema.methods.sendEmailConfirmation = async function () {
//     await new Mail('confirm-account')
//     .to(this.email, this.name)
//     .subject('Please confirm your account')
//     .data({
//         name: this.name,
//         url: `${config.url}/auth/emails/confirm/${this.emailConfirmCode}`
//     })
//     .send();
// };

export default mongoose.model('User', UserSchema);