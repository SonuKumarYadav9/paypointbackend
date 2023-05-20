// const axios  = require("axios");

// const operatorFetch = async (req, res) => {
//     try {
//       const mobile = req.query.mobile

//       const response = await axios.get(`http://planapi.in/api/Mobile/OperatorFetchNew?ApiUserID=4894&ApiPassword=Sk957079@&Mobileno=${mobile}`);

//       console.log(response)

//       if (response.ERROR === '0' && response.STATUS === '1') {
//         // console.log(response)
//         const operatorData = {
//           mobile: response.Mobile,
//           operator: response.Operator,
//           opCode: response.OpCode,
//           circle: response.Circle,
//           circleCode: response.CircleCode
//         };
//         return res.status(200).send({ status: true, data: operatorData });
//       } else {
//         return res.status(404).send({ status: false, msg: "Operator not fetched or Something Error" });
//       }
//     } catch (error) {
//       console.log(error);
//       return res.status(500).send({ status: false, msg: error.message });
//     }
//   }

//   module.exports = { operatorFetch };

const fetch = require("node-fetch");

const operatorFetch = async (req, res) => {
  try {
    const mobile = req.query.mobile; // taking mobile no from query

    const response = await fetch(
      `http://planapi.in/api/Mobile/OperatorFetchNew?ApiUserID=4894&ApiPassword=Sk957079@&Mobileno=${mobile}`
    );
    const responseData = await response.json();

    if (responseData.ERROR === "0" && responseData.STATUS === "1") {
      const operatorData = {
        mobile: responseData.Mobile,
        operator: responseData.Operator,
        opCode: responseData.OpCode,
        circle: responseData.Circle,
        circleCode: responseData.CircleCode,
      };
      return res.status(200).send({ status: true, data: operatorData });
    } else {
      return res
        .status(404)
        .send({
          status: false,
          msg: "Operator not fetched or Something Error",
        });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, msg: error.message });
  }
};

module.exports = { operatorFetch };
