const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const {Schema} = mongoose;

const HeroSchema = new Schema({
  'name': {
    type: String,
    trim: true,
    required: 'Please enter a name'
  },
  'hp': Number,
  'strength':Number,
  'healing': Number,
  'rageMax': Number,
  'universe': {
    type: String,
    required: 'Please enter a universe'
  }
});

/*HeroSchema.pre('save', function(next) {
  console.log('presave');
  if (!this.isModified('name')) {
    return next();
  }
  this.name = this.name.split(' ')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');
  next();
}) */

module.exports = mongoose.model('Hero', HeroSchema);
