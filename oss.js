const co = require('co');
const OSS = require('ali-oss');
const client = new OSS({
    region: 'oss-cn-beijing',
    accessKeyId: 'LTAImQSs9vMFx2hF',
    accessKeySecret: 'fWo9dXHVGOYYsZZGYrdAg0rpD2mY1A'
});

exports.listBucket = function() {
    co(function* () {
        const result = yield client.listBuckets();
        console.log(result);
    }).catch(function (err) {
        console.log(err);
    });
};

exports.listFile = function () {
    co(function* () {
        client.useBucket('eyun-space');
        var result = yield client.list();
        console.log(result);
    }).catch(function (err) {
        console.log(err);
    });
}

exports.uploadFile = function (path ,file, callback) {
    co(function* () {
        client.useBucket('eyun-space');
        const result = yield client.put(path, file);
        console.log(result);
        callback(null, result);
    }).catch(function (err) {
        callback(err);
    });
}
