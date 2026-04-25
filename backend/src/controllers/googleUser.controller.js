import { User } from "../model/UserModel.js";
import { generateRefreshToken } from "../utils/generateRefreshToken.js";
import { oauth2Client } from "../utils/google.Confiq.js";
import axios from "axios";
export const googleLogin = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({
        status: false,
        message: "Authorization code is required",
      });
    }
    const googleResponse = await oauth2Client.getToken({
      code,
      redirect_uri: "http://localhost:3000",
    });

    oauth2Client.setCredentials(googleResponse.tokens);

    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v2/userinfo`,
      {
        headers: {
          Authorization: `Bearer ${googleResponse.tokens.access_token}`,
        },
      },
    );
    console.log(userRes);

    const { name, email, picture } = userRes.data;
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        profileImage: picture,
      });
    }
    let { refreshToken, accessToken } = await generateRefreshToken(user?._id);
    let options = {
      httpOnly: true,
      secure: false,
    };

    res.cookie("refreshToken", refreshToken, options);
    res.cookie("accessToken", accessToken, options);
    return res
      .status(200)
      .json({ status: true, message: "success", user, accessToken });
  } catch (error) {
    console.log("🔥 GOOGLE ERROR FULL:");
    console.log(error);

    if (error.response) {
      console.log("🔥 GOOGLE ERROR DATA:");
      console.log(error.response.data);
    }

    return res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};
