const adminModel = require("../models/adminModel");
const userModel = require("../models/userModel")
const jwt =require("jsonwebtoken")


// const midForAdmin = async (req, res, next) => {
//   try {
//     const { authorization } = req.headers;

//     if (authorization && authorization.startsWith("Bearer")) {
//       let token = authorization.split(" ")[1];
//       const { userID } = jwt.verify(token, process.env.SECRET_KEY);
//       req.user = await adminModel.findById(userID).select("--password");
//       // req.userId =req.user._id.toString()   // Storin userId to access in controller by next() function it will pass the data
//      console.log(req.user)
//      console.log(req.user.role)
//       next();
//     } else {
//       return res.status(401).send({ msg: "Unauthorised user Or Token is missing" })
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({ msg: error.message })
//   }
// };
// const midForUsers = async (req, res, next) => {
//   try {
//     const { authorization } = req.headers;

//     if (authorization && authorization.startsWith("Bearer")) {
//       let token = authorization.split(" ")[1];
//       const { userID } = jwt.verify(token, process.env.SECRET_KEY);
//       req.user = await userModel.findById(userID).select("--password");
//       // req.userId =req.user._id.toString()   // Storin userId to access in controller by next() function it will pass the data
//      console.log(req.user)
//      console.log(req.user.role)
//       next();
//     } else {
//       return res.status(401).send({ msg: "Unauthorised user Or Token is missing" })
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({ msg: error.message })
//   }
// };

const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (authorization && authorization.startsWith("Bearer")) {
      let token = authorization.split(" ")[1];
      const { userID } = jwt.verify(token, process.env.SECRET_KEY);

      const admin = await adminModel.findById(userID).select("--password");
      const user = await userModel.findById(userID).select("--password");

      if (admin) {
        req.user = admin;
        console.log(req.user)
        console.log(req.user.role)
        next();
      } else if (user) {
        req.user = user;
        console.log(req.user)
        console.log(req.user.role)
        next();
      } else {
        return res.status(401).send({ msg: "Unauthorised user Or Token is missing" });
      }
    } else {
      return res.status(401).send({ msg: "Unauthorised user Or Token is missing" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: error.message });
  }
};

//* This middleware to check if ther Admin is there or not who is going to perform this action 

// const midForUsers = async (req, res, next) => {
//   try {
//     const { authorization } = req.headers;

//     if (authorization && authorization.startsWith("Bearer")) {
//       let token = authorization.split(" ")[1];
//       const { userID } = jwt.verify(token, process.env.SECRET_KEY);
//       const user = await userModel.findById(userID).select("--password");

//       if (!user) {
//         return res.status(401).send({ msg: "User not found" });
//       }

//       if (req.baseUrl === "/register/retailer" && user.role !== "admin" && user.role !== "distributor" && user.role !== "master") {
//         return res.status(401).send({ msg: "Unauthorized" });
//       }

//       if (req.baseUrl === "/register/distributor" && user.role !== "master") {
//         return res.status(401).send({ msg: "Unauthorized" });
//       }

//       if (req.baseUrl === "/register/master" && user.role !== "superadmin") {
//         return res.status(401).send({ msg: "Unauthorized" });
//       }

//       req.user = user;
//       next();
//     } else {
//       return res.status(401).send({ msg: "Unauthorised user Or Token is missing" });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({ msg: error.message });
//   }
// };



const isUser = (roles) => {
  return (req, res, next) => {

    if (!roles.includes(req.user.role)) {  // here taking user from middleware ny NEXT() function of it 
      return res.status(403).send({status:false,msg:"Only ADMIN can do this operation"});
    }
    next();
  };
};



  module.exports ={isUser,authMiddleware}
