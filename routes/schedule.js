const router = require('express').Router();
let Schedule = require('../models/scheduleModel');

router.route('/:user').get((req, res) => {
    Schedule.findOne({ user: req.params.user })
        .then(schedule => res.json(schedule.meets))
        .catch(err => res.status(204).json('Error: Schedule doesn\'t exist'));
});

router.route('/add').post((req, res) => {
    const meets = req.body.meets;
    const user = req.body.email;

    const newSchedule = new Schedule({ meets, user });
    newSchedule.save()
        .then((savedSchedule) => res.json(savedSchedule))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/update/:user').post((req, res) => {
    Schedule.findOne({ user: req.params.user })
        .then(schedule => {
            schedule.meets = req.body.meets;

            schedule.save()
                .then((updatedSchedule) => res.json(updatedSchedule))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;