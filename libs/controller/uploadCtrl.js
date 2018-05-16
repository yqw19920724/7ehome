const uploadServce = require('../service/uploadService')

exports.mw_creatGood = {
    updateGood: (req, res) => {
        const files = req.files;
        const goodId = req.params.id;
        if(!files || !goodId) {
            return res.status(400).json({err: 'image is invalid'})
        }
        uploadServce.uploadGoodImg(goodId, files).then(good => {
            return res.status(200).json(good)
        }).catch(err => {
            return res.status(400).json({err: err.message})
        })
    }
}