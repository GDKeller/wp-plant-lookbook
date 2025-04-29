import { __ } from '@wordpress/i18n';
import { BlockEditProps, registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, InspectorControls, MediaUpload, MediaUploadCheck, RichText, useBlockProps } from '@wordpress/block-editor';
import { Button, PanelBody, SelectControl } from '@wordpress/components';
import classNames from 'classnames';

/**
 * Block attributes interface
 */
interface CustomBlockAttributes {
	biomeName: string;
	biomeContentPosition: 'bottomleft' | 'bottomright' | 'topleft' | 'topright';
	biomeImage: {
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
 * Edit function for the Biome block
 */
const Edit = ({ attributes, setAttributes }: BlockEditProps<CustomBlockAttributes>) => {
	const { biomeName, biomeContentPosition, biomeImage } = attributes;

	const blockProps = useBlockProps({
		className: classNames(
			'wp-block-plants-lookbook-biome',
			'alignfull',
			biomeContentPosition
		)
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Settings', 'plants-lookbook-plugin')} initialOpen={true}>
					<SelectControl
						label={__('Content Position', 'plants-lookbook-plugin')}
						value={biomeContentPosition}
						options={[
							{ label: __('Bottom Left', 'plants-lookbook-plugin'), value: 'bottomleft' },
							{ label: __('Bottom Right', 'plants-lookbook-plugin'), value: 'bottomright' },
							{ label: __('Top Left', 'plants-lookbook-plugin'), value: 'topleft' },
							{ label: __('Top Right', 'plants-lookbook-plugin'), value: 'topright' }
						]}
						onChange={(value) =>
							setAttributes({ biomeContentPosition: value as CustomBlockAttributes['biomeContentPosition'] })
						}
					/>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media: CustomBlockAttributes['biomeImage']) =>
								setAttributes({
									biomeImage: {
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
									{biomeImage?.url ? (
										<>
											<div>
												<img
													src={biomeImage?.sizes?.full?.url ?? biomeImage.url ?? ''}
													alt={biomeImage.alt || biomeName || ''}
												/>
											</div>
											<Button
												onClick={() =>
													setAttributes({
														biomeImage: { id: undefined, url: '', alt: '', sizes: {} }
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
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="wp-block-plants-lookbook-biome__info">
					<div className="wp-block-plants-lookbook-biome__info-inner">
						<RichText
							tagName="h2"
							className="wp-block-plants-lookbook-biome__name"
							value={biomeName}
							onChange={(value: string) => setAttributes({ biomeName: value })}
							placeholder={__('Enter biome name', 'plants-lookbook-plugin')}
						/>
						<InnerBlocks
							allowedBlocks={['core/paragraph']}
							template={[['core/paragraph', { placeholder: __('Enter biome description', 'plants-lookbook-plugin') }]]}
							templateLock={false}
						/>
					</div>
				</div>

				<div className="wp-block-plants-lookbook-biome__image-container">
					{biomeImage?.url ? (
						<img
							src={biomeImage?.sizes?.full?.url ?? biomeImage.url ?? ''}
							alt={biomeImage.alt || biomeName || ''}
						/>
					) : (
						<div className="wp-block-plants-lookbook-biome__image-placeholder">
							{__('No image selected', 'plants-lookbook-plugin')}
						</div>
					)}
				</div>
			</div>
		</>
	);
};

/**
 * Save function for the Biome block
 */
const Save = () => {
	return (
		<InnerBlocks.Content />
	);
};

/**
 * Block registration for the Biome block
 */
registerBlockType('plants-lookbook-plugin/biome', {
	title: 'Biome',
	category: 'custom-blocks',
	attributes: {
		biomeName: { type: 'string', default: '' },
		biomeContentPosition: { type: 'string', default: 'bottomleft' },
		biomeImage: { type: 'object', default: {} }
	},
	edit: Edit,
	save: Save
});