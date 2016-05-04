import XUIIconBlob from '../src/XUIIconBlob';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

export default function (){
	return ReactDOMServer.renderToStaticMarkup(<XUIIconBlob/>);
}