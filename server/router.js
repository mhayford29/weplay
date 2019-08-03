const router = require('express').Router();
const controller = require('./controller');

router.route('/profile')
  .get(controller.profileFindOrCreate)
  .put(controller.profileUpdateOne)
  .delete(controller.profileDeleteAll);

  router.route('/event')
  .get(controller.eventFindAll)
  .post(controller.eventPostOne)

  router.route('/members')
  .get(controller.findMembers)

module.exports = router;