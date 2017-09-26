var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sillybilly');
var Promise = require('bluebird');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var userSchema = mongoose.Schema({
  name: Number,
  salt: Number,
  hash: Number,
  termSearched: String
});

var searchSchema = mongoose.Schema({
  searchText: String,
  temp_min: Number,
  temp_max: Number,
  time_min: Number,
  time_max: Number
});

var Users = mongoose.model('Users', userSchema);
var Search = mongoose.model('Search', searchSchema);

var selectAll = function(callback) {
  Users.find({}, function(err, users) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, users);
    }
  });
};

module.exports = {

  selectAll: (callback) => {
    Users.find({}, function(err, users) {
      if(err) {
        callback(err, null);
      } else {
        callback(null, users);
      }
    });
  }, 

  selectOne: (params) => {
    console.log()
    return new Promise (
      (resolve, reject) => {
        Search.find()
        .where('temp_min').lt(params.temp)
        .where('temp_max').gt(params.temp)
        .where('time_min').lt(params.time)
        .where('time_max').gt(params.time)
        .exec(function (err, data) {
          if (err) {
            reject(err)
          } else {
            console.log(data);
            resolve(data)
          }
        });
      }
    )
  }
}



// ([  
//   {"searchText":"Breakfast", "temp_min":70, "temp_max":120, "time_min":5, "time_max":10},
//   {"searchText":"Lunch sandwich", "temp_min":70, "temp_max":120, "time_min":11, "time_max":14},
//   {"searchText":"Tea Snack", "temp_min":70, "temp_max":120, "time_min":15, "time_max":18},
//   {"searchText":"Weekday Dinner", "temp_min":70, "temp_max":120, "time_min":19, "time_max":21},
//   {"searchText":"Open Late", "temp_min":70, "temp_max":120, "time_min":22, "time_max":24}
// ])


// ([  
//   {"searchText":"Breakfast", "temp_min":40, "temp_max":70, "time_min":5, "time_max":10},
//   {"searchText":"Lunch soup", "temp_min":40, "temp_max":70, "time_min":10, "time_max":14},
//   {"searchText":"Tea Snack", "temp_min":40, "temp_max":70, "time_min":14, "time_max":18},
//   {"searchText":"Weekday Dinner", "temp_min":40, "temp_max":70, "time_min":18, "time_max":21},
//   {"searchText":"Open Late", "temp_min":40, "temp_max":70, "time_min":21, "time_max":24}
// ])