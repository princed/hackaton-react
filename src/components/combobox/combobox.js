/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var PopupList = require('../popup-list/popup-list');

var Combobox = React.createClass({
  getInitialState: function() {
    return {
      active: null,
      filteredItems: this.props.items.
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
  showItems: function() {
    this.setState({
      active: true
    });
  },
  hideItems: function() {
    this.setState({
      active: false
    });
  },
  handleKeys: function(e) {
    var value = this.refs.input.getDOMNode().value;

    // Enter
    if (value && e.keyCode === 13 && this.props.items.indexOf(value) === -1) {
      this.props.items.push(value);
      this.props.onAdd(value);
      this.handleChange();
      this.hideItems();
    } else if (e.keyCode === 27) {
      this.hideItems();
    } else {
      this.showItems();
    }
  },
  handleSelect: function(item) {
    console.log(item);
    this.props.onSelect(item.value);
    this.hideItems();
  },
  handleBlur: function() {
//    this.hideItems();
  },
  propTypes: {
    items: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    onAdd: React.PropTypes.func,
    onSelect: React.PropTypes.func
  },
  getTarget: function() {
    return this.refs.input.getDOMNode();
  },
  /*jshint ignore:start */
  render: function() {
    var popupList = this.state.active && <PopupList items={this.state.filteredItems} onSelect={this.handleSelect} getTarget={this.getTarget}/>;

    return (
      <div>
        <input ref="input" onKeyUp={this.handleKeys} onBlur={this.handleBlur} onClick={this.showItems} onChange={this.handleChange} placeholder="filter me now!" />
        {popupList}
      </div>
    );
  }
  /*jshint ignore:end */
});

module.exports = Combobox;
