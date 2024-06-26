const { SuccessResponse } = require("../core/success.response");
const { loginSuccess, getUserById } = require("../services/oauth.service");

class Oauth2Controller{
    oauthGoogleCallback = async ( req, res, next ) => {
        const userId = req.user?.id;
        const oauth_login = req.user?.oauth_hash_confirm;
        res.redirect(`${process.env.URL_CLIENT}/login-success/${userId}/${oauth_login}`);
    }

    loginSuccess = async ( req, res, next ) => {
        const { id, oauth_hash_confirm } = req.body;
        new SuccessResponse({
            message: 'login success',
            metadata: await loginSuccess(id, oauth_hash_confirm) 
        }).send(res);
    }

    getcurrentUser = async ( req, res, next ) => {
        const { id } = req?.current;
        new SuccessResponse({
            message: 'login success',
            metadata: await getUserById(id) 
        }).send(res);
    }
}

module.exports = new Oauth2Controller();