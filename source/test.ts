/* eslint no-undefined:0 */
'use strict'

// Import
import { equal } from 'assert-helpers'
import kava from 'kava'
import { getDeep, setDeep } from './'
import { Model } from 'backbone'

// Test
kava.suite('getsetdeep', function (suite, test) {
	suite('getdeep', function (suite, test) {
		const src = {
			a: {
				nullable: null,
				b: new Model({
					c: 1,
				}),
			},
			d: 1,
		}

		test('get existing nested value', function () {
			equal(getDeep(src, 'a.b.c'), 1)
		})

		test('get existing non-nested value', function () {
			equal(getDeep(src, 'd'), 1)
		})

		test('get null value', function () {
			equal(getDeep(src, 'a.nullable'), null)
		})

		test('get undefined value', function () {
			equal(getDeep(src, 'a.unknown'), undefined)
		})

		test('get value from undefined', function () {
			// @ts-ignore
			equal(getDeep(undefined, 'blah'), undefined)
			// @ts-ignore
			equal(getDeep(null, 'blah'), undefined)
		})
	})

	suite('setdeep', function (suite, test) {
		const src = {
			a: {
				b: new Model({
					c: 1,
				}),
			},
		}

		test('set existing value', function () {
			equal(setDeep(src, 'a.b.c', 2), 2)
			equal(getDeep(src, 'a.b.c'), 2)
		})

		test('set undefined value', function () {
			equal(setDeep(src, 'a.unknown', 3), 3)
			equal(getDeep(src, 'a.unknown'), 3)
		})

		test('set existing value only if empty', function () {
			equal(setDeep(src, 'a.b.c', 3, { onlyIfEmpty: true }), 2)
			equal(getDeep(src, 'a.b.c'), 2)
		})

		test('set undefined value only if empty', function () {
			equal(setDeep(src, 'a.b.asdsadasd', 3, { onlyIfEmpty: true }), 3)
			equal(getDeep(src, 'a.b.asdsadasd'), 3)
		})

		test('set value to undefined', function () {
			equal(setDeep(src, 'a.unknown', undefined), undefined)
			equal(getDeep(src, 'a.unknown'), undefined)
		})

		test('set value to null', function () {
			equal(setDeep(src, 'a.unknown', null), null)
			equal(getDeep(src, 'a.unknown'), null)
		})

		test('set nested undefined value', function () {
			equal(setDeep(src, 'a.z.x.y', 'yay'), 'yay')
			equal(getDeep(src, 'a.z.x.y'), 'yay')
		})
	})
})
