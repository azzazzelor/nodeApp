const chai = require('chai');
const should = chai.should();
const assert = require('assert');

const validationService = require('../../app/services/validation.service');

describe('Run tests for Validation service', () => {
	describe('Test validateEmail method:', () => {
		it('it should returne "erorr: 1" for email on missing data', () => {
			const result = validationService.validateEmail();

			assert.equal(result.code, 100001);
		});

		it('it should returne "error: 0" for valid email tester@mail.com', () => {
			const result = validationService.validateEmail('tester@mail.com');

			assert.equal(result.error, 0);
		});

		it('it should returne "erorr: 1" for invalid email tester@mail', () => {
			const result = validationService.validateEmail('tester@mail');

			assert.equal(result.error, 1);
		});

		it('it should returne "code: 100001" for invalid email tester@mail', () => {
			const result = validationService.validateEmail('tester@mail');

			assert.equal(result.code, 100001);
		});
	});

	describe('Test validatePassword method:', () => {
		it('it should returne "erorr: 1" for password on missing data', () => {
			const result = validationService.validatePassword();

			assert.equal(result.code, 100002);
		});

		it('it should returne "error: 0" for valid password Ruehb243!@', () => {
			const result = validationService.validatePassword('Ruehb243!@');

			assert.equal(result.error, 0);
		});

		it('it should returne "erorr: 1" for invalid password 11111', () => {
			const result = validationService.validatePassword('11111');

			assert.equal(result.error, 1);
		});

		it('it should returne "code: 100002" for invalid password 11111', () => {
			const result = validationService.validatePassword('11111');

			assert.equal(result.code, 100002);
		});
	});

	describe('Test validatePhoneNumber method:', () => {
		it('it should returne "erorr: 1" for phone number on missing data', () => {
			const result = validationService.validatePhoneNumber();

			assert.equal(result.code, 100003);
		});

		it('it should returne "error: 0" for valid phone number 380971234567', () => {
			const result = validationService.validatePhoneNumber('380971234567');

			assert.equal(result.error, 0);
		});

		it('it should returne "erorr: 1" for invalid phone number 11111', () => {
			const result = validationService.validatePhoneNumber('11111');

			assert.equal(result.error, 1);
		});

		it('it should returne "code: 100003" for phone number 11111', () => {
			const result = validationService.validatePhoneNumber('11111');

			assert.equal(result.code, 100003);
		});
	});

	describe('Test validateRoleType method:', () => {
		it('it should returne "erorr: 1" for role of type on missing data', () => {
			const result = validationService.validateRoleType();

			assert.equal(result.code, 100004);
		});

		it('it should returne "error: 0" for valid role type: "student"', () => {
			const result = validationService.validateRoleType('student');

			assert.equal(result.error, 0);
		});

		it('it should returne "erorr: 1" for invalid role type: "root"', () => {
			const result = validationService.validateRoleType('root');

			assert.equal(result.error, 1);
		});

		it('it should returne "code: 100004" for role type: "root"', () => {
			const result = validationService.validateRoleType('root');

			assert.equal(result.code, 100004);
		});
	});
});