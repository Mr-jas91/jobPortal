import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
const tokenConfig = {
  maxAge: 1 * 24 * 60 * 60 * 1000,
  httpsOnly: false,
  sameSite: "strict"
};
const generateToken = async (userId) => {
  return jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: "1d" }); // Token expires in 1 day
};

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false
      });
    }
    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User already exist with this email.",
        success: false
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url
      }
    });

    // Generate JWT token

    const token = await generateToken(newUser._id);
    return res.status(201).cookie("token", token, tokenConfig).json({
      message: "Account created successfully.",
      user: newUser,
      success: true
    });
  } catch (error) {
    console.log(error);
  }
};
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Validate request body
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Email, password, or role is missing.",
        success: false
      });
    }

    // Find user by email
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false
      });
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false
      });
    }

    // Check role
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with the selected role.",
        success: false
      });
    }

    // Generate JWT token
    const token = await generateToken(user._id);

    // Define user details to send back (omit sensitive fields like password)
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile
    };

    // Send response with cookie and user info
    return res
      .status(200)
      .cookie("token", token, {
        ...tokenConfig,
        maxAge: tokenConfig.maxAge // 1 day expiration
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true
      });
  } catch (error) {
    console.log("Error during login:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true
    });
  } catch (error) {
    console.log(error);
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;
    // cloudinary ayega idhar
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }
    const userId = req.id; // middleware authentication
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false
      });
    }
    // updating data
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    // resume comes later here...
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url; // save the cloudinary url
      user.profile.resumeOriginalName = file.originalname; // Save the original file name
    }

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile
    };

    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
      success: true
    });
  } catch (error) {
    console.log(error);
  }
};
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.id;
    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false
      });
    }
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile
    };
    const token = await generateToken(user._id);
    return res.status(200).cookie("token", token).json({
      user,
      success: true
    });
  } catch (error) {
    console.log(error);
  }
};
