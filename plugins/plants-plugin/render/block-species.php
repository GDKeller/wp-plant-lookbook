<?php
/**
 * Block Name: Species
 *
 * This is the template that renders the species block.
 *
 * @package PlantsPlugin
 */

$align = $attributes["align"] ?? "";
$name = esc_html( $attributes["speciesCommonName"] ?? "" );
$binomial = esc_html( $attributes["speciesFormalName"] ?? "" );
$desc   = esc_html( $attributes["speciesDescription"] ?? "" );

$image = $attributes["speciesImage"]["url"] ?? "";
$alt = $attributes["speciesImage"]["alt"] ?? $name ?? "Species image";

$class = "species-block";
if ( ! empty( $attributes["flipped"] ) ) {
	$class .= " flipped";
}
if ( ! empty( $align ) ) {
	$class .= " align" . $align;
}
if ( ! empty( $attributes["className"] ) ) {
	$class .= " " . esc_attr( $attributes["className"] );
}

$instance_id = uniqid( "species-block-" );
?>	

<section class="<?php echo esc_attr( $class ); ?>" role="region" aria-labelledby="<?php echo esc_attr( $instance_id ); ?>">
	<div class="species-block__info">
		<div class="species-block__info-inner">
			<h2 id="<?php echo esc_attr( $instance_id ); ?>" class="species-block__name"><?php echo $name; ?></h2>
			<?php if ( ! empty( $binomial ) ) :	 ?>
				<p class="species-block__binomial"><?php echo $binomial; ?></p>
			<?php endif; ?>
			<?php if ( ! empty( $desc ) ) : ?>
				<p class="species-block__description"><?php echo $desc; ?></p>
			<?php endif; ?>
		</div>
	</div>

	<?php if ( $image ) : ?>
		<figure class="species-block__image-container">
			<img src="<?php echo esc_url( $image ); ?>" alt="<?php echo esc_attr( $alt ); ?>" loading="lazy" />
			<figcaption class="screen-reader-text"><?php echo $alt; ?></figcaption>
		</figure>
	<?php endif; ?>
</section>