import { __ } from '@wordpress/i18n';
import { BlockEditProps, registerBlockType } from '@wordpress/blocks';
import { InspectorControls, MediaUpload, MediaUploadCheck, RichText, useBlockProps } from '@wordpress/block-editor';
import { Button, PanelBody, ToggleControl } from '@wordpress/components';
import classNames from 'classnames';

/**
 * Block attributes interface
 */
interface CustomBlockAttributes {
	flipped: boolean;
	speciesFormalName: string;
	speciesCommonName: string;
	speciesDescription: string;
	speciesImage: {
		id?: number;
		url?: string;
		alt?: string;
		sizes?: {
			full?: {
				url: string;
			};
		};
	};
}

/**
 * Edit function for the Species block
 */
const Edit = ({ attributes, setAttributes }: BlockEditProps<CustomBlockAttributes>) => {
	const { flipped, speciesCommonName, speciesFormalName, speciesDescription, speciesImage } = attributes;

	const blockProps = useBlockProps({
		className: classNames('wp-block-plants-lookbook-species', {
			'is-flipped': flipped
		})
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Settings', 'plants-lookbook-plugin')} initialOpen={true}>
					<ToggleControl
						label={__('Flip Layout', 'plants-lookbook-plugin')}
						checked={flipped}
						onChange={(value) => setAttributes({ flipped: value })}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="wp-block-plants-lookbook-species__info">
					<div className="wp-block-plants-lookbook-species__info-inner">
						<RichText
							tagName="h2"
							className="wp-block-plants-lookbook-species__name"
							value={speciesCommonName}
							onChange={(value: string) => setAttributes({ speciesCommonName: value })}
							placeholder={__('Species name', 'plants-lookbook-plugin')}
						/>
						<RichText
							tagName="h3"
							className="wp-block-plants-lookbook-species__binomial"
							value={speciesFormalName}
							onChange={(value: string) => setAttributes({ speciesFormalName: value })}
							placeholder={__('Scientific name', 'plants-lookbook-plugin')}
						/>
						<RichText
							tagName="p"
							className="wp-block-plants-lookbook-species__description"
							value={speciesDescription}
							onChange={(value: string) => setAttributes({ speciesDescription: value })}
							placeholder={__('Species description', 'plants-lookbook-plugin')}
						/>
					</div>
				</div>

				<div className="wp-block-plants-lookbook-species__image-container">
					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media: CustomBlockAttributes['speciesImage']) =>
								setAttributes({
									speciesImage: {
										id: media.id,
										url: media.url,
										alt: media.alt
									}
								})
							}
							title={__('Choose Image', 'plants-lookbook-plugin')}
							multiple={false}
							allowedTypes={['image']}
							render={({ open }) => (
								<div className="media-upload-controls">
									{speciesImage?.url ? (
										<>
											<div>
												<img
													src={speciesImage?.sizes?.full?.url ?? speciesImage?.url ?? ''}
													alt={speciesImage.alt || ''}
												/>
											</div>
											<Button
												onClick={() =>
													setAttributes({
														speciesImage: { id: undefined, url: '', alt: '', sizes: {} }
													})
												}
												variant="secondary"
											>
												{__('Remove Image', 'plants-lookbook-plugin')}
											</Button>
										</>
									) : (
										<Button onClick={open} variant="secondary">
											{__('Choose Image', 'plants-lookbook-plugin')}
										</Button>
									)}
								</div>
							)}
						/>
					</MediaUploadCheck>
				</div>
			</div>
		</>
	);
};

/**
 * Save function (returns null for dynamic rendering)
 */
const Save = () => {
	return null;
};

registerBlockType('plants-lookbook-plugin/species', {
	title: 'Species',
	category: 'custom-blocks',
	attributes: {
		flipped: { type: 'boolean', default: false },
		speciesFormalName: { type: 'string', default: '' },
		speciesCommonName: { type: 'string', default: '' },
		speciesDescription: { type: 'string', default: '' },
		speciesImage: { type: 'object', default: {} }
	},
	edit: Edit,
	save: Save
});