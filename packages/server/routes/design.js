const { palette } = require('../mockData/colorPalette');
const BASE_URL = '/design';

module.exports = (app) => {
    app.get(`${BASE_URL}/palette`, (_, res) => {
        res.status(200).json({
            palette
        })
    })
}