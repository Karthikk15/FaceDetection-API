const handleRegister = (req, res, dataBase , bcrypt) => {

    const {name, password, email} = req.body;
    if( !name || !password || !email) {
      return res.status(404).json('Invalid Data!');
    }
    const hashed = bcrypt.hashSync(password);
   
    dataBase.transaction(trx =>{ 
        trx.insert({
            'email' : email,
            'hash': hashed
        }).into('login').
        returning('email').
        then(emailForLogging => {
            return trx('users').returning('*').insert({
             'email': emailForLogging[0],
             'name': name,
             joined: new Date()
            }).then(user => res.json(user[0]))
            .catch(err => res.status(400).json('Problem in registering.'))
        }).then(trx.commit)
        .catch(trx.rollback);
    }).catch(err => res.status(400).json('Problem in registering.'))
}

module.exports = {
    handleRegister : handleRegister
}