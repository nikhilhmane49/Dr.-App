

const doctorModel=require('../module/DocterModel');


const changeavaliblity= async (req,res)=>{


    try {
        
const {doc_id}=req.body;

console.log("Received doc_id:", doc_id);  // Log doc_id

const docdata=await doctorModel.findById(doc_id);

console.log("Doctor data:", docdata);  // Log the doctor data

await doctorModel.findByIdAndUpdate(doc_id,{
    available:!docdata.available,
})

res.status(200).json({
    success:true,
    message:"Avalablelity is change"
})

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }


}

module.exports = { changeavaliblity}