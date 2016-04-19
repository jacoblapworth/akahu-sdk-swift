import XuiIconBlob from '../src/XuiIconBlob';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

export default function (){
	return ReactDOMServer.renderToStaticMarkup(<XuiIconBlob/>);
}