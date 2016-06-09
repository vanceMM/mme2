/** This module defines a express.Router() instance
 * - filters every GET request with filter parameter
 * - returns only the attributes defined in filter
 *
 * @author Carlos Rezai, Benjamin Bleckmann, Valentin Risch
 *
 * @module restapi/filter
 * @type ?
 */

var search = require('express').Router();
var store = require('../blackbox/store');

module.exports = search;