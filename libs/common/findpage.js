//自定义分页方法
module.exports = function (params = {}) {
    return new Promise(((resolve, reject) => {
        const limit = parseInt(params.limit) || 10;
        const page = parseInt(params.page) || 1;
        const filter = params.filter || {};
        const skip = limit * (page - 1);
        const findDataPromise = new Promise((resolve1, reject1) => {
            this.find(filter, null, { skip: skip, limit: limit}, (err1, docs) => {
                if(err1) {
                    reject1(err1);
                }
                resolve1(docs)
            });
        });
        const getCountPromise = new Promise((resolve2, reject2) => {
            this.count(filter, (err2, count) => {
                if(err2) {
                    reject2(err2);
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