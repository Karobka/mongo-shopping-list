var mongoose = require('mongoose');

    //Specify name field for the model is required so you can't save without a name
var ItemSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

var Item = mongoose.model('Item', ItemSchema);

module.exports = Item;