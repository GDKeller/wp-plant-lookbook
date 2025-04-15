import { __ } from "@wordpress/i18n";
import React from "react";
import { registerBlockType, BlockEditProps } from "@wordpress/blocks";
import { useBlockProps, MediaUploadCheck, MediaUpload, InspectorControls, RichText } from "@wordpress/block-editor";
import classNames from "classnames";
import {
	Button,
	ToggleControl,
	PanelBody,
	PanelRow,
} from "@wordpress/components";

registerBlockType("plants-lookbook/home-hero", {
	title: "Species",
	category: "custom-blocks",
	attributes: {
		headline: { type: "string", default: "" },
		subhead: { type: "string", default: "" },
		buttonText: { type: "string", default: "" },
		buttonLink: { type: "string", default: "" },
		image: { type: "object", default: {} },
	},
	edit: ({ attributes, setAttributes }: BlockEditProps<any>) => {
		const {
			headline,
			subhead,
			buttonText,
			buttonLink,
			image
		} = attributes;

		const blockProps = useBlockProps({
			className: classNames(
				"wp-block-plants-lookbook-home-hero",
				"species-block"
			),
		});

		return (
			<div {...blockProps}>
				<InspectorControls>
					<PanelBody
						title={__("Settings", "plants-lookbook")}
						initialOpen={true}
					>
						<PanelRow>
							<fieldset>
								<ToggleControl
									label="Flip Layout"
									checked={false}
									onChange={() => {}}
								/>
							</fieldset>
						</PanelRow>
					</PanelBody>

					<PanelBody
						title={__("Image", "plants-lookbook")}
						initialOpen={true}
					>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={(media) => {
									setAttributes({ image: media });
								}}
								render={({ open }) => (
									<Button onClick={open} variant="secondary" isLarge>
										{!image.id ? __("Choose Image", "plants-lookbook") : <img src={image.sizes.full.url} alt="" />}
									</Button>
								)}
							/>
						</MediaUploadCheck>
					</PanelBody>

				</InspectorControls>

				<div className="hero-content">
					<RichText
						tagName="h1"
						value={headline}
						onChange={(val) => setAttributes({ headline: val })}
						className="headline"
						placeholder={__("Headline", "plants-lookbook")}
					/>
					<RichText
						tagName="p"
						value={subhead}
						onChange={(val) => setAttributes({ subhead: val })}
						className="subhead"
						placeholder={__("Subhead", "plants-lookbook")}
					/>
					<Button
						className="hero-button"
						href={buttonLink}
					>
						{buttonText}
					</Button>
				</div>

				{image.id && (
					<img src={image.sizes.full.url} alt="" className="hero-image" />
				)}
			</div>
		);
	},
	save: () => null
});