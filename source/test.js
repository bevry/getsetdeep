/* eslint no-undefined:0 */
'use strict'

// Import
const { equal } = require('assert-helpers')
const kava = require('kava')
const balUtil = require('./')
const Backbone = require('backbone')

// Test
kava.suite('getsetdeep', function(suite, test) {
	suite('getdeep', function(suite, test) {
		const src = {
			a: {
				nullable: null,
				b: new Backbone.Model({
					c: 1
				})
			},
			d: 1
		}

		test('get existing nested value', function() {
			equal(balUtil.getDeep(src, 'a.b.c'), 1)
		})

		test('get existing non-nested value', function() {
			equal(balUtil.getDeep(src, 'd'), 1)
		})

		test('get null value', function() {
			equal(balUtil.getDeep(src, 'a.nullable'), null)
		})

		test('get undefined value', function() {
			equal(balUtil.getDeep(src, 'a.unknown'), undefined)
		})

		test('get value from undefined', function() {
			equal(balUtil.getDeep(undefined, 'blah'), undefined)
			equal(balUtil.getDeep(null, 'blah'), undefined)
		})
	})

	suite('setdeep', function(suite, test) {
		const src = {
			a: {
				b: new Backbone.Model({
					c: 1
				})
			}
		}

		test('set existing value', function() {
			equal(balUtil.setDeep(src, 'a.b.c', 2), 2)
			equal(balUtil.getDeep(src, 'a.b.c'), 2)
		})

		test('set undefined value', function() {
			equal(balUtil.setDeep(src, 'a.unknown', 3), 3)
			equal(balUtil.getDeep(src, 'a.unknown'), 3)
		})

		test('set existing value only if empty', function() {
			equal(balUtil.setDeep(src, 'a.b.c', 3, { onlyIfEmpty: true }), 2)
			equal(balUtil.getDeep(src, 'a.b.c'), 2)
		})

		test('set undefined value only if empty', function() {
			equal(balUtil.setDeep(src, 'a.b.asdsadasd', 3, { onlyIfEmpty: true }), 3)
			equal(balUtil.getDeep(src, 'a.b.asdsadasd'), 3)
		})

		test('set value to undefined', function() {
			equal(balUtil.setDeep(src, 'a.unknown', undefined), undefined)
			equal(balUtil.getDeep(src, 'a.unknown'), undefined)
		})

		test('set value to null', function() {
			equal(balUtil.setDeep(src, 'a.unknown', null), null)
			equal(balUtil.getDeep(src, 'a.unknown'), null)
		})

		test('set nested undefined value', function() {
			equal(balUtil.setDeep(src, 'a.z.x.y', 'yay'), 'yay')
			equal(balUtil.getDeep(src, 'a.z.x.y'), 'yay')
		})
	})
})
