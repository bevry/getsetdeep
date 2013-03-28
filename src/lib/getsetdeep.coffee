# Import
typeChecker = require('typechecker')

# Define
getsetdeep =
	# Get Deep
	getDeep: (location,keys) ->
		# Prepare
		keys = keys.split('.')  unless typeChecker.isArray(keys)

		# Check
		if keys.length is 0 or typeof location is 'undefined'
			result = undefined
		else if location is null
			result = null
		else
			key = keys[0]
			location = location.attributes ? location
			location = if typeof location[key] is 'undefined' then undefined else location[key]
			if keys.length is 1
				result = location
			else
				result = @getDeep(location, keys[1...])

		# Return
		return result

	# Set Deep
	setDeep: (location,keys,value,onlyIfEmpty=false) ->
		# Prepare
		keys = keys.split('.')  unless typeChecker.isArray(keys)

		# Check
		return undefined  if keys.length is 0

		# Check
		if keys.length is 0 or typeof location is 'undefined'
			result = undefined
		else if location is null
			result = null
		else
			key = keys[0]
			location = location.attributes ? location
			if keys.length is 1
				if onlyIfEmpty
					location[key] ?= value
				else
					if typeof value is 'undefined'
						delete location[key]  if typeof location[key] isnt 'undefined'
					else
						location[key] = value
				result = location[key]
			else
				location = location[key] ?= {}
				result = @setDeep(location, keys[1...], value, onlyIfEmpty)

		# Return
		return result

# Export
module.exports = getsetdeep