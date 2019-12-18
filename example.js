'use strict'

// Import
const { setDeep, getDeep } = require('./')

// Prepare
const obj = {
	a: {
		b: {
			c: 3
		}
	}
}

// Get
console.log(getDeep(obj, 'a.b.c')) // 3
console.log(setDeep(obj, 'a.b.c', 4)) // 4
console.log(getDeep(obj, 'a.b.c')) // 4
