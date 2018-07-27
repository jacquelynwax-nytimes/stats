const router = require('express').Router()
module.exports = router

// get user from request
router.get('/', (req, res, next) => {
  const { cookie } = req.headers
  const regi = 77025600
  // const regi = Think about how we get this in GTM context

  res.status(200).json({
    id: regi,
    sCookie: cookie['NYT-S'],
  })
  .catch(next)
})
