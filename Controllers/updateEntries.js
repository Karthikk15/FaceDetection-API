const clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '1091f91d539d41ffa3dc565ecba993be'
   });

const handleImageURL = (req, res) => {
 const {imageUrl} =  req.body;
 app.models.predict(Clarifai.FACE_DETECT_MODEL,imageUrl).
 then(data => {
     console.log(data);
     res.json(data);
 }).catch(err => res.status(404).json('Failed !'))
}

const handleEntries = (req, res, dataBase) => {
    let { Id, entries } = req.body;
    console.log(entries);
    dataBase('users').where('id',Id).update({'entries': entries}).
    returning('entries').
    then(entries => {
        res.json(entries[0])
    }).
    catch(err => {
        res.status(404).json('Entries not updated!');
    } );
}

module.exports = {
    handleEntries : handleEntries,
    handleImageURL : handleImageURL
}