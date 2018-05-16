const goods = require('../model/m_goods');
const oss = require('../../oss');
const ossPath = 'images/goods/';

exports.mw_creatGood = {
    checkParams: function (req, res, next) {
        if(!req.files || !req.params.id) {
            return res.status(400).json({err: 'image is invalid'})
        }
        next()
    },
    uploadToOss: function (req, res, next) {
        const files = req.files;
        const path = `${ossPath}${req.params.id}.jpg`;
        oss.uploadFile(path, files.img.path, (err, result) => {
            if(err) {
                return res.status(400).json({err: 'upload file to oss is failed'})
            }
            req.result = result;
            next()
        });
    },
    updateGood: function (req, res) {
        goods.findById(req.params.id, function (err, good) {
            if(err) {
                return res.status(400).json({err: 'good is not exist'})
            }
            good.preview = req.result.url;
            good.save().then((doc) => {
                return res.status(200).json(doc);
            }, (err) => {
                return res.status(400).json({err: err.message});
            })
        })
    }
}