

const doctorModel=require('../module/DocterModel');


const changeavaliblity= async (req,res)=>{


    try {
        
const {doc_id}=req.body;



const docdata=await doctorModel.findById(doc_id);



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



const listdoctor=async(req,res)=>{

try {
    const data=await doctorModel.find({}).select(['-password','-email'])
res.status(200).json({
    success:true,
    data,
    message:"list of Doctor"
})

} catch (error) {
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"Internal server error"
    })
}




}


module.exports = { changeavaliblity , listdoctor}