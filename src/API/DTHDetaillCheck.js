
const fetchDTHDetail = async (req, res) => {
    try {
        const {operator ,mobile_no } = req.query;

        const opCode = await codeModel.findOnd({operator})

        const apiResponse = await axios.get(
            "http://planapi.in/api/Mobile/DTHINFOCheck",
            {
                params: {
                    apimember_id:"4894", 
                    api_password :"Sk957079@",
                    Opcode:opCode.code,
                    mobile_no
                },
            }
        );

        const { error, DATA, Message } = apiResponse.data;

        if (error === "0") {
            return res.status(200).json(DATA);
        } else {
            return res.status(500).send({ status: false, msg: Message });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, msg:message.error })
    }
};
