const router = require('express').Router();
const axios = require('axios');

router.get('/:name', async (req, res) => {
  try {
    await axios.get(
      `https://www.etoro.com/api/streams/v2/streams/user-trades/${req.params.name}`
    );
    res.status(200).json({ exists: true });
  } catch (e) {
    res.status(200).json({ exists: false });
  }
});

module.exports = router;
