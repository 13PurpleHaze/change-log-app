import * as user from '../user';

describe('user handler', () => {
    it('should create new user', async () => {
        const req = {
            body: {
                username: "Petr",
                password: "123"
            }
        }
        const res = {
            json({token}) {
                expect(token).toBeTruthy()
            }
        }
        const newUser = await user.signUp(req, res, ()=>{});
    });
});