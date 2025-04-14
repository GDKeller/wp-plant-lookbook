( function( wp ) {
    const { registerBlockType } = wp.blocks;
    const { createElement } = wp.element;
    const { useBlockProps, MediaUpload } = wp.blockEditor;
	const { TextControl, TextareaControl, Button } = wp.components;

    registerBlockType( "plants-plugin/biome", {
        title: "Biome",
        category: "custom-blocks",
		attributes: {
			biomeName: { type: "string", default: "" },
			biomeDescription: { type: "string", default: "" },
			biomeImage: { type: "object", default: {} }
		},
        edit: function({ attributes, setAttributes }) {
			const { biomeName, biomeDescription, biomeImage } = attributes;

            return createElement(
				'div',
				useBlockProps(),
				createElement(TextControl, {
					label: 'Name',
					value: biomeName,
					onChange: (val) => setAttributes({ biomeName: val })
				}),
				createElement(TextareaControl, {
					label: 'Description',
					value: biomeDescription,
					onChange: (val) => setAttributes({ biomeDescription: val })
				}),
				createElement(MediaUpload, {
					onSelect: (media) => setAttributes({ biomeImage: media }),
					allowedTypes: ['image'],
					render: ({ open }) =>
						createElement(Button, { onClick: open, isSecondary: true }, biomeImage ? 'Change Image' : 'Select Image')
				}),
				biomeImage &&
					createElement('img', {
						src: biomeImage.url,
						alt: biomeImage.alt || '',
						style: { maxWidth: '100%', marginTop: '1em' }
					})
			);
		},
		save: () => null
	});
} )( window.wp );
