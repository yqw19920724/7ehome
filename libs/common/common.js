
exports.responseMethod = function (res, result) {
    if(result.err) {
        return res.status(400).json({err: result.err.message});
    }
    return res.status(200).json(result.data);
};
