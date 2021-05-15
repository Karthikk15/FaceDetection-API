const handleSignIn = (req, res, dataBase, bcrypt) => {
    let {email, password} = req.body;
    if(!password || !email) {
        return res.status(404).json('Invalid Data!');
      }
    dataBase.select('hash').from('login').where('email', email).
    then(dbPassword => {
        let isValid = bcrypt.compareSync(password, dbPassword[0].hash);
        if(isValid) {
            return dataBase.select('*').from('users').where('email', email).
            then(users => {
            res.json(users[0]);
            }).catch(err =>res.status(404).json('Unable to retrieve user'))
        } else {
            res.status(404).json('Invalid Credentials');
        }
    }).catch(err => res.status(404).json('UserName or Password doesn\'t matched!'));
    };

module.exports = {
    handleSignIn : handleSignIn
}