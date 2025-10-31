import jwt from "jsonwebtoken";

const authAsha = async (req, res, next) => {
    try {
        const { token } = req.headers;

        if (!token) {
            return res.json({ success: false, message: "Not Authorized. Login Again" })
        }

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        if (tokenDecode) {
            req.body.ashaId = tokenDecode.id
            next()
        } else {
            res.json({ success: false, message: "Not Authorized. Login Again" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export default authAsha;


