import * as argon2 from "argon2";
import findToken from "./token-services.js";
import validateRefreshToken from "./token-services.js";
import removeToken from "./token-services.js";
import saveToken from "./token-services.js";
import generateTokens from "./token-services.js";
import create from '../models/token-model.js'
import findOne from '../models/token-model.js'
import UserDto from "../dtos/user-dto.js";
import ApiError from "../exceptions/api-errors.js";
// import { createDir } from "../services/file-service";
// import File from "../models/file-model";

class UserService {
  async registration(email, password) {
    const candidate = await findOne({ email });
    if (candidate) {
      throw BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует`
      );
    }
    const hashPassword = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 19456, 
      timeCost: 2, 
      parallelism: 1,
    });

    const user = await create({
      email,
      password: hashPassword,
    });

    const userDto = new UserDto(user);
    const tokens = generateTokens({ ...userDto });
    await saveToken(userDto.id, tokens.refreshToken);
    // await createDir(new File({ user: userDto.id, name: "" }));

    return { ...tokens, user: userDto };
  }
  async login(email, password) {
    const user = await findOne({ email });
    if (!user) {
      throw ApiError.BadRequest("Пользователь с таким email не найден");
    }
    const isPassEquals = await argon2.verify(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный пароль");
    }
    const userDto = new UserDto(user);
    const tokens = generateTokens({ ...userDto });
    await saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }
  async logout(refreshToken) {
    const token = await removeToken(refreshToken);
    return token;
  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw UnauthorizedError();
    }
    const userData = validateRefreshToken(refreshToken);
    const tokenFromDb = await findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw UnauthorizedError();
    }
    const user = await findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = generateTokens({ ...userDto });

    await saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
}

export default new UserService();
