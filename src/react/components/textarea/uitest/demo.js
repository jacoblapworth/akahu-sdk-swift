import React from 'react';
import ReactDOM from 'react-dom';
import XUITextArea from '../XUITextArea';

ReactDOM.render(
	<div className="xui-page-width-standard">
		<XUITextArea
			minRows={2}
			maxRows={5}
			maxCharacters={2000}>
			<label className="xui-text-label xui-fieldlabel-layout">This textarea auto-resizes</label>
		</XUITextArea>
		<XUITextArea
			rows={3}
			defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin posuere neque eget purus placerat feugiat. Proin et tortor bibendum, commodo eros ut, lobortis lorem. In ut orci ipsum. Vivamus eget pretium mauris, eu tempus velit. Etiam dolor nunc, tincidunt eget ex in, gravida varius est. Nullam vitae pretium leo. Curabitur eros odio, bibendum at diam quis, facilisis tincidunt quam. Morbi a mollis nulla. In velit leo, condimentum ac scelerisque nec, tincidunt sit amet odio. Proin posuere neque eget purus placerat feugiat. Proin et tortor bibendum, commodo eros ut, lobortis lorem. In ut orci ipsum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed posuere pulvinar nisl, eget fringilla arcu iaculis in. Etiam mauris ante, euismod ac ligula faucibus, varius auctor eros odio, est.  Morbi a mollis nulla. In velit leo, condimentum ac scelerisque nec, tincidunt sit amet odio. Proin posuere neque eget purus placerat feugiat. Proin et tortor bibendum, commodo eros ut, lobortis lorem. In ut orci ipsum. Curabitur eros odio,tincidunt non ipsum quis ieros odio, imperdiet. Proin et tortor bibendum, commodo eros ut, lobortis lorem.">
			<label className="xui-text-label xui-fieldlabel-layout">This textarea has a fixed height</label>
		</XUITextArea>
		<XUITextArea
			rows={3}
			isDisabled
			defaultValue="This textarea has no label and is disabled">
		</XUITextArea>
	</div>,
	document.getElementById('app')
);
