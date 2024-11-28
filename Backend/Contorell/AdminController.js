
const validator = require("validator");
const bcrypt = require("bcrypt");
const cloudinary = require('cloudinary').v2;
const DoctorModel = require("../module/DocterModel.js");
const AppointmentModel = require("../module/AppointmentModel.js");

const jwt = require('jsonwebtoken');
const adminModel = require("../module/AdminModel.js");
require('dotenv').config();






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
        let imageurl;
        try {
            const imageupload = await cloudinary.uploader.upload(imagefile.path, { resource_type: "image" });
            imageurl = imageupload.secure_url;
        } catch (uploadError) {
            console.error("Cloudinary upload error:", uploadError);
            return res.status(500).json({ success: false, message: "Image upload failed" });
        }
        

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

    
    try {
  
    const {email,password}=req.body;

    const admin = await adminModel.findOne({email});

    if(!admin){
       return res.json({
            success:false,
            message:"user does not extist"
        })
    }
    
    const ismacth= await bcrypt.compare(password,admin.password);

    if(ismacth){

            const token = jwt.sign(email + password, process.env.JWT_SECRET);

            console.log(token);
            console.log(process.env.ADMIN_EMAIL);
            
            
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





//##api for regester

const adminregester= async (req,res)=>{



    try {

        const{email,password}=req.body;


        if(!email||!password){
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
        
        if(!validator.isLength(password,{min:3})){
            return res.json({
                success:false,
                message:"Password must be at least 8 characters long"
            })
        }
        
        
        //hashing the password
        
        const salt= await bcrypt.genSalt(10);
        
        const hashpassword = await bcrypt.hash(password,salt);
        
        
        const data ={
            email,
            password:hashpassword,
        }
        
        const adminmodel = new adminModel(data)
        
        const user= await adminmodel.save();
        
        
        // const token = jwt.sign({id:user._id},process.env.JWT_SECRET);

        // if(token){
        // res.status(200).json({
        //     success: true,
        //     token: token,
        //     message: "User regester successful"
        // })
    //}

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }



}













//######Get-all the doctors 

const getalldoctor = async(req,res)=>{
    try {
    
        const doctors = await DoctorModel.find({}).select('-password');
        
     
        if(doctors && doctors.length > 0){
            res.status(200).json({
                success: true,
                data: doctors,
                message: "Doctors fetched successfully"
            });
        } else {
            res.status(404).json({
                success: false,
                message: "No doctors found"
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}


//====================================================

const appointmentslist = async (req, res) => {

    try {
    
        const appointments = await AppointmentModel.find({});
        
      
        
        
        if(appointments && appointments.length > 0){
            res.status(200).json({
                success: true,
                data: appointments,
                message: "Appointments fetched successfully"
            });
        } else {
            res.status(404).json({
                success: false,
                message: "No appointments found for this doctor"
            });
        }
    
} catch (error) {
    console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
}
 }



module.exports = { addDoctor,adminLogin,getalldoctor,appointmentslist,adminregester}
