/**
 * Created by park on 2014/8/7.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var util = require('util');

var daoDoc = {
    username: String,
    password: String,
    email: String,
    regip: { type: Number, default: 0 },
    regdate: { type: Number, default: Db.timestamp() },
    lastip: { type: Number, default: 0 },
    lastime: { type: Number, default: Db.timestamp() },
    salt: String,
    locked: { type: Boolean, default: false },
    flag: { type: String, default: '' },
    group: { type: String, default: '' }
};

var daoSchema = new Schema(daoDoc);

var daoModel = global.Db.model(util.format('%susers', global.Db._prefix), daoSchema);
module.exports = daoModel;