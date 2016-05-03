/**
 * Created by hrbu on 18.11.2015.
 */
'use strict';
function arrayObjectIndexOf (myArray, property, searchTerm) {
  for (var i = 0, len = myArray.length; i < len; i++) {
    if (myArray[ i ][ property ] === searchTerm) {
      return i;
    }
  }
  return -1;
}

module.exports = {
  arrayObjectIndexOf: arrayObjectIndexOf
};
