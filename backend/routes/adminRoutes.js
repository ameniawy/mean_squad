/**
 * Site Admin routes.
 */
var adminController = require('../controllers/adminController');
var userController = require('../controllers/userController');
var adminMiddleware = require('../middlewares/adminMiddleware');
var authMiddleware = require('../middlewares/authMiddleware');
var helperFunctions = require('../controllers/helpers/functions');
var express = require('express');
var router = express.Router();
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
 * A POST route responsible for registering an admin.
 * @var /admin/register POST
 * @name /admin/register POST
 * @example The user requesting the route has to be logged in.
 * @example The user requesting the route has to be of type 'Site Admin'.
 * @example The route expects a body Object in the following format
 * {
 *     email: admin email(String),
 *     username: admin username(String),
 *     password: admin password(String),
 *     confirmPassword: password confirmation(String)
 * }
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     errors: [{type: String, msg: String}]
 * }
 */
router.post('/register', authMiddleware, adminMiddleware, upload.single('image'), adminController.addType, userController.register, adminController.create);


/**
 * A GET route responsible for viewing businesses waiting to be approved by admins.
 * @var /admin/viewBusinessRequests GET
 * @name /admin/viewBusinessRequests GET
 * @example The user requesting the route has to be logged in.
 * @example The user requesting the route has to be of type 'Site Admin'.
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     data: {businesses:[
 *          name: name of business(String),
 *          description: description(String),
 *          address: address(String),
 *          latitude: location latitude(Number),
 *          longitude: location longitude(Number),
 *          contactInfo: contactInfo(String),
 *          userId: User
 *     ]},
 *     errors: [{type: String, msg: String}]
 * }
 */
router.get('/viewBusinessRequests', authMiddleware, adminMiddleware, adminController.viewBusinessRequests);


/**
 * A POST route responsible for reseting the balance of the business
 * @var /resetBalance POST
 * @name /resetBalance POST
 * @example The user requesting the route has to be logged in.
 * @example The user requesting the route has to be of type 'Site Admin'.
 * @example The route expects a body Object in the following format
 * {
 *     businessId
 * }
 * @example The route returns as a response an object in the following format
 * {
 *     msg: String showing a descriptive text,
 *     errors: [{type: String, msg: String}]
 * }
 */
router.post('/resetBalance', authMiddleware, adminMiddleware, adminController.resetBalance);

router.get('/resetSlots', helperFunctions.resetSlots);

module.exports = router;
