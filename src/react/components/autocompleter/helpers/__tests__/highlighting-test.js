import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { decorateSubStr } from '../highlighting.js';

const TestUtils = require('react-dom/test-utils');;

const res = [{id: 1, name: 'Fay'}, {id: 2, name: 'James'}, {id: 3, name: 'Anna'}];
const boldMatch = (str) => (<strong>{str}</strong>);

describe('Bolding text', () => {
	it('should return bolded characters based on my search term', () => {
		const searchTerm = "a";
		const value = "Fay";

		const matchResult = decorateSubStr(value, searchTerm, boldMatch);

		expect(matchResult.length).to.eql(3);
		expect(typeof matchResult).to.eql('object');
		expect(matchResult[1].type).to.eql('strong');
	});

	it('should return bolded results when two of the same search terms are together i.e Anna, nn should be in bold', () => {
		const searchTerm = "n";
		const value = "Anna";
		const matchResult = decorateSubStr(value, searchTerm, boldMatch);

		expect(matchResult.length).to.eql(4);
		expect(matchResult[1].type).to.eql('strong');
		expect(matchResult[2].type).to.eql('strong');
	});

	it('should return the string with no bolding when there is no match form the search term', () => {
		const searchTerm = "a";
		const value = "Frederick";
		const matchResult = decorateSubStr(value, searchTerm, boldMatch);

		expect(typeof matchResult).to.eql('string');
	});

	it('should bold the character in upper and lower case i.e. the a from Anna should be bolded twice ', () => {
		const searchTerm = "a";
		const value = "Anna";
		const matchResult = decorateSubStr(value, searchTerm, boldMatch);

		expect(matchResult.length).to.eql(3);
		expect(matchResult[0].type).to.eql('strong');
		expect(matchResult[2].type).to.eql('strong');
	});
})
