<?php
/**
 * Block Name: Species
 *
 * This is the template that renders the species block.
 *
 * @package PlantsPlugin
 */

$align = $attributes['align'] ?? '';
$common = esc_html( $attributes['speciesCommonName'] ?? '' );
$formal = esc_html( $attributes['speciesFormalName'] ?? '' );
$desc   = esc_html( $attributes['speciesDescription'] ?? '' );

$image = $attributes['speciesImage']['url'] ?? '';

$class = 'species-block';
if ( ! empty( $attributes['flipped'] ) ) {
	$class .= ' flipped';
}
if ( ! empty( $align ) ) {
	$class .= ' align' . $align;
}
?>	

<div class="<?php echo esc_attr( $class ); ?>">
	<div class="species-info">
		<h2><?php echo $common; ?></h2>
		<h3><em><?php echo $formal; ?></em></h3>
		<p><?php echo $desc; ?></p>
	</div>

	<?php if ( $image ) : ?>
		<div class="species-image">
			<img src="<?php echo esc_url( $image ); ?>" alt="" />
		</div>
	<?php endif; ?>
</div>