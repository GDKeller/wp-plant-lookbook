<?php
/**
 * Template for rendering the Biome block on the front end.
 *
 * The Biome block presents a named environment (or "biome") with a label,
 * optional image, and content positioned in one of four corners.
 * It supports full alignment and a dynamic layout based on user settings.
 *
 * @package Plants_Lookbook
 */

// Extract attributes with defaults for safety and fallback rendering.
$name             = $attributes['biomeName'] ?? '';
$content_position = $attributes['biomeContentPosition'] ?? 'bottomleft';
$image            = $attributes['biomeImage'] ?? array();
$image_url        = ! empty( $image['url'] ) ? $image['url'] : '';
$image_alt        = ! empty( $image['alt'] ) ? $image['alt'] : $name;

// Generate a unique ID for accessibility anchoring and section labeling.
$instance_id = wp_unique_id( 'wp-block-plants-lookbook-biome-' );

// Construct an array of CSS classes based on layout and settings.
$classes = array( 'wp-block-plants-lookbook-biome', 'alignfull' );

// Add a class based on user-selected content position (e.g. bottomleft).
$classes[] = $content_position;

// Allow additional custom class names from the block editor UI.
if ( ! empty( $attributes['className'] ) ) {
	$classes[] = $attributes['className'];
}

$classes_str = implode( ' ', $classes );
?>

<section class="<?php echo esc_attr( $classes_str ); ?>" role="region" aria-labelledby="<?php echo esc_attr( $instance_id ); ?>">
	<div class="wp-block-plants-lookbook-biome__info">
		<div class="wp-block-plants-lookbook-biome__info-inner">
			<h2 id="<?php echo esc_attr( $instance_id ); ?>" class="wp-block-plants-lookbook-biome__name"><?php echo esc_html( $name ); ?></h2>

			<div class="wp-block-plants-lookbook-biome__description">
				<?php echo wp_kses_post( $content ); ?>
			</div>
		</div>
	</div>

	<?php if ( $image_url ) : ?>
		<div class="wp-block-plants-lookbook-biome__image-container">
			<img
				src="<?php echo esc_url( $image_url ); ?>"
				alt="<?php echo esc_attr( $image_alt ); ?>"
				loading="lazy"
			/>
		</div>
	<?php endif; ?>
</section>