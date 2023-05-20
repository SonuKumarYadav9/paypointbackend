

const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createMaster = async (req, res) => {
  try {
    let { name, email, password, role } = req.body;
    let parent_id;

    let user = await userModel.findOne({ email: email });
    if (user) {
      return res
        .status(400)
        .send({ status: false, msg: "This user is allready registered" });
    }

    if (role === "master") {
      if (req.user.role !== "admin") {
        return res.status(401).send({ status: false, msg: "Unauthorized" });
      }
      parent_id = req.user._id;
    } else {
      return res
        .status(400)
        .send({ status: false, msg: "only master creation is allowed" });
    }

    password = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name: name,
      password: password,
      email: email,
      role: role,
      parent_id: parent_id,
    });

    await newUser.save();
    return res
      .status(201)
      .send({ status: true, msg: "User Created Successfully", data: newUser });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, msg: error.message });
  }
};

const createDistributer = async (req, res) => {
  try {
    let { name, email, password, role } = req.body;
    let parent_id;

    let user = await userModel.findOne({ email: email });
    if (user) {
      return res
        .status(400)
        .send({ status: false, msg: "This user is allready registered" });
    }

    if (role === "distributer") {
      if (req.user.role === "admin" || req.user.role === "master") {
        parent_id = req.user._id;
      } else {
        return res.status(401).send({ status: false, msg: "Unauthorized" });
      }
    } else {
      return res.status(400).send({ status: false, msg: "Invalid Role" });
    }

    // if (role === "distributer") {
    //   if (req.user.role !== ("master" && "admin")){   //("master" && "admin"))
    //     return res
    //       .status(401)
    //       .send({ status: false, msg: "Unauthorized" });
    //   }else{
    //     parent_id = req.user._id;
    //   }

    // } else {
    //   return res
    //     .status(400)
    //     .send({ status: false, msg: "Invalid Role" });
    // }

    password = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name: name,
      password: password,
      email: email,
      role: role,
      parent_id: parent_id,
    });

    await newUser.save();
    return res
      .status(201)
      .send({ status: true, msg: "User Created Successfully", data: newUser });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, msg: error.message });
  }
};

const createRetailer = async (req, res) => {
  try {
    let { name, email, password, role } = req.body;
    let parent_id;

    let user = await userModel.findOne({ email: email });
    if (user) {
      return res
        .status(400)
        .send({ status: false, msg: "This user is allready registered" });
    }

    if (role === "retailer") {
      if (
        req.user.role === "admin" ||
        req.user.role === "distributer" ||
        req.user.role === "master"
      ) {
        parent_id = req.user._id;
      } else {
        return res.status(401).send({ status: false, msg: "Unauthorized" });
      }
    } else {
      return res.status(400).send({ status: false, msg: "Invalid Role" });
    }

    password = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name: name,
      password: password,
      email: email,
      role: role,
      parent_id: parent_id,
    });

    await newUser.save();
    return res
      .status(201)
      .send({ status: true, msg: "User Created Successfully", data: newUser });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, msg: error.message });
  }
};

//*USER LOGIN
const userLogin = async (req, res) => {
  try {
    let { email, password, role } = req.body;

    const user = await userModel.findOne({ email: email });
    console.log(user);

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    if (role === "distributer" || "master" || "reatiler") {
      role = role;
    } else {
      return res
        .status(400)
        .json({
          message: "Please Select One of them MASTER , DISTRIBUTER,RETAILER",
        });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    if (user.role === role) {
      let token = jwt.sign(
        {
          userID: user._id.toString(),
        },
        process.env.SECRET_KEY,
        { expiresIn: "2d" }
      );
      return res
        .status(200)
        .send({
          status: true,
          msg: "Login Success",
          token: token,
          userID: user._id,
          userType: user.role,
          name:user.name 
        });
    } else {
      return res
        .status(404)
        .send({ status: false, msg: "Please Provide User role " });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, msg: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    let userId = req.params.id;
    let user = await userModel.findById(userId).select("-password");
    if (!user) {
      return res.status(401).send({ status: false, msg: "User not found" });
    }

    if (user._id.toString() !== userId) {
      return res.status(401).send({ status: false, msg: "Unauthorized user" });
    }

    if (req.user._id.toString() !== userId) {
      return res.status(401).send({ status: false, msg: "User not found" });
    }

    console.log(req.user._id.toString());
    console.log(userId);

    if (["master", "distributer", "retailer"].includes(user.role)) {
      return res.status(200).send({ status: true, msg: "Success", data: user });
    } else {
      return res.status(401).send({
        status: false,
        msg: "User does not have the required role",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, msg: error.message });
  }
};

const getAllMaster = async (req, res) => {
  try {
    let masters = await userModel.find({ role: "master" });
    // console.log(masters)
    let parentId = req.user._id.toString();
    console.log(parentId);

    if (masters) {
      if (req.user.role !== "admin") {
        return res
          .status(400)
          .send({
            status: false,
            msg: "Your are not admin to do this operations",
          });
      }
    }
    let filteredMasters = masters.filter((master) => {
      return master.parent_id.toString() === parentId;
    });
    console.log(filteredMasters);
    return res
      .status(200)
      .send({ status: true, msg: "Success", data: filteredMasters });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, msg: error.message });
  }
};
const getAllDistributers = async (req, res) => {
  try {
    let distributers = await userModel.find({ role: "distributer" });
    console.log(distributers);
    console.log(req.user.role);
    if (distributers) {
      if (req.user.role !== "admin" || req.user.role !== "master") {
        return res
          .status(200)
          .send({ status: true, msg: "Success", data: distributers });
      }
    } else {
      return res
        .status(401)
        .send({
          status: false,
          msg: "Your are not admin to do this operations",
        });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, msg: error.message });
  }
};

const getAllRetailers = async (req, res) => {
  try {
    let distributers = await userModel.find({ role: "distributer" });
    console.log(distributers);
    console.log(req.user.role);
    if (distributers) {
      if (req.user.role !== "admin" || req.user.role !== "master") {
        return res
          .status(200)
          .send({ status: true, msg: "Success", data: distributers });
      }
    } else {
      return res
        .status(401)
        .send({
          status: false,
          msg: "Your are not admin to do this operations",
        });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, msg: error.message });
  }
};

module.exports = {
  createMaster,
  createDistributer,
  createRetailer,
  getUserById,
  userLogin,
  getAllMaster,
  getAllDistributers,
};
