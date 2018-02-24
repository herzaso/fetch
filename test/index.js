"use strict";

require('../index');
var expect = require('chai').expect;
var nock = require('nock');

describe('fetch', function() {
	it('should be defined', function() {
		expect(fetch).to.be.a('function');
	});
});
