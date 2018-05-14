
exports.responseMethod = function (res, result) {
    if(result.err) {
        return res.status(400).json({err: result.err.message});
    }
    return res.status(200).json(result.data);
}

exports.findPage = function (params) {
    return new Promise(((resolve, reject) => {
        if(!params) {
            params = {};
        }
        const limit = parseInt(params.limit) || 10;
        const page = parseInt(params.page) || 1;
        const filter = params.filter || {};
        const skip = limit * (page - 1);
        const findDataPromise = new Promise((resolve1, reject1) => {
            this.find(filter, null, { skip: skip, limit: limit}, (err1, docs) => {
                if(err1) {
                    reject1(err);
                }
                resolve1(docs)
            });
        });
        const getCountPromise = new Promise((resolve2, reject2) => {
            this.count(filter, (err2, count) => {
                if(err2) {
                    reject2(err);
                }
                resolve2(count)
            })
        });
        Promise.all([findDataPromise, getCountPromise]).then((result) => {
            const data = {data: result[0], page: page, limit: limit, total: result[1]};
            resolve(data)
        }, (err) => {
            reject(err)
        })

    }))

};