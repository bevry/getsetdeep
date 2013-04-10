# Import
{expect} = require('chai')
joe = require('joe')
balUtil = require('../lib/getsetdeep')
Backbone = require('backbone')

# Test
joe.describe 'getsetdeep', (describe,it) ->

	describe 'getdeep', (describe,it) ->
		# Prepare
		src =
			a:
				nullable: null
				b: new Backbone.Model({
					c: 1
				})
			d: 1

		it 'get existing nested value', ->
			expect(
				balUtil.getDeep(src, 'a.b.c')
			).to.eql(1)

		it 'get existing non-nested value', ->
			expect(
				balUtil.getDeep(src, 'd')
			).to.eql(1)

		it 'get null value', ->
			expect(
				balUtil.getDeep(src, 'a.nullable')
			).to.eql(null)

		it 'get undefined value', ->
			expect(
				balUtil.getDeep(src, 'a.unknown')
			).to.not.exist

		it 'get value from undefined', ->
			expect(
				balUtil.getDeep(undefined, 'blah')
			).to.not.exist
			expect(
				balUtil.getDeep(null, 'blah')
			).to.not.exist

	describe 'setdeep', (describe,it) ->
		# Prepare
		src =
			a:
				b: new Backbone.Model({
					c: 1
				})

		it 'set existing value', ->
			expect(
				balUtil.setDeep(src, 'a.b.c', 2)
			).to.eql(2)
			expect(
				balUtil.getDeep(src, 'a.b.c')
			).to.eql(2)

		it 'set undefined value', ->
			expect(
				balUtil.setDeep(src, 'a.unknown', 3)
			).to.eql(3)
			expect(
				balUtil.getDeep(src, 'a.unknown')
			).to.eql(3)

		it 'set existing value only if empty', ->
			expect(
				balUtil.setDeep(src, 'a.b.c', 3, {onlyIfEmpty:true})
			).to.eql(2)
			expect(
				balUtil.getDeep(src, 'a.b.c')
			).to.eql(2)

		it 'set undefined value only if empty', ->
			expect(
				balUtil.setDeep(src, 'a.b.asdsadasd', 3, {onlyIfEmpty:true})
			).to.eql(3)
			expect(
				balUtil.getDeep(src, 'a.b.asdsadasd')
			).to.eql(3)

		it 'set value to undefined', ->
			expect(
				balUtil.setDeep(src, 'a.unknown', undefined)
			).to.not.exist
			expect(
				balUtil.getDeep(src, 'a.unknown')
			).to.not.exist

		it 'set value to null', ->
			expect(
				balUtil.setDeep(src, 'a.unknown', null)
			).to.eql(null)
			expect(
				balUtil.getDeep(src, 'a.unknown')
			).to.eql(null)


