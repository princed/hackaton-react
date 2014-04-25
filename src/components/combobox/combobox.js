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
  unmountPopup: noop,
  componentWillUnmount: function() {
    this.unmountPopup();
  },
  getFilteredItems: function() {
    var inputValue = this.getTarget().value;

    var filteredItems = this.props.items.
      filter(function(value) {
        return value.indexOf(inputValue) !== -1;
      }).
      map(convertItem);

    return filteredItems.length ? filteredItems : [{value: 'Found nothing', status: 'error'}];
  },
  handleChange: function() {
    if (!this.popup) {
      this.showItems();
      return;
    }

    this.popup.setProps({items: this.getFilteredItems()});
  },
  handleClick: function() {
    this.getTarget().select();
    this.showItems();
  },
  showItems: function() {
    if (this.popup) {
      this.popup.refs.popup.setState({active: true});
      return;
    }

    /*jshint ignore:start */
    var popupList = Popup.automount(
        <PopupList active={true} as='value' items={this.getFilteredItems()} onSelect={this.handleSelect} getTarget={this.getTarget}/>
    );
    /*jshint ignore:end */

    this.popup = popupList.component;
    this.unmountPopup = popupList.unmountComponent;
  },
  hideItems: function() {
    if (this.popup) {
      this.popup.refs.popup.setState({active: false});
    }
  },
  handleKeys: function(e) {
    var value = this.getTarget().value;

    // Enter
    if (value && e.keyCode === 13 && this.props.items.indexOf(value) === -1) {
      this.props.onAdd(value);
      this.hideItems();
    // Esc
    } else if (e.keyCode === 27) {
      this.hideItems();
    // Input
    } else {
      this.showItems();

      // Delegate keys to list
      if (this.popup) {
        this.popup.refs.list.handleKeys(e);
      }
    }
  },
  handleSelect: function(item) {
    this.getTarget().value = item.value;
    this.props.onSelect(item.value);
    this.hideItems();
  },
  getTarget: function() {
    return this.refs.input.getDOMNode();
  },
  /*jshint ignore:start */
  render: function() {
    return <input className='combobox__input' ref='input'
        onKeyDown={this.handleKeys} onFocus={this.showItems} onClick={this.handleClick}
        onChange={this.handleChange} placeholder='filter me now!' />;
  }
  /*jshint ignore:end */
});

module.exports = Combobox;
