import storyUtills from '../utills/storyline.js';


const storySave = async (req, res, next) => {
    const story = storyUtills.storyDetails();
    res.status(200).json({story: story});
}

export default {
    storySave
}