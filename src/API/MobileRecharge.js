const axios = require("axios");
const geoip = require("geoip-lite");

const MobilePlan = async (req, res) => {
  try {
    const { mobile, operator } = req.body;
    let apiUrl = "";

    switch (operator) {
      case "Airtel":
        apiUrl = `http://planapi.in/api/Mobile/RofferCheck?apimember_id=4894&api_password=Sk957079@&operator_code=2&mobile_no=${mobile}`;
        break;
      case "Vodafone":
        apiUrl = `http://planapi.in/api/Mobile/RofferCheck?apimember_id=4894&api_password=Sk957079@&operator_code=23&mobile_no=${mobile}`;
        break;
      case "Idea":
        apiUrl = `http://planapi.in/api/Mobile/RofferCheck?apimember_id=4894&api_password=Sk957079@&operator_code=6&mobile_no=${mobile}`;
        break;
      case "Jio":
        apiUrl = `http://planapi.in/api/Mobile/RofferCheck?apimember_id=4894&api_password=Sk957079@&operator_code=11&mobile_no=${mobile}`;
        break;
      case "BSNL":
        apiUrl = `http://planapi.in/api/Mobile/RofferCheck?apimember_id=4894&api_password=Sk957079@&operator_code=5&mobile_no=${mobile}`;
        break;
      default:
        return res.status(400).send({ status: false, msg: "Invalid operator" });
    }

    const planApi = await axios.get(apiUrl);
    console.log(planApi);

    return res.status(200).send({ status: true, data: planApi.data });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, msg: error.message });
  }
};

const recharge = async (req, res) => {
  const {
    UserID,
    Account,
    Amount,
    SPKey,
    ApiRequestID,
    CustomerNumber,
    Pincode,
    Format,
  } = req.query;

  const ip = "192.168.0.100";
  // or however you get the IP address

  const location = geoip.lookup(ip);
  console.log(location);
  if (location) {
    const latitude = location.ll[0];
    const longitude = location.ll[1];
    // do something with the latitude and longitude

    var GEOCode = `${latitude},${longitude}`;
  }
  //  else {
  //   // handle the case where the location is not found
  //   return res.status(404).send({status:false,msg:"Address not found"});
  // }
  // console.log(GEOCode);

  try {
    const apiResponse = await axios.get(
      "https://b2b.nkpays.in/API/TransactionAPI",
      {
        params: {
          UserID,
          Token: "2cd26db3da00a7e967fa3c3df7b94cdd",
          Account,
          Amount,
          SPKey,
          ApiRequestID,
          GEOCode,
          CustomerNumber,
          Pincode,
          Format,
        },
      }
    );

    // Return the response from the API to the client
    return res.status(200).json(apiResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { MobilePlan, recharge };
