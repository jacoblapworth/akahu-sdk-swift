import React from 'react';
import { decorateSubStr } from '../highlighting';

const boldMatch = str => (<strong>{str}</strong>);

describe('Bolding text', () => {
	it('should return bolded characters based on my search term', () => {
		const searchTerm = 'a';
		const value = 'Fay';

		const matchResult = decorateSubStr(value, searchTerm, boldMatch);

		expect(matchResult).toHaveLength(3);
		expect(typeof matchResult).toEqual('object');
		expect(matchResult[1].type).toEqual('strong');
	});

	it('should return bolded results when two of the same search terms are together', () => {
		const searchTerm = 'n';
		const value = 'Anna';
		const matchResult = decorateSubStr(value, searchTerm, boldMatch);

		expect(matchResult).toHaveLength(4);
		expect(matchResult[1].type).toEqual('strong');
		expect(matchResult[2].type).toEqual('strong');
	});

	it('should return the string with no bolding when there is no match form the search term', () => {
		const searchTerm = 'a';
		const value = 'Frederick';
		const matchResult = decorateSubStr(value, searchTerm, boldMatch);

		expect(typeof matchResult).toEqual('string');
	});

	it('should bold the character in both upper and lower case', () => {
		const searchTerm = 'a';
		const value = 'Anna';
		const matchResult = decorateSubStr(value, searchTerm, boldMatch);

		expect(matchResult).toHaveLength(3);
		expect(matchResult[0].type).toEqual('strong');
		expect(matchResult[2].type).toEqual('strong');
	});
});
