import UnauthorizeError from "../exeptions/UnauthorizedError";
import NotFoundError from "../exeptions/NotFoundError";
import JWTService from "../services/token-service";
import UserService from "../services/user-service";

class UserController {
    private userService: UserService;
    private jwtService: JWTService;
    
    constructor() {
        this.userService = new UserService();
        this.jwtService = new JWTService();
    }

    signUp = async (req, res) => {
        const user = await this.userService.create(req.body.username, req.body.password);
        const tokens = this.jwtService.createJWT({id: user.id, username: user.username});
        await this.jwtService.storeToken(user, tokens.refreshToken);
        res.cookie("refreshToken", tokens.refreshToken, { maxAge: 30*24*60*60*1000, httpOnly: true });
        res.json(tokens);
    }

    signIn = async (req, res) => {
        console.log(this);
        const user = await this.userService.login(req.body.username, req.body.password);
        const tokens = this.jwtService.createJWT({id: user.id, username: user.username});
        await this.jwtService.storeToken(user, tokens.refreshToken);
        res.cookie("refreshToken", tokens.refreshToken, { maxAge: 30*24*60*60*1000, httpOnly: true });
        res.json(tokens);
    }

    signOut = async (req, res) => {
        const {refreshToken} = req.cookies;
        await this.userService.logout(req.body.user.id);
        res.clearCookie("refreshToken");
        res.status(200);
    }

    refresh = async (req, res) => {
        const {refreshToken} = req.cookies;
        if(!refreshToken) {
            throw new UnauthorizeError();
        }
        const user = this.jwtService.validateRefreshToken(refreshToken);
        const tokenFromDB = this.jwtService.findToken(refreshToken);
        if(!user && !tokenFromDB) {
            throw new NotFoundError("token", refreshToken);
        }
    
        const tokens = this.jwtService.createJWT({id: user.id, username: user.username});
        await this.jwtService.storeToken(user, tokens.refreshToken);
        res.cookie("refreshToken", tokens.refreshToken, { maxAge: 30*24*60*60*1000, httpOnly: true });
        res.json(tokens);
    }
}

export default UserController;