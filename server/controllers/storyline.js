const storyUtills = require('../utills/storyline.js');


const storySave = async (req, res, next) => {
    const userId = req.params.userid || null;
    const story = req.body;
    console.log(req.body);
    return res.status(200).json({story: story});
}

module.exports = storySave;