'use strict'

// Import
const typeChecker = require('typechecker')

// Define
const getsetdeep = {
	// Get Deep
	getDeep(item, keys) {
		// Split keys if they are a string
		if (typeChecker.isString(keys)) {
			keys = keys.split('.')
		}

		// Return if we have no keys
		if (keys.length === 0) {
			return
		}

		// Return if we have no object
		if (!item) {
			return
		}

		// Return if we are not a delveable type like object or function
		if (!typeChecker.isObject(item) && !typeChecker.isFunction(item)) {
			return
		}

		// Get the deepmost item
		for (let i = 0, n = keys.length - 1; i < n; ++i) {
			const key = keys[i]
			item = this.getDeep(item, key)
			if (!item) {
				return
			}
		}

		// We've gotten the deepmost item, get the value now
		const key = keys[keys.length - 1]
		const result = item.get != null ? item.get(key) : item[key]

		// Return
		return result
	},

	// Set Deep
	setDeep(item, keys, value, opts = {}) {
		// Prepare
		if (opts.onlyIfEmpty == null) {
			opts.onlyIfEmpty = false
		}

		// Split keys if they are a string
		if (typeChecker.isString(keys)) {
			keys = keys.split('.')
		}

		// Check
		if (keys.length === 0) {
			return
		}

		// Get the deepmost item
		for (let i = 0, n = keys.length - 1; i < n; ++i) {
			const key = keys[i]
			const tmp = this.getDeep(item, key)
			if (tmp) {
				item = tmp
			} else {
				item = this.setDeep(item, key, {}, opts)
			}
		}

		// We've gotten the deepmost item, set the value now
		const key = keys[keys.length - 1]
		let result = this.getDeep(item, key)
		if (!opts.onlyIfEmpty || result == null) {
			if (item.set != null) {
				const attrs = {}
				attrs[key] = value
				item.set(attrs, opts)
			} else {
				item[key] = value
			}
		}

		// Fetch the actual applied value, could be different than what we set
		result = this.getDeep(item, key)

		// Return
		return result
	}
}

// Export
module.exports = getsetdeep
