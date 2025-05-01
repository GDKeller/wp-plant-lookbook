<?php
/**
 * Template for rendering the Species block on the front end.
 *
 * This block displays a species' common name, binomial name,
 * description, and an optional image with alt text for accessibility.
 *
 * The visual layout optionally flips depending on block attributes,
 * and full alignment is supported.
 *
 * @package Plants_Lookbook
 */

// Extract attributes with defaults for safety and fallback rendering.
$align    = $attributes['align'] ?? '';
$name     = $attributes['speciesCommonName'] ?? '';
$binomial = $attributes['speciesFormalName'] ?? '';
$desc     = $attributes['speciesDescription'] ?? '';

$image     = $attributes['speciesImage'] ?? array();
$image_url = ! empty( $image['url'] ) ? $image['url'] : '';
$image_alt = ! empty( $image['alt'] ) ? $image['alt'] : $name;

// Generate a unique ID for accessibility anchoring and section labeling.
$instance_id = wp_unique_id( 'wp-block-plants-lookbook-species-' );

// Construct the array of CSS classes to apply to the block wrapper.
$classes = array( 'wp-block-plants-lookbook-species' );

// Allow layout flipping via is-flipped modifier class.
if ( ! empty( $attributes['flipped'] ) ) {
	$classes[] = 'is-flipped';
}

// Handle core alignment classes like alignfull or alignwide.
if ( ! empty( $align ) ) {
	$classes[] = 'align' . $align;
}

// Support any user-defined custom class names from the block editor.
if ( ! empty( $attributes['className'] ) ) {
	$classes[] = $attributes['className'];
}

$classes_str = implode( ' ', $classes );
?>

<section class="<?php echo esc_attr( $classes_str ); ?>" role="region" aria-labelledby="<?php echo esc_attr( $instance_id ); ?>">
	<div class="wp-block-plants-lookbook-species__info">
		<div class="wp-block-plants-lookbook-species__info-inner">
			<h2 id="<?php echo esc_attr( $instance_id ); ?>" class="wp-block-plants-lookbook-species__name"><?php echo esc_html( $name ); ?></h2>

			<?php if ( ! empty( $binomial ) ) : ?>
				<p class="wp-block-plants-lookbook-species__binomial"><?php echo esc_html( $binomial ); ?></p>
			<?php endif; ?>

			<?php if ( ! empty( $desc ) ) : ?>
				<p class="wp-block-plants-lookbook-species__description"><?php echo esc_html( $desc ); ?></p>
			<?php endif; ?>
		</div>
	</div>

	<?php if ( $image_url ) : ?>
		<figure class="wp-block-plants-lookbook-species__image-container">
			<img
				src="<?php echo esc_url( $image_url ); ?>"
				alt="<?php echo esc_attr( $image_alt ); ?>"
				loading="lazy"
			/>
			<figcaption class="screen-reader-text">
				<?php echo esc_html( $image_alt ); ?>
			</figcaption>
		</figure>
	<?php endif; ?>
</section>