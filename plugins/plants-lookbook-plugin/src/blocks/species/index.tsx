import { __ } from "@wordpress/i18n";
import { registerBlockType, BlockEditProps } from "@wordpress/blocks";
import { useBlockProps, MediaUploadCheck, MediaUpload, InspectorControls, RichText } from "@wordpress/block-editor";
import classNames from "classnames";
import {
	Button,
	ToggleControl,
	PanelBody
} from "@wordpress/components";

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

const Edit = ({ attributes, setAttributes }: BlockEditProps<CustomBlockAttributes>) => {
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
			flipped ? "is-flipped" : ""
		)
	});

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__("Settings", "plants-lookbook-plugin")}
					initialOpen={true}
				>
					<ToggleControl
						label="Flip Layout"
						checked={flipped}
						onChange={value => setAttributes({ flipped: value })}
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
							placeholder={__("Species name", "plants-lookbook-plugin")}
						/>
						<RichText
							tagName="h3"
							className="wp-block-plants-lookbook-species__binomial"
							value={speciesFormalName}
							onChange={(value: string) => setAttributes({ speciesFormalName: value })}
							placeholder={__("Scientific name", "plants-lookbook-plugin")}
						/>
						<RichText
							tagName="p"
							className="wp-block-plants-lookbook-species__description"
							value={speciesDescription}
							onChange={(value: string) => setAttributes({ speciesDescription: value })}
							placeholder={__("Species description", "plants-lookbook-plugin")}
						/>
					</div>
				</div>
				<div className="wp-block-plants-lookbook-species__image-container">
					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media: CustomBlockAttributes["speciesImage"]) => {
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
											<div>
												<img
													src={speciesImage?.sizes?.full?.url ?? speciesImage?.url ?? ""}
													alt={speciesImage.alt || ""}
												/>
											</div>
											<div>
												<Button
													onClick={() => setAttributes(
														{
															speciesImage: {
																id: undefined,
																url: "",
																alt: "",
																sizes: {}
															}
														})
													}
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
		</>
	);
}

const Save = () => {
	return null;
}

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
	edit: Edit,
	save: Save
});