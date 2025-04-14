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

registerBlockType("plants-plugin/species", {
	title: "Species",
	category: "custom-blocks",
	attributes: {
		anchor: { type: "string", default: "" },
		flipped: { type: "boolean", default: false },
		speciesFormalName: { type: "string", default: "" },
		speciesCommonName: { type: "string", default: "" },
		speciesDescription: { type: "string", default: "" },
		speciesImage: { type: "object", default: {} }
	},
	edit: ({ attributes, setAttributes }: BlockEditProps<any>) => {
		const {
			anchor,
			flipped,
			speciesCommonName,
			speciesFormalName,
			speciesDescription,
			speciesImage
		} = attributes;

		const blockProps = useBlockProps({
			className: classNames(
				"wp-block-plants-plugin-species",
				"species-block",
				flipped ? "flipped" : ""
			),
		});

		return (
			<>
				<InspectorControls>
					<PanelBody
						title={__("Settings", "plants-plugin")}
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
					<div className="content">
						<div className="species-info">
							<RichText
								tagName="h2"
								className="species-common-name"
								value={speciesCommonName}
								onChange={(val: string) => setAttributes({ speciesCommonName: val })}
								placeholder="Species name"
							/>
							<RichText
								tagName="h3"
								className="species-formal-name"
								value={speciesFormalName}
								onChange={(val: string) => setAttributes({ speciesFormalName: val })}
								placeholder="Scientific name"
							/>
							<RichText
								tagName="p"
								className="species-description"
								value={speciesDescription}
								onChange={(val: string) => setAttributes({ speciesDescription: val })}
								placeholder="Species description"
							/>
						</div>
						<div className="species-image">
							{speciesImage?.url ? (
								<div className="image-preview">
									<img
										src={speciesImage.url}
										alt={speciesImage.alt || ""}
										style={{ maxWidth: "100%", marginTop: "1em" }}
									/>
								</div>
							) : (
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
										title={__("Choose Image", "plants-plugin")}
										multiple={false}
										allowedTypes={["image"]}
										render={({ open }) => (
											<Button
												variant="primary"
												onClick={open}
											>
												{__("Upload Image", "plants-plugin")}
											</Button>
										)}
									/>
								</MediaUploadCheck>
							)}
						</div>
					</div>
				</div>
			</>
		);
	},
	save: () => null
});