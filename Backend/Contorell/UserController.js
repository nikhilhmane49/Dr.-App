const userModel = require('../module/UserModel');
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2;
const jwt = require('jsonwebtoken');
require('dotenv').config();


const validator =require('validator');
const doctorModel = require('../module/DocterModel');
const AppointmentModel = require('../module/AppointmentModel');

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




//######booked appointments #####

const bookappointment = async (req, res) => { 

    try {
        
        const { DocId, userid, slotDate, slotTime } = req.body;

        console.log({ DocId, userid, slotDate, slotTime } );
        


        if (!userid || !DocId || !slotDate || !slotTime) {
    return res.status(400).json({
        success: false,
        message: "Missing required fields"
    });
}

        
        const docdata = await doctorModel.findById(DocId).select("-password");
        
        if (!docdata.available) {
            return res.status(400).json({
                success: false,
                message: "Doctor is not available for this time"
            });
        }


        let slots_booked = docdata.slots_booked;

        //check for thr slots availablity

        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({
                    success: false,
                    message: "Slot is already booked"
                })
            } else {
                slots_booked[slotDate].push(slotTime);
            }
        } else {
            slots_booked[slotDate] = [];
            slots_booked[slotDate].push(slotTime);
        }

        const userdata = await userModel.findById(userid).select('-password');

        delete docdata.slots_booked;



        const appointmentdata = {
            DocId,
            userid,
            docData:docdata,
            userData:userdata,
            amount: docdata.fees,
            slotDate,
            slotTime,
            Date: new Date(),
        }

        const newAppointment = new AppointmentModel(appointmentdata);

        await newAppointment.save();

        //update the dr data of slots_book
        
        await doctorModel.findByIdAndUpdate(DocId, { slots_booked });

        res.json({
            success: true,
            message: "Appointment booked successfully"
        })


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}




const appointmentslist = async (req, res) => {


    try {
            const { userid } = req.body;

        const data = await AppointmentModel.find({ userid: userid});

        res.json({
            success: true,
            data,
            message: "Appointments list fetched successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
;


}
 



//=======================================================

//cancel appointments


const cancelappointment = async (req, res) => { 

    try {
        
        const { appointmentid , userid } = req.body;

        const appointmentdata = await AppointmentModel.findById(appointmentid);

        if (appointmentdata.userid !== userid) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access"
            });
        }

        await AppointmentModel.findByIdAndUpdate(appointmentid, { cancelled: true });

        //reasling the slots

       const {DocId,slotDate,slotTime} = appointmentdata

        const docdata = await doctorModel.findById(DocId);

        const slots_booked = docdata.slots_booked;

        slots_booked[slotDate] = slots_booked[slotDate].filter((time) => time !== slotTime);
        
        await doctorModel.findByIdAndUpdate(DocId, { slots_booked });

        res.json({
            success: true,
            message: "Appointment cancelled successfully"
        })


    } catch (error) {
        
    }
}

module.exports={regester,userlogin,getprofile,updateprofile,bookappointment,appointmentslist,cancelappointment}