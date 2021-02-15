const router = require('express').Router();
const axios = require('axios');

router.get('/:name', async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://www.etoro.com/api/logininfo/v1.1/users/${req.params.name}`
    );
    if (data.optOut) res.status(200).json({ private: true });
    else res.status(200).json({ exists: true });
  } catch (e) {
    res.status(200).json({ exists: false });
  }
});

module.exports = router;
