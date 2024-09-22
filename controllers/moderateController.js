const axios = require('axios');

require('dotenv').config();

const submitJokeApiKey = process.env.SUBMIT_JOKE_API_KEY;
const submitJokeHost = process.env.SUBMIT_JOKE_HOST;
const deliverJokeApiKey = process.env.DELIVER_JOKE_API_KEY;
const deliverJokeHost = process.env.DELIVER_JOKE_HOST;

const getNonModeratedJoke = async (req, res) => {
    try {
        const { data } = await axios.get(`${submitJokeHost}/joke/non-moderated`,{
            headers: {
                'x-api-key': submitJokeApiKey
            }
        });

        const joke = data?.joke;

        let message = { joke: joke?.joke, type: joke?.type, id: joke?._id,
            createdAt: joke?.createdAt };

        res.status(200).json({ joke: message });
    }catch (error){
        console.error(error);
        res.status(500).json({ message: 'Server error'});
    }
}

const rejectJoke = async (req, res) => {
    try {
        const jokeId = req.params.id;

        await axios.patch(`${submitJokeHost}/joke/${jokeId}`,{
            status: 'Rejected'
        }, {
            headers: {
                'x-api-key': submitJokeApiKey
            }
        });

        res.status(200).json({ message: 'Joke rejected' });
    }catch (error){
        console.error(error);
        res.status(500).json({ message: 'Server error'});
    }
}

const deleteJoke = async (req, res) => {
    try {
        const jokeId = req.params.id;

        await axios.delete(`${submitJokeHost}/joke/${jokeId}`,{
            headers: {
                'x-api-key': submitJokeApiKey
            }
        });

        res.status(200).json({ message: 'Joke deleted' });
    }catch (error){
        console.error(error);
        res.status(500).json({ message: 'Server error'});
    }
}

const acceptJoke = async (req, res) => {
    try {
        const jokeId = req.params.id;
        const { joke, type } = req.body;

        await axios.post(`${deliverJokeHost}/jokes`, {
            joke: joke,
            type: type
        },{
            headers: {
                'x-api-key': deliverJokeApiKey
            }
        });

        await axios.patch(`${submitJokeHost}/joke/${jokeId}`,{
            status: 'Accepted'
        }, {
            headers: {
                'x-api-key': submitJokeApiKey
            }
        });

        res.status(200).json({ message: 'Joke accepted' });

    }catch (error){
        console.error(error);
        res.status(500).json({ message: 'Server error'});
    }
}

module.exports = {
    getNonModeratedJoke,
    rejectJoke,
    deleteJoke,
    acceptJoke
}