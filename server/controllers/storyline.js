const { uploadFile } = require('./google.js');


const storySave = async (req, res, next) => {
    const story = JSON.parse(JSON.stringify(req.body));
    let data = JSON.stringify(story);
    uploadFile(req, res, next , data);
}

module.exports = storySave;
