import { Router } from 'express';
import User from "@model/User";
import path from 'path';

import profileController from '@controllers/v1/profile.controller';

const profileRouter = new Router();

profileRouter.post('/updateProfile', profileController.updateProfile);

const multer = require("multer");
// const gm = require("gm").subClass({
//     imageMagick: true
// });
// const uploadPath = path.join(__dirname, '/../../public/uploads');

var storage = multer.diskStorage({
    destination: (req, file, callback) => {
      var type = file.mimetype;
      var typeArray = type.split("/");
  
      if (typeArray[0] == "image" && file.fieldname == "profileImg") {
        callback(null, uploadFolder + "/profileImg");
      }
    },
    filename: (req, file, callback) => {
      var newName = Date.now() + "_" + file.originalname;

      // if (file.fieldname == "profileImg") {
      //   var oldPath = uploadPath + "/garbage/profileImg/" + newName;
      //   var newPath = uploadPath + "/profileImg/" + newName;

      //   gm(oldPath)
      //   .resize(240, 240)
      //   .noProfile()
      //   .write(newPath, function (err) {
      //     if (!err) console.log("done");
      //     else console.log(err);
      //   });

      // }
  
      callback(null, newName);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
      var type = file.mimetype;
      var typeArray = type.split("/");

      if (typeArray[0] == "image" && file.fieldname == "profileImg") {
        callback(null, true);
      } 
      else {
        callback(null, false);
      }
    }
}).fields([{
      name: "profileImg"
    }
]);

profileRouter.post('/profileImageUpdate', upload, async (req, res) => {
  
    if (req.session.userId) {
      
      if (req.files.profileImg){
        if (!req.files["profileImg"][0].originalname.match(/\.(jpg|jpeg|png|gif)$/)){
          res.send({
            status: false,
            msg: 'Only jpg/jpeg/png/gif are allowed'
          });
        }
        else{
          var update = {
            userPhoto: 'profileImg/'+ req.files["profileImg"][0].filename
          };

          User.findOneAndUpdate(
            {_id:req.session.userId},
            update, { new:true },(err, result) => {
              if (!err && result) {
                res.send({
                  status: true
                });
              }
              else{
                res.send({
                  status: false,
                  msg:'Image Upload Failed.'
                });
              }
            }
          );
        }
      } 
    }
    else{
      res.send({
        status: false,
        msg:'User not found.'
      });
    }
});


export default profileRouter;