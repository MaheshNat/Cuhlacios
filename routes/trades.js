const router = require('express').Router();
const axios = require('axios');

router.get('/:username', async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://www.etoro.com/api/streams/v2/streams/user-trades/${req.params.username}`
    );
    res.status(200).json(data);
    console.log(`proxied for trader ${req.params.username}`);
  } catch (e) {
    res.status(500).json({ error: e });
    console.log(`error with trader ${req.params.username}`, e);
  }
});

module.exports = router;
