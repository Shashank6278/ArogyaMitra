import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import ashaModel from "../models/ashaModel.js";

// API to register ASHA worker
const registerAsha = async (req, res) => {
    try {
        const { name, email, password, phone, village, village1, village2, village3, subcenter, block, district, state, dateOfJoining, idNumber } = req.body;

        if (!name || !email || !password || !phone) {
            return res.json({ success: false, message: 'Missing required details' })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        const existing = await ashaModel.findOne({ email })
        if (existing) {
            return res.json({ success: false, message: "ASHA already registered with this email" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const ashaData = {
            name,
            email,
            password: hashedPassword,
            phone,
            village,
            village1,
            village2,
            village3,
            subcenter,
            block,
            district,
            state,
            dateOfJoining,
            idNumber
        }

        const newAsha = new ashaModel(ashaData)
        const asha = await newAsha.save()
        const token = jwt.sign({ id: asha._id }, process.env.JWT_SECRET)
        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to login ASHA worker
const loginAsha = async (req, res) => {
    try {
        const { email, password } = req.body;
        const asha = await ashaModel.findOne({ email })
        if (!asha) {
            return res.json({ success: false, message: "ASHA does not exist" })
        }
        const isMatch = await bcrypt.compare(password, asha.password)
        if (isMatch) {
            const token = jwt.sign({ id: asha._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get ASHA profile data
const getAshaProfile = async (req, res) => {
    try {
        const asha = await ashaModel.findById(req.body.ashaId).select('-password')
        if (!asha) return res.json({ success: false, message: 'ASHA not found' })
        res.json({ success: true, asha })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to update ASHA villages
const updateAshaVillages = async (req, res) => {
    try {
        const { ashaId } = req.body;
        const { village1, village2, village3 } = req.body;

        if (!village1) {
            return res.json({ success: false, message: 'At least one village is required' })
        }

        await ashaModel.findByIdAndUpdate(ashaId, { 
            village: village1, // Keep village field synced with village1 for backward compatibility
            village1, 
            village2, 
            village3 
        })

        res.json({ success: true, message: 'Villages updated successfully' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get ASHA worker count and village count
const getAshaCount = async (req, res) => {
    try {
        const count = await ashaModel.countDocuments()
        const ashas = await ashaModel.find({}, 'village1 village2 village3 village')
        
        // Count unique villages
        const villagesSet = new Set()
        ashas.forEach(asha => {
            if (asha.village) villagesSet.add(asha.village)
            if (asha.village1) villagesSet.add(asha.village1)
            if (asha.village2) villagesSet.add(asha.village2)
            if (asha.village3) villagesSet.add(asha.village3)
        })
        
        res.json({ success: true, count, villages: villagesSet.size })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { registerAsha, loginAsha, getAshaProfile, updateAshaVillages, getAshaCount }


