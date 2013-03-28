# Import
assert = require('assert')
joe = require('joe')
balUtil = require('../lib/getsetdeep')

# Test
joe.describe 'getsetdeep', (describe,it) ->

	it 'should getdeep correctly', (done) ->
		# Prepare
		src =
			a:
				b:
					attributes:
						c: 1

		expected = 1
		actual = balUtil.getDeep(src,'a.b.c')
		assert.equal(expected, actual, 'out value was as expected')

		actual = balUtil.getDeep(src,'a.b.unknown')
		assert.ok(typeof actual is 'undefined', 'undefined value was as expected')

		done()

	it 'should setdeep correctly', (done) ->
		# Prepare
		src =
			a:
				unknown: 'asd'
				b:
					attributes:
						c: 1

		expected =
			a:
				b:
					attributes:
						c: 2

		balUtil.setDeep(src,'a.unknown',undefined)
		balUtil.setDeep(src,'a.b.c',2)

		assert.deepEqual(expected, src, 'out value was as expected')

		done()
