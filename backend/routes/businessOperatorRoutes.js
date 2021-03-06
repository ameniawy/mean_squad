/**
 * Business Operator routes.
 */
var express = require('express');
var router = express.Router();
var businessOperatorController = require('../controllers/businessOperatorController');
var businessController = require('../controllers/businessController');
var userController = require('../controllers/userController');
var businessMiddleware = require('../middlewares/businessMiddleware');
var businessOperatorMiddleware = require('../middlewares/businessOperatorMiddleware');
var authMiddleware = require('../middlewares/authMiddleware');

var multer = require('multer');
var crypto = require('crypto');
var path = require('path');

/**
 * Multer Configurations
 */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
        const buf = crypto.randomBytes(48);
        cb(null, Date.now() + buf.toString('hex') + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
});

/**
 * A GET route responsible for viewing the reservations of business operator business's.
 * @var /businessOperator/reservations GET
 * @name /businessOperator/reservations GET
 * @example The user requesting the route has to be logged in.
 * @example The user requesting the route has to be of type 'Business Operator'.
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     data: { businessOperator: { BusinessOperator }},
 *     errors: [{type: String, msg: String}]
 * }
 */
router.get('/reservations', authMiddleware, businessOperatorController.viewReservations);


/**
 * A GET route responsible for viewing the activities of business operator business's.
 * @var /businessOperator/activities POST
 * @name /businessOperator/activities POST
 * @example The user requesting the route has to be logged in.
 * @example The user requesting the route has to be of type 'Business Operator'.
 * @example The route expects a body Object in the following format
 * {
 *     email,
 *     username,
 *     password,
 *     confirmPassword
 * }
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     errors: [{type: String, msg: String}]
 * }
 */

router.get('/activities', authMiddleware, businessOperatorController.viewActivities);


/**
 * A GET route responsible for viewing the payments of business operator business's.
 * @var /businessOperator/payments GET
 * @name /businessOperator/payments GET
 * @example The user requesting the route has to be logged in.
 * @example The user requesting the route has to be of type 'Business Operator'.
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     data: { payments: [Payment]}
 *     errors: [{type: String, msg: String}]
 * }
 */

router.get('/payments', authMiddleware, businessOperatorController.viewPayments);


/**
 * A GET route responsible for viewing the promotions of business operator business's.
 * @var /businessOperator/promotions GET
 * @name /businessOperator/promotions GET
 * @example The user requesting the route has to be logged in.
 * @example The user requesting the route has to be of type 'Business Operator'.
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     data: { promotions: [Promotion]}
 *     errors: [{type: String, msg: String}]
 * }
 */
router.get('/viewpromotions', authMiddleware, businessOperatorController.viewPromotions);

/**
 * A POST route responsible for creating a reservation on behalf of a client
 * @var /businessOperator/createreservation POST
 * @name /businessOperator/createreservation POST
 * @example The user requesting the route has to be logged in.
 * @example The user requesting the route has to be of type 'Business Operator'.
 * @example The route expects a body Object in the following format
 * {
 *
 * }
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     errors: [{type: String, msg: String}]
 * }
 */
router.post('/makeReservation', authMiddleware, businessOperatorMiddleware, businessOperatorController.makeReservation);


/**
 * A POST route responsible for registering a new business operator.
 * @var /businessOperator/register POST
 * @name /businessOperator/register POST
 * @example The user requesting the route has to be logged in.
 * @example The user requesting the route has to be of type 'Business'.
 * @example The route expects a body Object in the following format
 * {
 *     email,
 *     username,
 *     password,
 *     confirmPassword
 * }
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     errors: [{ type: error type(String),
 *                msg: error message(String)
 *              }]
 * }
 */
router.post('/register', authMiddleware, businessController.addBusiness, businessMiddleware, upload.single('image'), businessOperatorController.addType, userController.register, businessOperatorController.create);


/**
 * A POST route responsible for cancelling reservations.
 * @var /businessOperator/cancelReservation POST
 * @name /businessOperator/cancelReservation POST
 * @example The user requesting the route has to be logged in.
 * @example The user requesting the route has to be of type 'Business Operator'.
 * @example The route expects a body Object in the following format
 * {
 *    reservationId
 * }
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     errors: [{type: String, msg: String}]
 * }
 */
router.post('/cancelReservation', authMiddleware, businessOperatorController.cancelReservation);


/**
 * A POST route responsible for editing the reservations of a business operator.
 * @var /businessOperator/editReservation POST
 * @name /businessOperator/editReservation POST
 * @example The user requesting the route has to be logged in.
 * @example The user requesting the route has to be of type 'Business Operator'.
 * @example The route expects a body Object in the following format
 * {
 *     totalPrice: totalPrice,
 *     details: details,
 *     countParticipants: countParticipants,
 *     confirmed: confirmed,
 *     time: time
 * }
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     errors: [{type: String, msg: String}]
 * }
 */
router.post('/editReservation', authMiddleware, businessOperatorController.editReservation);

/**
 * A GET route responsible for viewing a specific business operator.
 * @var /businessOperator/{username} GET
 * @name /businessOperator/{username} GET
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     data: {
 *         businessOperator: {
 *             _id,
 *             businessId,
 *             userId: User
*          }
 *     },
 *     errors: [{type: String, msg: String}]
 * }
 */
router.get('/:username', businessOperatorController.show);


module.exports = router;
