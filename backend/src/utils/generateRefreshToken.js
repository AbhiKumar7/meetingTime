import { User } from "../model/UserModel.js";

export const generateRefreshToken = async (UserId) => {
  try {
    let user = await User.findById(UserId);

    if (!user) {
      throw new Error(404, "User not found");
    }
let accessToken = await user.generateAccessToken();
    let refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return {accessToken, refreshToken };
  } catch (Error) {
    throw new Error(
      400,
      "something went wrong while generating accesstoken and refresh token",
    );
  }
};
