const router = require('express').Router();

const dbSchedule = require('../models/Schedule');

router.route('/add').post((req, res) => {
    const account = req.body.account;
    const title = req.body.title;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const scheduleList = req.body.scheduleList;
    const hashtag = req.body.hashtag;
    const newSchedule = new dbSchedule({account, title, startDate, endDate, scheduleList, hashtag});

    newSchedule.save()
      .then(() => res.json('Schedule added!'))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/account/:id').get((req, res) => {
  dbSchedule.find({"account._id": req.params.id}).sort({startDate: -1})
      .then(schedules => res.json(schedules))
      .catch(err => res.status(400).json('Error' + err))
});

router.route('/:id').get((req, res) => {
  dbSchedule.findById(req.params.id)
      .then(schedules => res.json(schedules))
      .catch(err => res.status(400).json('Error' + err))
});

module.exports = router;