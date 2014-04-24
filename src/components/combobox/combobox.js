/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Popup = require('../popup/popup');
var PopupList = require('../popup-list/popup-list');
require('./combobox.scss');

var noop = function() {};
var convertItem = function(value) {
  return {value: value};
};

var Combobox = React.createClass({
  propTypes: {
    items: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    onAdd: React.PropTypes.func,
    onSelect: React.PropTypes.func
  },
  getInitialState: function() {
    return {
      unmountPopup: noop
    };
  },
//  componentDidMount: function() {
//
//  },
  componentWillUnmount: function() {
    this.state.unmount();
  },
  getFilteredItems: function() {
    var inputValue = this.refs.input.getDOMNode().value;

    var filteredItems = this.props.items.
      filter(function(value) {
        return value.indexOf(inputValue) !== -1;
      }).
      map(convertItem);

    return filteredItems.length ? filteredItems : [{value: 'Found nothing', status: 'error'}];
  },
  handleChange: function() {
    if (!this.state.popup) {
      this.showItems();
      return;
    }
    this.state.popup.setItems(this.getFilteredItems());
  },
  showItems: function() {
    if (this.state.popup) {
      this.state.popup.setVisible(true);
      return;
    }

    /*jshint ignore:start */
    var popup = Popup.automount(<PopupList active={true} as='value' items={this.getFilteredItems()} onSelect={this.handleSelect} getTarget={this.getTarget}/>);
    /*jshint ignore:end */

    this.setState({
      unmountPopup: popup.unmount,
      popup: popup.popup
    });
  },
  hideItems: function() {
    this.state.popup.setVisible(false);
  },
  handleKeys: function(e) {
    var value = this.refs.input.getDOMNode().value;

    // Enter
    if (value && e.keyCode === 13 && this.props.items.indexOf(value) === -1) {
      this.props.items.push(value);
      this.props.onAdd(value);
      this.handleChange();
      this.hideItems();
    // Esc
    } else if (e.keyCode === 27) {
      this.hideItems();
    // Input
    } else {
      this.showItems();
    }
  },
  handleSelect: function(item) {
    this.props.onSelect(item.value);
    this.hideItems();
  },
  getTarget: function() {
    return this.refs.input.getDOMNode();
  },
  /*jshint ignore:start */
  render: function() {
    return <input className='combobox__input' ref='input'
        onKeyUp={this.handleKeys} onFocus={this.showItems} onClick={this.showItems} onChange={this.handleChange} placeholder='filter me now!' />;
  }
  /*jshint ignore:end */
});

module.exports = Combobox;
