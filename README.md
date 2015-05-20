# Driving License Validator

## About
This is a simple javascript library for validating driving license numbers.
Currently only the United States is supported, however we may in future add support for additional countries.

## Usage

To use do the following

- Include the dlnvalidator.js file in your HTML page. 

   <code>&lt;script src="dlnvalidator.js"&gt;&lt;/script&gt;</code>

- To validate a driver license you call the validator like this:

   dlnValidator.isValid('US','CA', 'a1234567')

	- The first argument is the ISO 2 or ISO 3 character country code.
	- The second argument is the region the license is for. In the U.S. this will be the 2 character state.
	- The third argument is the driving license number
	- The validator will return true if valid, false if invalid and raise an exception if given an unsupported country and/or region.

## Tests
A large series of tests are implemented in tests.html using QUnit. You can also refer to this file for examples of how to use this validator.

## License

Licensed under the MIT license.
