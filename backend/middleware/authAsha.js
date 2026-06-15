import jwt from "jsonwebtoken";

const authAsha = async (req, res, next) => {
    try {
        const token = req.headers.token || req.headers['x-access-token'] ||
            (req.headers.authorization ? req.headers.authorization.split(' ')[1] : undefined)

        if (!token) {
            return res.status(401).json({ success: false, message: "Not Authorized. Login Again" })
        }

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        if (!tokenDecode || !tokenDecode.id) {
            return res.status(401).json({ success: false, message: "Not Authorized. Login Again" })
        }

        req.ashaId = tokenDecode.id
        req.body.ashaId = tokenDecode.id
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({ success: false, message: error.message })
    }
}

export default authAsha;


