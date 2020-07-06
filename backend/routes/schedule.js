const router = require('express').Router();
const nodemailer = require('nodemailer');
const dbSchedule = require('../models/Schedule');
const PARAMTERS = require('./../constants/parameterConstant');

router.route('/add').post((req, res) => {
	let account = req.body.account;
    let title = req.body.title;
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    let scheduleList = req.body.scheduleList;
    let hashtag = req.body.hashtag;
    let newSchedule = new dbSchedule({account, title, startDate, endDate, scheduleList, hashtag});
      
    newSchedule.save()
      .then((res) => res.json('Tạo lịch trình thành công'))
      .catch(err => res.status(400).json('Error' + err))

	let email = account.person.email;
	// console.log(email);
	if (email) {
		let mailOptions = {
			from: process.env.USER_SENDMAIL || PARAMTERS.USER_SENDMAIL,
			to: account.person.email,
			subject: title,
			html: 'Hi, ' + account.person.name + '! Đây là thông tin hành trình của bạn: <p>Bắt đầu chuyến đi: <b>'+startDate.toString().substr(0,10)+'</b><p> <p>Kết thúc chuyến đi: <b>'+endDate.toString().substr(0,10)+'</b> <p> Các địa điểm khám phá:<b>'+hashtag.map(item => {return ' ' + item})+'</b></p> <p> Xem chi tiết lịch trình chuyến đi của bạn tại: <link>localhost:3000/list-schedule/ </link></p>'
		};
		
		let transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
			  user: process.env.USER_SENDMAIL || PARAMTERS.USER_SENDMAIL,
			  pass: process.env.PASS_SENDMAIL || PARAMTERS.PASS_SENDMAIL
			}
		});
		
		transporter.sendMail(mailOptions, function(error, info){
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});
	}
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