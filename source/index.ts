// Import
import { isObject, isFunction } from 'typechecker'

/* Options for setting */
interface SetterOptions {
	/** If true, only set the attribute if its source value is empty */
	onlyIfEmpty?: boolean
}

/** An indexed object that we can operate on */
type IndexedObject = {
	[key: string]: any
}

/** A model that we can operate on */
interface Model {
	get(key: string): any
	set(attrs: IndexedObject, opts?: SetterOptions): any
}

/** Get a nested value within the subject */
export function getDeep(
	subject: IndexedObject | Model,
	keys: string | string[],
) {
	// Split keys if they are a string
	if (typeof keys === 'string') {
		keys = keys.split('.')
	}

	// Return if we have no keys
	if (keys.length === 0) {
		return
	}

	// Return if we have no object
	if (!subject) {
		return
	}

	// Return if we are not a delveable type like object or function
	if (!isObject(subject) && !isFunction(subject)) {
		return
	}

	// Get the deepmost item
	for (let i = 0, n = keys.length - 1; i < n; ++i) {
		const key = keys[i]
		subject = getDeep(subject, key)
		if (!subject) {
			return
		}
	}

	// We've gotten the deepmost item, get the value now
	const key = keys[keys.length - 1]
	const result =
		subject.get != null ? subject.get(key) : (subject as IndexedObject)[key]

	// Return
	return result
}

/** Set a nested value within the subject */
export function setDeep(
	subject: IndexedObject | Model,
	keys: string | string[],
	value: any,
	opts: SetterOptions = {},
): any {
	// Prepare
	if (opts.onlyIfEmpty == null) {
		opts.onlyIfEmpty = false
	}

	// Split keys if they are a string
	if (typeof keys === 'string') {
		keys = keys.split('.')
	}

	// Check
	if (keys.length === 0) {
		return
	}

	// Get the deepmost item
	for (let i = 0, n = keys.length - 1; i < n; ++i) {
		const key = keys[i]
		const tmp = getDeep(subject, key)
		if (tmp) {
			subject = tmp
		} else {
			subject = setDeep(subject, key, {}, opts)
		}
	}

	// We've gotten the deepmost item, set the value now
	const key = keys[keys.length - 1]
	let result = getDeep(subject, key)
	if (!opts.onlyIfEmpty || result == null) {
		// model
		if (subject.set != null) {
			const attrs: IndexedObject = {}
			attrs[key] = value
			subject.set(attrs, opts)
		} else {
			// object
			;(subject as IndexedObject)[key] = value
		}
	}

	// Fetch the actual applied value, could be different than what we set
	result = getDeep(subject, key)

	// Return
	return result
}
