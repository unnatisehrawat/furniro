import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

    
        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        
        const token = jwt.sign(
            { role: "admin", email }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1d" } // Token expires in 1 day
        );

    
        res.cookie("token", token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production", 
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        res.status(200).json({ message: "Logged in successfully" });
    } catch (error) {
        res.status(500).json({ message: "Login failed", error: error.message });
    }
};

export const logout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
};

export const verifyAuth = ( req , res) => {

    res.status(200).json( { message : "Authenticated" ,
        user : req.user
    })
}
