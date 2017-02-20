'use strict';
let _ = require('lodash');

function convertOid(query){
  if(query.hasOwnProperty('_id')){
    query.id = { $oid: query._id};
    delete query._id;
    return query;
  }
}
function promiseTimeout(resolve, data, maxTimeout){
  setTimeout(() => resolve(data), Math.floor(Math.random() * (maxTimeout || 600)) );
}

module.exports = {
  model: function(modelName){

    let collection = require('./models/' + modelName);

    return {
      find: function(query){
        convertOid(query);

        return new Promise(function(success, error){
          promiseTimeout(success,
            _.filter(collection, query)
          );
        })
      }
    }

  }
};