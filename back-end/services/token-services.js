import pkg from 'jsonwebtoken'
const { sign, verify } = pkg
import create from '../models/token-model.js'
import deleteOne from '../models/token-model.js'
import findOne from '../models/token-model.js'

class TokenService {
    generateTokens(payload) {
        const accessToken = sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
        const refreshToken = sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '15d'})
        return {
            accessToken, 
            refreshToken
        }
    }
    validateAccessToken(token) {
        try {
            const userData = verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }
    validateRefreshToken(token) {
        try {
            const userData = verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }
    async saveToken(userId, refreshToken) {
        const tokenData = await findOne({user: userId})
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await create({user: userId, refreshToken})
        return token;
    }
    async removeToken(refreshToken) {
        const tokenData = await deleteOne({refreshToken});
        return tokenData;
    }
    async findToken(refreshToken) {
        const tokenData = await findOne({refreshToken});
        return tokenData;
    }
}

export default new TokenService()