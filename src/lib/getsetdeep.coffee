# Import
typeChecker = require('typechecker')

# Define
getsetdeep =
	# Get Deep
	getDeep: (item,keys) ->
		# Split keys if they are a string
		keys = keys.split('.')  if typeChecker.isString(keys)

		# Return if we have no keys
		return undefined  if keys.length is 0

		# Return if we have no object
		return undefined  unless item

		# Return if we are not a delveable type like object or function
		return undefined  unless typeChecker.isObject(item) or typeChecker.isFunction(item)

		# Get the deepmost item
		for key in keys.slice(0,-1)
			item = @getDeep(item,key)
			return undefined  unless item

		# We've gotten the deepmost item, get the value now
		key = keys.slice(-1)[0]
		result = (if item.get? then item.get(key) else item[key])

		# Return
		return result


	# Set Deep
	setDeep: (item,keys,value,opts={}) ->
		# Prepare
		opts.onlyIfEmpty ?= false

		# Split keys if they are a string
		keys = keys.split('.')  if typeChecker.isString(keys)

		# Check
		return undefined  if keys.length is 0

		# Get the deepmost item
		for key in keys.slice(0,-1)
			item = @getDeep(item,key)
			item = @setDeep(item,key,{},opts)  unless item

		# We've gotten the deepmost item, set the value now
		key = keys.slice(-1)[0]
		result = @getDeep(item,key)
		if (opts.onlyIfEmpty and result?) is false
			if item.set?
				attrs = {}
				attrs[key] = value
				item.set(attrs,opts)
			else
				item[key] = value

		# Fetch the actual applied value, could be different than what we set
		result = @getDeep(item,key)

		# Return
		return result

# Export
module.exports = getsetdeep