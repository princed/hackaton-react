'use strict';

describe('Popup', function () {
  var Popup, component;

  beforeEach(function () {
    Popup = require('../../../src/components/popup/popup');
    component = Popup();
  });

  it('should create a new instance of Popup', function () {
    expect(component).toBeDefined();
  });
});
