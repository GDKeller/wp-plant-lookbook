import { __ } from "@wordpress/i18n";
import { registerBlockType, BlockEditProps } from "@wordpress/blocks";
import {
	useBlockProps,
	MediaUploadCheck,
	MediaUpload,
	InspectorControls,
	RichText,
	InnerBlocks
} from "@wordpress/block-editor";
import classNames from "classnames";
import {
	Button,
	PanelBody,
	PanelRow,
	SelectControl,
} from "@wordpress/components";

registerBlockType("plants-lookbook-plugin/biome", {
	title: "Biome",
	category: "custom-blocks",
	attributes: {
		biomeName: { type: "string", default: "" },
		biomeContentPosition: { type: "string", default: "bottomleft" },
		biomeImage: { type: "object", default: {} }
	},
	edit: ({ attributes, setAttributes }: BlockEditProps<any>) => {
		const {
			biomeName,
			biomeContentPosition,
			biomeImage
		} = attributes;

		const blockProps = useBlockProps({
			className: classNames(
				"wp-block-plants-lookbook-biome",
				"biome-block"
			),
		});

		return (
			<>
				<InspectorControls>
					<PanelBody
						title={__("Settings", "plants-lookbook-plugin")}
						initialOpen={true}
					>
						<PanelRow>
							<fieldset>
							<SelectControl
								label={__("Content Position", "plants-lookbook-plugin")}
								value={biomeContentPosition}
								options={[
									{ label: "Bottom Left", value: "bottomleft" },
									{ label: "Bottom Right", value: "bottomright" },
									{ label: "Top Left", value: "topleft" },
									{ label: "Top Right", value: "topright" }
								]}
								onChange={(val: string) => setAttributes({ biomeContentPosition: val })}
							/>
							<MediaUploadCheck>
								<MediaUpload
									onSelect={(media: { id: number; url: string; alt: string; }) => {
										setAttributes({
											biomeImage: {
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
											{biomeImage?.url ? (
												<>
													<div>
														<img
															src={biomeImage?.sizes?.full?.url || biomeImage.url}
															alt={biomeImage.alt || ""}
														/>
													</div>
													<div>
														<Button
															onClick={() => setAttributes({ biomeImage: {} })}
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
							</fieldset>
						</PanelRow>
					</PanelBody>

				</InspectorControls>

				<div {...blockProps}>
					<div className={`biome-block__content ${biomeContentPosition}`}>
						<div className="biome-block__info">
							<div className="biome-block__info-inner">
								<RichText
									tagName="h2"
									className="biome-block__name"
									value={biomeName}
									onChange={(val: string) => setAttributes({ biomeName: val })}
									placeholder="Enter biome name"
								/>
								<InnerBlocks
									allowedBlocks={["core/paragraph"]}
									template={[["core/paragraph", { placeholder: "Enter biome description" }]]}
									templateLock={false}
								/>
							</div>
						</div>
						<div className="biome-block__image-container">
							{biomeImage?.url ? (
								<img
									src={biomeImage?.sizes?.full?.url || biomeImage.url}
									alt={biomeImage.alt || ""}
								/>
							) : (
								<div className="biome-block__image-placeholder">
									{__("No image selected", "plants-lookbook-plugin")}
								</div>
							)}								
						</div>
					</div>
				</div>
			</>
		);
	},
	save: () => <InnerBlocks.Content />,
});