<?php
/**
 * Block Name: Biome
 *
 * This is the template that renders the Biome block.
 *
 * @package Plants Lookbook
 */

$name               = $attributes["biomeName"] ?? "";
$content_position   = $attributes["biomeContentPosition"] ?? "bottomleft";
$image              = $attributes["biomeImage"];
$image_url          = ! empty( $image["url"] ) ? $image["url"] : "";
$image_alt          = ! empty( $image["alt"] ) ? $image["alt"] : $name;

$classes            = ["biome-block alignfull"];
$instance_id        = uniqid( "biome-block-" );

$classes[] = $content_position;

if ( ! empty( $attributes["className"] ) ) {
    $classes[] = $attributes["className"];
}

$classes_str = implode( " ", $classes );
?>

<section class="<?php echo esc_attr( $classes_str ); ?>" role="region" aria-labelledby="<?php echo esc_attr( $instance_id ); ?>">
    <div class="biome-block__info">
        <div class="biome-block__info-inner">
            <h2 id="<?php echo esc_attr( $instance_id ); ?>" class="biome-block__name"><?php echo esc_html( $name ); ?></h2>
            <div class="biome-block__description">
                <?php echo wp_kses_post( $content ); ?>
            </div>
        </div>
    </div>

    <?php if ( $image_url ) : ?>
        <div class="biome-block__image-container">
            <div class="scrim"></div>
            <img src="<?php echo esc_url( $image_url ); ?>" alt="<?php echo esc_attr( $image_alt ); ?>" loading="lazy" />
        </div>
    <?php endif; ?>
</section>