/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Combobox = require('../combobox/combobox');

var ITEMS = [
  'lol',
  'poll',
  'goal',
  'fall',
  'tall'
];

var logElem = document.getElementById('log');
var log = function(message) {
  logElem.innerHTML = message;
};

var onSelect = function(item) {
  log('Selected ' + item);
};
var onAdd = function(item) {
  log('Added ' + item);
};

React.renderComponent(Combobox({
  items: ITEMS,
  onSelect: onSelect,
  onAdd: onAdd
}), document.getElementById('combobox'));
