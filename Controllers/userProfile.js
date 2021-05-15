const handleUserProfile = (req, res, dataBase) => {
    let { id } = req.params;
    dataBase.select('*').from('users').where({id}).then(
        users =>{ 
            if(users.length)
            res.json(users[0]);
            else
            res.status(404).json('User not found');
        }
        ).catch(err => res.status(404).json('Invalid ID'));
}

module.exports = {
    handleUserProfile : handleUserProfile
}