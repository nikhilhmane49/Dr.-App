const userModel = require('../module/UserModel');
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2;
const jwt = require('jsonwebtoken');
require('dotenv').config();


const validator =require('validator');

//##api for regester

const regester= async (req,res)=>{



    try {

        const{name,email,password}=req.body;


        if(!name||!email||!password){
            return res.json({
                success:false,
                Message:"fille all the detail"
            })
        }
        
        //email validactor
        
        if (!validator.isEmail(email)) {
            return res.json({
                success:false,
                message:"Please provide a valid email"
            })
        }
        //password validation
        
        if(!validator.isLength(password,{min:8})){
            return res.json({
                success:false,
                message:"Password must be at least 8 characters long"
            })
        }
        
        
        //hashing the password
        
        const salt= await bcrypt.genSalt(10);
        
        const hashpassword = await bcrypt.hash(password,salt);
        
        
        const data ={
        
            name,
            email,
            password:hashpassword,
        }
        
        const usermodel = new userModel (data);
        
        const user= await usermodel.save();
        
        
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET);

        if(token){
        res.status(200).json({
            success: true,
            token: token,
            message: "User regester successful"
        })
    }

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }



}




//###api for login

const userlogin = async(req,res)=>{



try {
  
    const {email,password}=req.body;

    const user = await userModel.findOne({email});

    if(!user){
       return res.json({
            success:false,
            message:"user does not extist"
        })
    }
    
    const ismacth= await bcrypt.compare(password,user.password);

    if(ismacth){

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET);

        res.json({
success:true,
token,

        })
    }

    else{
        res.json({
            success:false,
            message:"The input is worng"
        })
    }

} catch (error) {
    console.log(error);
    return res.status(500).json({
        success: false,
        message: "Internal server error"
    })
}

}



//####Api for profile getting


const getprofile= async(req,res)=>{

    try {
        
const {userid}=req.body;

const userdata = await userModel.findById(userid).select('-password');;

res.json({
    success:true,
    data:userdata,
    message:"The user profile is fetch properly"
})


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })  
    }
}




//######Api for update the profile


const updateprofile = async (req, res) => {
    try {
        const { userid, name, address, dob, phone } = req.body;
        const imagefile = req.file;

        if (!userid || !name || !dob || !phone) {
            return res.status(400).json({
                success: false,
                message: "data is missing"
            });
        }

        let imageurl;
        if (imagefile) {
            const imageupload = await cloudinary.uploader.upload(imagefile.path, { resource_type: "image" });
            imageurl = imageupload.secure_url;
        }

        let parsedAddress;
        try {
            parsedAddress = JSON.parse(address);
        } catch (e) {
            return res.status(400).json({
                success: false,
                message: "Invalid address format"
            });
        }

        const updatedata = await userModel.findByIdAndUpdate(
            userid,
            {
                image: imageurl,
                name,
                address: parsedAddress,
                dob,
                phone,
            },
            { new: true }
        );

        if (!updatedata) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            data: updatedata,
            message: "The user profile is updated"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

module.exports={regester,userlogin,getprofile,updateprofile}