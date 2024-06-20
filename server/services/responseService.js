const { DEFAULT_SUCCESS_STATUS_CODE } = require('../config/constants')

const sendResponse = (res, data, statusCode = DEFAULT_SUCCESS_STATUS_CODE) => {
    res.status(statusCode).json(data);
};

module.exports = { sendResponse };