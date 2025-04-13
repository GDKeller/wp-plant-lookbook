( function( wp ) {
    const { registerBlockType } = wp.blocks;
    const { createElement } = wp.element;
    const { useBlockProps, MediaUpload } = wp.blockEditor;
	const { TextControl, TextareaControl, Button, ToggleControl } = wp.components;

    registerBlockType( "plants-plugin/species", {
        title: "Species",
        category: "custom-blocks",
		attributes: {
			flipped: { type: "boolean", default: false },
			speciesFormalName: { type: "string", default: "" },
			speciesCommonName: { type: "string", default: "" },
			speciesDescription: { type: "string", default: "" },
			speciesImage: { type: "object", default: {} }
		},
        edit: function({ attributes, setAttributes }) {
			const { flipped, speciesCommonName, speciesFormalName, speciesDescription, speciesImage } = attributes;
		
			return createElement(
				'div',
				useBlockProps({ className: flipped ? 'wp-block-plants-plugin-species species-block flipped' : 'wp-block-plants-plugin-species species-block' }),
					[
					createElement('div', { className: 'settings' }, [
						createElement(ToggleControl, {
							label: 'Flip Layout',
							checked: flipped,
							onChange: (val) => setAttributes({ flipped: val })
						}),
					]),
					createElement('div', { className: 'content' }, [
						createElement('div', { className: 'species-info' }, [
							createElement(TextControl, {
								label: 'Common Name',
								value: speciesCommonName,
								onChange: (val) => setAttributes({ speciesCommonName: val })
							}),
							createElement(TextControl, {
								label: 'Scientific Name',
								value: speciesFormalName,
								onChange: (val) => setAttributes({ speciesFormalName: val })
							}),
							createElement(TextareaControl, {
								label: 'Description',
								value: speciesDescription,
								onChange: (val) => setAttributes({ speciesDescription: val })
							})
						]),
						speciesImage && createElement(
							'div',
							{},
							createElement('img', {
								src: speciesImage.url,
								alt: speciesImage.alt || '',
								style: { maxWidth: '100%', marginTop: '1em' }
							})
						)
					]),
				]
			);
		},
		save: () => null
	});
} )( window.wp );
