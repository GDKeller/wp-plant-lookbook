import { __ } from "@wordpress/i18n";
import { registerBlockType, BlockEditProps } from "@wordpress/blocks";
import { useBlockProps, MediaUploadCheck, MediaUpload, InspectorControls, RichText } from "@wordpress/block-editor";
import { __experimentalHeading as Heading } from '@wordpress/components';
import classNames from "classnames";
import {
	Button,
	ToggleControl,
	PanelBody,
	PanelRow,
} from "@wordpress/components";

registerBlockType("plants-lookbook-plugin/species", {
	title: "Species",
	category: "custom-blocks",
	attributes: {
		flipped: { type: "boolean", default: false },
		speciesFormalName: { type: "string", default: "" },
		speciesCommonName: { type: "string", default: "" },
		speciesDescription: { type: "string", default: "" },
		speciesImage: { type: "object", default: {} }
	},
	edit: ({ attributes, setAttributes }: BlockEditProps<any>) => {
		const {
			flipped,
			speciesCommonName,
			speciesFormalName,
			speciesDescription,
			speciesImage
		} = attributes;

		const blockProps = useBlockProps({
			className: classNames(
				"wp-block-plants-lookbook-species",
				"species-block",
				flipped ? "flipped" : ""
			),
		});

		return (
			<>
				<InspectorControls>
					<PanelBody
						title={__("Settings", "plants-lookbook-plguin")}
						initialOpen={true}
					>
						<PanelRow>
							<fieldset>
								<ToggleControl
									label="Flip Layout"
									checked={flipped}
									onChange={val => setAttributes({ flipped: val })}
								/>
							</fieldset>
						</PanelRow>
					</PanelBody>
				</InspectorControls>

				<div {...blockProps}>
					<div className="species-block__content">
						<div className="species-block__info">
							<div className="species-block__info-inner">
								<RichText
									tagName="h2"
									className="species-block__name"
									value={speciesCommonName}
									onChange={(val: string) => setAttributes({ speciesCommonName: val })}
									placeholder="Species name"
								/>
								<RichText
									tagName="h3"
									className="species-block__binomial"
									value={speciesFormalName}
									onChange={(val: string) => setAttributes({ speciesFormalName: val })}
									placeholder="Scientific name"
								/>
								<RichText
									tagName="p"
									className="species-block__description"
									value={speciesDescription}
									onChange={(val: string) => setAttributes({ speciesDescription: val })}
									placeholder="Species description"
								/>
							</div>
						</div>
						<div className="species-block__image-wrapper">
							<MediaUploadCheck>
								<MediaUpload
									onSelect={(media: { id: number; url: string; alt: string; }) => {
										setAttributes({
											speciesImage: {
												id: media.id,
												url: media.url,
												alt: media.alt
											}
										});
									}}
									title={__("Choose Image", "plants-lookbook-plugin")}
									multiple={false}
									allowedTypes={["image"]}
									render={({ open }) => (
										<div className="media-upload-controls">
											{speciesImage?.url ? (
												<>
													<div className="species-block__image-container">
														<img
															src={speciesImage?.sizes?.full?.url || speciesImage.url}
															alt={speciesImage.alt || ""}
														/>
													</div>
													<div>
														<Button
															onClick={() => setAttributes({ speciesImage: {} })}
															variant="secondary"
														>
															{__("Remove Image", "plants-lookbook-plugin")}
														</Button>
													</div>
												</>
											) : (
												<Button onClick={open} variant="secondary">
													{__("Choose Image", "plants-lookbook-plugin")}
												</Button>
											)}
										</div>
									)}
								/>
							</MediaUploadCheck>
						</div>
					</div>
				</div>
			</>
		);
	},
	save: () => null
});