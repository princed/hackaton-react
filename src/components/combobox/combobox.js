/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var PopupList = require('../popup-list/popup-list');

var ComboBox = React.createClass({
  getInitialState: function() {
    var self = this;

    return {
      active: null,
      filteredItems: self.props.items.
        map(function(value) {
          return {value: value};
        })
    };
  },
  handleChange: function() {
    var filteredItems = this.props.items.
      filter(function(value) {
      return value.indexOf(this.refs.input.getDOMNode().value) !== -1;
      }, this).
      map(function(value) {
        return {value: value};
      });

    this.setState({
      filteredItems: filteredItems.length ? filteredItems : [{value: 'Found nothing', status: 'error'}]
    });
  },
  handleClick: function() {
    this.setState({
      active: true
    });
  },
  handleBlur: function() {
//    this.setState({
//      active: false
//    });
  },
  propTypes: {
    items: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
  },
  getTarget: function() {
    return this.refs.input.getDOMNode();
  },
  /*jshint ignore:start */
  render: function() {
    var popupList = this.state.active && <PopupList items={this.state.filteredItems} getTarget={this.getTarget}/>;

    return (
      <div>
        <input ref="input" onBlur={this.handleBlur} onClick={this.handleClick} onChange={this.handleChange} placeholer="filter me now!" />
        {popupList}
      </div>
    );
  }
  /*jshint ignore:end */
});

var ITEMS = [
  'lol',
  'poll',
  'goal',
  'fall',
  'tall'
];

React.renderComponent(<ComboBox items={ITEMS} />, document.getElementById('content')); // jshint ignore:line

module.exports = ComboBox;
