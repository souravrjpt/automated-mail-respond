const { clientId, clientSecret, redirectURI, refreshToken } = require("./text");

//for security reasons all the tokens and IDs are stored in text file. If you want to run this 
//using your own credentials and I've mentioned all the details for that as well. For more information, see READ.me file
const CLIENT_ID = clientId
const CLEINT_SECRET = clientSecret 
const REDIRECT_URI = redirectURI
const REFRESH_TOKEN =refreshToken
module.exports = { CLIENT_ID, CLEINT_SECRET, REDIRECT_URI, REFRESH_TOKEN };