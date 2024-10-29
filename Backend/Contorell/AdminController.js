
const validator = require("validator");
const bcrypt = require("bcrypt");
const cloudinary = require('cloudinary').v2;
const DoctorModel = require("../module/DocterModel.js");

const jwt = require('jsonwebtoken');








//#######API for adding Dr.########################

const addDoctor = async (req, res) => {
    try {
        
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        
        const imagefile = req.file;
        console.log({ name, email, password, speciality, degree, experience, about, fees, address },imagefile);

        //checking for all data to add doctor

        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !imagefile){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        //validating email
        
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

        //hashing password

        const salt = await bcrypt.genSalt(10);

        const hashedpassword = await bcrypt.hash(password, salt);  


        //uploading image to cloudinary

        const imageupload = await cloudinary.uploader.upload(imagefile.path, { resource_type: "image" });
        
        const imageurl = imageupload.secure_url;

        const doctorData = {
            name,
            email,
            image: imageurl,
            password: hashedpassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newdoctor = new DoctorModel(doctorData);
        await newdoctor.save();

        return res.status(200).json({
            success:true,
            message:"Doctor added successfully"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}



//API for admin login


const adminLogin = async (req, res) => {
    
    const { email, password } = req.body;

    try {
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

            const token = jwt.sign(email + password, process.env.JWT_SECRET);

            console.log(token);
            
            res.status(200).json({
                success: true,
                token: token,
                message: "Admin login successful"
            })

        }
        else {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
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





module.exports = { addDoctor,adminLogin }
