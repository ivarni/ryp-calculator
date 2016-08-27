'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var FIELD_CHANGE = exports.FIELD_CHANGE = 'FIELD_CHANGE';
var fieldChange = exports.fieldChange = function fieldChange(field, value) {
    return {
        type: FIELD_CHANGE,
        field: field,
        value: value
    };
};

var LABEL_CHANGE = exports.LABEL_CHANGE = 'LABEL_CHANGE';
var labelChange = exports.labelChange = function labelChange(field, value, notes) {
    return {
        type: LABEL_CHANGE,
        field: field,
        value: value,
        notes: notes
    };
};