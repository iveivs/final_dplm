import User from '../models/User.js';

export const updatePhone = async (req, res) => {
    const { phone } = req.body;
    const userId = req.user.id;

    if (!phone) {
        return res.status(400).json({ error: "Phone number is required" });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.phone = phone;
        await user.save();

        res.status(200).json({ message: "Phone number updated successfully", phone: user.phone });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

export const deletePhone = async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.phone = null;
        await user.save();

        res.status(200).json({ message: "Phone number deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};
