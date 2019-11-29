import User from "@model/User";



const updateProfile = async (req, res) => {

    const update = {
        'userEmail': req.body.email,
        'userName': req.body.username,
        // 'userPassword': req.body.password,
        // 'status': req.body.status,
        // 'userRole': req.body.userRole,
        // 'userPermission': JSON.stringify(req.body.permission)
    };

    const userId = req.session.userId;

    const updateUser = await User.findOneAndUpdate(
        { _id:userId }, update, { new:true }
    );

    return res.status(201).json(updateUser);
};




const updateProfileImage = async (req, res) => {
    if (req.session.userId) {
        console.log('images: ', req.session.userId);
        return res.json({
            status:false
        });
        // if (req.files["profileImg"]) {
        //     if (!req.files["profileImg"][0].originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        //         res.send(201).json({
        //             status: false,
        //             msg: 'Only jpg/jpeg/png/gif are allowed'
        //         });
        //     } else {
        //         var update = {
        //             userPhoto: req.files["profileImg"][0].filename
        //         }

        //         userModel.findOneAndUpdate(
        //             {_id:req.session.userId},
        //             update, {new:true},
        //             (err, result) => {
        //                 if (!err) {
        //                     res.send(201).json({
        //                         status: true,
        //                         msg: 'Image Uploaded'
        //                     });
        //                 }
        //                 else{
        //                     res.send(201).json({
        //                         status: false,
        //                         msg: 'Nothing Uploaded'
        //                     });
        //                 }
        //             }
        //         );
        //     }
        // }
        // else{
        //     res.send(201).json({
        //         status:false
        //     });
        // }
    }
};

export default {
    updateProfile,
    updateProfileImage
};