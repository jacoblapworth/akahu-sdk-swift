(function () {
	'use strict';

	var classReplacements={"xui-u-flex-verticallycentered":'xui-u-flex-align-center',"xui-u-flex-horizontallycentered":'xui-u-flex-justify-center',"xui-u-flex-horizontal":'xui-u-flex-row',"xui-u-flex-vertical":'xui-u-flex-column',"xui-u-spacebetween":'xui-u-flex-space-between',"xui-u-flex-space-between":'xui-u-flex-justify-space-between',"xui-u-flex-space-between-medium":'xui-u-flex-justify-space-between-medium',"xui-u-flex-space-between-wide":'xui-u-flex-justify-space-between-wide',"xui-u-flex-space-around":'xui-u-flex-justify-space-around',"xui-u-flex-space-around-medium":'xui-u-flex-justify-space-around-medium',"xui-u-flex-space-around-wide":'xui-u-flex-justify-space-around-wide',"xui-u-flex-justify-left":'xui-u-flex-justify-start',"xui-u-flex-justify-left-medium":'xui-u-flex-justify-start-medium',"xui-u-flex-justify-left-wide":'xui-u-flex-justify-start-wide',"xui-u-flex-justify-right":'xui-u-flex-justify-end',"xui-u-flex-justify-right-medium":'xui-u-flex-justify-end-medium',"xui-u-flex-justify-right-wide":'xui-u-flex-justify-end-wide'};

	var componentTransforms={};

	const replaceClassNames = path => {
		//raw will include the used quotes, value will not
		const classList = path.node.value.split(' ');
		const replacements = classList.reduce((replacements, className) => {
			const replacement = classReplacements[className];
			if (replacement !== undefined) {
				return Object.assign({}, replacements, { [className]: replacement });
			}
			return replacements;
		}, {});
		if (Object.keys(replacements).length > 0) {
			const newClassString = Object.keys(replacements)
				.reduce((newClassString, replacedClass) =>
					newClassString.replace(replacedClass, replacements[replacedClass])
				, path.node.raw);
			path.replace(newClassString);
		}
		return path.node;
	};

	const classTransform = (j, root) =>
		root.find(j.Literal)
			.filter(path => typeof path.node.value === 'string')
			.forEach(replaceClassNames);

	/**
	 * 
	 * @param {object} j - the jscodeshift `j` variable found in their docs
	 * @param {*} path - the parent ast path with the full scope of what should be looked at.
	 * @param {*} transform - the component level transform to be applied
	 */
	function transformProps(j, path, transform) {
		const propTransforms = transform.props || [];
		const newAttributes = transform.props.reduce((attributes, propTransform) => {
			const propName = propTransform.name;
			const existingASXAttribute = path.value.openingElement.attributes
				.find(attribute => attribute.name != null && attribute.name.name === propName);

			const value = propTransform.valueTransform != null
				? propTransform.valueTransform(existingASXAttribute, j)
				: existingASXAttribute.value;
			if (value === undefined) {
				return attributes;
			}
			const identifier = propTransform.newName == null
				? j.jsxIdentifier(propTransform.name)
				: j.jsxIdentifier(propTransform.newName);
			return [
				...attributes,
				j.jsxAttribute(identifier, value)
			];
		}, []);

		path.value.openingElement.attributes = newAttributes != null ? [
			...path.value.openingElement.attributes.filter(a =>
				a.type === 'JSXSpreadAttribute'
				|| !transform.props.find(prop => prop.name === a.name.name)
			),
			...newAttributes,
		] : path.value.openingElement.attributes;
		return path.node;
	}

	const transformComponents = (j, root) => {
		root.find(j.ImportDeclaration).forEach(path => {
			const importDeclaration = path.node;
			const transformsForImport = componentTransforms[importDeclaration.source.value] || [];
			const importedComponents = importDeclaration.specifiers;

			return transformsForImport.forEach(transform => {
				const importToTransform = importedComponents.find(importedComponent =>
					importedComponent.type === 'ImportDefaultSpecifier' && transform.isDefault ||
					importedComponent.local.name === transform.name
				);
				if (importToTransform != null) {
					const componentName = importToTransform.local.name;
					root.findJSXElements(componentName)
						.replaceWith(p => transformProps(j, p, transform));

					root.find(j.Identifier)
						.filter(path =>  path.value.name === componentName && transform.newName != null)
						.replaceWith(path => {
							path.value.name = transform.newName;
							return path.node;
						});
				}
			});
		});
		return root;
	};

	module.exports = (file, api, options) => {
		const printOptions = options.printOptions || { quote: 'single' };
		const j = api.jscodeshift;
		let root = j(file.source);

		root = transformComponents(j, root);
		root = classTransform(j, root);

		return root.toSource(printOptions);
	};

}());
