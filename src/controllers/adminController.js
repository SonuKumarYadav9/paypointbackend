const adminModel = require("../models/adminModel");
const userModel= require("../models/userModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const createAdmin = async (req, res) => {
    try {
      let name = req.body.name;
      let password = req.body.password;
      let email = req.body.email;
      let role = req.body.role;
      let parent_id = null;
      
      password = await bcrypt.hash(password, 10);
  
      const newUser = new adminModel({
        name: name,
        password: password,
        email: email,
        role: role,
        parent_id: parent_id
      });
  
      await newUser.save();
      return res.status(201).send({ status: true, msg: "User Created Successfully", data: newUser });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ status: false, msg: error.message });
    }
  }

  const getAdmin = async(req,res)=>{
    try {
      let adminId = req.params.id
      let admin = await adminModel.findById({_id:adminId}).select({password:0})
      console.log(admin._id.toString())
      if(admin._id.toString() !== adminId){
        return res.status(401).send({status:false,msg:"UnAuthorised user"})
      }
      if(admin){
        if(admin.role ==="admin"){
          return res.status(200).send({status:true,msg:"Success",data:admin})
        }
      }
      
    } catch (error) {
      console.log(error);
      return res.status(500).send({ status: false, msg: error.message });
    }
  }
  


const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await adminModel.findOne({ email: email, role: "admin" });
    console.log(user)

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    
    if (user) {
      let token = jwt.sign(
        {
          userID: user._id.toString(),
        },
        process.env.SECRET_KEY,
        { expiresIn: "2d" }
      );
      return res
        .status(200)
        .send({ status: true,msg:"Login Success" ,token: token, userID: user._id ,userType:user.role,name:user.name });
    } else {
      return res
        .status(404)
        .send({ status: false, msg: "this user not Found " });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, msg: error.message });
  }
};

const getAllMasterByAdmin = async (req, res) => {
  try {
    let masters = await userModel.find({role:"master"})
    // console.log(masters)
        let parentId = req.user._id.toString();
    console.log(parentId);

       if(masters){
        if(req.user.role !== "admin"){
          return res.status(400).send({status:false,msg:"Your are not admin to do this operations"})
        }

       }
       let filteredMasters = masters.filter((master) => {
        return master.parent_id.toString() === parentId;
      });
      console.log(filteredMasters)
       return res
        .status(200)
        .send({ status: true, msg: "Success", data: filteredMasters });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, msg: error.message });
  }
};





const getAllDistributersByAdmin =  async (req,res)=>{
  try {
    let distributers = await userModel.find({role:"distributer"})
   console.log(distributers)
   console.log(req.user.role)
       if(distributers){
        if((req.user.role === "admin")){
          return res
          .status(200)
          .send({ status: true, msg: "Success", data: distributers });
        }else{
          return res.status(401).send({status:false,msg:"Your are not admin to do this operations"})
       }
       }else{
        return res.status(404).send({status:false,msg:"Distributers Not Found"})
       }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, msg: error.message });
  }
}

const getAllRetailersByAdmin =  async (req,res)=>{
  try {
    let retailers = await userModel.find({role:"retailer"})
   console.log(retailers)
   console.log(req.user.role)
   if(retailers){
    if((req.user.role === "admin")){
      return res
      .status(200)
      .send({ status: true, msg: "Success", data: retailers });
    }else{
      return res.status(401).send({status:false,msg:"Your are not admin to do this operations"})
   }
   }else{
    return res.status(404).send({status:false,msg:"retailers Not Found"})
   }
      
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, msg: error.message });
  }
}


module.exports = { createAdmin,adminLogin,getAdmin ,getAllMasterByAdmin,getAllRetailersByAdmin,getAllDistributersByAdmin};
