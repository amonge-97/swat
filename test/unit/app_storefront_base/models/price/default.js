'use strict';

var assert = require('chai').assert;
var proxyquire = require('proxyquire').noCallThru().noPreserveCache();


describe('DefaultPrice model', function () {
    var formattedMoney = '₪moolah';
    var DefaultPrice = proxyquire('../../../../../cartridges/app_storefront_base/cartridge/models/price/default.js', {
        'dw/value/Money': function () {},
        'dw/util/StringUtils': {
            formatMoney: function () { return formattedMoney; }
        }
    });
    var salesPrice;
    var listPrice;
    var decimalValue = 'decimalValue';
    var currencyCode = 'ABC';
    var currencySymbol = '₪moolah';
    var defaultPrice;
    function getDecimalValue() {
        return {
            get: function () {
                return decimalValue;
            }
        };
    }
    function getCurrencyCode() {
        return currencyCode;
    }

    beforeEach(function () {
        salesPrice = {
            available: true,
            getDecimalValue: getDecimalValue,
            getCurrencyCode: getCurrencyCode
        };

        listPrice = {
            available: true,
            getDecimalValue: getDecimalValue,
            getCurrencyCode: getCurrencyCode
        };
    });

    it('should have a sales price', function () {
        defaultPrice = new DefaultPrice(salesPrice);

        assert.deepEqual(defaultPrice, {
            list: null,
            sales: {
                currency: currencyCode,
                formatted: formattedMoney,
                symbolFirst: true,
                value: decimalValue,
                currencyArray: [
                    currencySymbol,
                    ''
                ],
                currencySymbol: currencySymbol
            }
        });
    });

    it('should set property values to null if price is not available', function () {
        salesPrice.available = false;
        defaultPrice = new DefaultPrice(salesPrice);
        assert.deepEqual(defaultPrice, {
            list: null,
            sales: {
                currency: null,
                currencyArray: [],
                currencySymbol: undefined,
                formatted: null,
                symbolFirst: undefined,
                value: null
            }
        });
    });

    it('should set list price when provided', function () {
        defaultPrice = new DefaultPrice(salesPrice, listPrice);
        assert.deepEqual(defaultPrice, {
            list: {
                currency: currencyCode,
                formatted: formattedMoney,
                value: decimalValue,
                symbolFirst: true,
                currencySymbol: currencySymbol,
                currencyArray: [
                    currencySymbol,
                    ''
                ]
            },
            sales: {
                currency: currencyCode,
                formatted: formattedMoney,
                value: decimalValue,
                symbolFirst: true,
                currencySymbol: currencySymbol,
                currencyArray: [
                    currencySymbol,
                    ''
                ]
            }
        });
    });
});
