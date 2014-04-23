'use strict';

describe('Popup', function () {
  var Popup, component;

  beforeEach(function () {
    Popup = require('../../../src/scripts/components/Popup');
    component = Popup();
  });

  it('should create a new instance of Popup', function () {
    expect(component).toBeDefined();
  });
});
