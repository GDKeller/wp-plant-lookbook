( function( wp ) {
    const { registerBlockType } = wp.blocks;
    const { createElement } = wp.element;
    const { useBlockProps, MediaUpload } = wp.blockEditor;
	const { TextControl, TextareaControl, Button } = wp.components;

    registerBlockType( "plants-plugin/species", {
        title: "Species",
        category: "custom-blocks",
		attributes: {
			speciesFormalName: { type: "string", default: "" },
			speciesCommonName: { type: "string", default: "" },
			speciesDescription: { type: "string", default: "" },
			speciesImage: { type: "string", default: "" }
		},
        edit: function({ attributes, setAttributes }) {
			const { speciesCommonName, speciesFormalName, speciesDescription, speciesImage } = attributes;

            return createElement(
				'div',
				useBlockProps(),
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
				}),
				createElement(MediaUpload, {
					onSelect: (media) => setAttributes({ speciesImage: media }),
					allowedTypes: ['image'],
					render: ({ open }) =>
						createElement(Button, { onClick: open, isSecondary: true }, speciesImage ? 'Change Image' : 'Select Image')
				}),
				speciesImage &&
					createElement('img', {
						src: speciesImage.url,
						alt: speciesImage.alt || '',
						style: { maxWidth: '100%', marginTop: '1em' }
					})
			);
		},
		save: () => null
	});
} )( window.wp );
