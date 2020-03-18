const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const accountSchema = new Schema({
    id: { type: ObjectId, index: true },
    address: { type: String, trim: true, required: 'required address' },
    privateKey: { type: String, trim: true, required: 'required privateKey' }
}, {
        timestamps: true
    });

const Account = mongoose.model('Account', accountSchema);

module.exports.Account;