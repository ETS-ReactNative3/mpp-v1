const { uploadFile } = require('./google/google.js');

const storySave = async (req, res, next) => {
  const story = JSON.parse(JSON.stringify(req.body));
  const data = JSON.stringify(story);
  await uploadFile(req, res, next, data);
};

module.exports = storySave;
