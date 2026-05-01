import { User } from "../model/UserModel.js";
import { generateRefreshToken } from "../utils/generateRefreshToken.js";
import { upsertStreamUser } from "../utils/stream.js";

export const resgisterUser = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "all field must be filled" });
    }
    let userExit = await User.findOne({
      $or: [{ name }, { email }],
    });
    if (userExit) {
      return res.status(400).json({ message: "user already register" });
    }

    let newUser = await User.create({
      name,
      email,
      password,
    });

    if (!newUser) {
      return res.status(400).json({ message: "not able to create" });
    }

    try {
      await upsertStreamUser({
        id: newUser._id.toString(),
        name: newUser.name,
        profileImage: newUser.profilePic || "",
      });
      console.log(`Stream user created for ${newUser.name}`);
    } catch (error) {
      console.log("Error creating Stream user:", error);
    }

    let { refreshToken, accessToken } = await generateRefreshToken(
      newUser?._id,
    );
    let options = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.cookie("refreshToken", refreshToken, options);
    res.cookie("accessToken", accessToken, options);
    const loggedUser = await User.findById(newUser?._id).select(
      "-password -refreshToken -accessToken",
    );

    return res.status(200).json({
      message: "user register successfully",
      status: true,
      user: loggedUser,
      accessToken,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Server error", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  let { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).json({ message: "all field must be filled" });
  }

  let user = await User.findOne({
    $or: [{ email }],
  });

  let userPassword = await user.isPassword(password);

  if (!userPassword) {
    return res.status(400).json({ message: "password not correct" });
  }

  let { refreshToken, accessToken } = await generateRefreshToken(user?._id);

  let loggedUser = await User.findById(user?._id).select(
    "-password -refreshToken",
  );

  let options = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };

  res.cookie("refreshToken", refreshToken, options);
  res.cookie("accessToken", accessToken, options);

  return res.status(200).json({
    message: "user login successfully",
    status: true,
    user: loggedUser,
    accessToken,
  });
};

export const logoutUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user?._id, {
      REFRESH_TOKEN: "",
    });
    let options = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    return res
      .status(201)

      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({ status: true, message: "logout successfully" });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const onBoard = async (req, res) => {
  try {
    const { name, bio, nativeLanguage, learningLanguage, location } = req.body;
    if (!name || !bio || !nativeLanguage || !learningLanguage || !location) {
      let missingFields = [];
      if (!name) missingFields.push("name");
      if (!bio) missingFields.push("bio");
      if (!nativeLanguage) missingFields.push("nativeLanguage");
      if (!learningLanguage) missingFields.push("learningLanguage");
      if (!location) missingFields.push("location");

      return res.status(400).json({
        status: false,
        error: "failed in adding product",
        message: `${missingFields.join(",")} all fields required`,
      });
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.user?._id,
      {
        ...req.body,
        isOnboarded: true,
      },
      { new: true },
    ).select("-password");

    try {
      await upsertStreamUser({
        id: updatedUser._id.toString(),
        name: updatedUser.name,
        profileImage: updatedUser.profilePic || "",
      });
      console.log(`Stream user created for ${updatedUser.name}`);
    } catch (error) {
      console.log("Error creating Stream user:", error);
    }
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};
