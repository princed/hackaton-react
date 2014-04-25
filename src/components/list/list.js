/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
require('./list.scss');

var List = React.createClass({
  propTypes: {
    items: React.PropTypes.arrayOf(React.PropTypes.object),
    as: React.PropTypes.string,
    onSelect: React.PropTypes.func
  },
  getClasses: function(item) {
    return React.addons.classSet({
      'list__item': true,
      'list__item_error': item.status === 'error',
      'list__item_action': item.status !== 'error',
      'list__item_active': item.active
    });
  },
  getActiveItem: function() {
    return this.props.items.filter(function (item) {return item.active})[0];
  },
  handleKeys: function(e) {
    var activeItem = this.getActiveItem();
    var activeItemPosition = this.props.items.indexOf(activeItem);
    var next;

    // Down
    if (e.keyCode === 40) {
      next = this.props.items[activeItemPosition + 1];
    // Up
    } else if (e.keyCode === 38) {
      next = this.props.items[activeItemPosition - 1];
    } else if (e.keyCode === 13 && activeItem) {
      this.props.onSelect(activeItem);
    }

    if (next) {
      if (activeItem) {
        activeItem.active = false;
      }
      next.active = true;

      this.forceUpdate();
    }
  },
  /*jshint ignore:start */
  render: function () {
    var self = this;
    var list = this.props.items.map(function(item) {
      var classes = self.getClasses(item);

      var setActive = function(active) {
        item.active = active;
        self.forceUpdate();
      };

      var onSelect = function() {
        self.props.onSelect(item)
      };

      var value = self.props.as ? item[self.props.as] : item;

      return <div className={classes} key={value} onMouseOver={setActive.bind(null, true)} onMouseOut={setActive.bind(null, false)} onClick={onSelect}>{value}</div>;
    });

    return <div className='list' onKeyDown={this.handleKeys}>{list}</div>;
  }
  /*jshint ignore:end */
});

module.exports = List;