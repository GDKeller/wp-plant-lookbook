<?php

function plants_plugin_render_species_block( $attributes ) {
    $common_name = esc_html( $attributes['speciesCommonName'] ?? '' );
    $scientific_name = esc_html( $attributes['speciesFormalName'] ?? '' );
    $desc = esc_html( $attributes['speciesDescription'] ?? '' );
    $image = $attributes['speciesImage']['url'] ?? '';
    $image_alt = esc_attr( $attributes['speciesImage']['alt'] ?? '' );

    ob_start();
    ?>
    <div class="wp-block-plants-plugin-species species alignwide">
        <div class="species__info">
        <?php if ( $common_name ): ?>
            <h2 class="species__title"><?php echo $common_name; ?></h2>
        <?php endif; ?>
        <?php if ( $scientific_name ): ?>
            <p class="species__scientific"><?php echo $scientific_name; ?></p>
        <?php endif; ?>
        <?php if ( $desc ): ?>
            <p class="species__description"><?php echo $desc; ?></p>
        <?php endif; ?>
        </div>
        <?php if ( $image ): ?>
            <div class="species__image-container">
                <img src="<?php echo esc_url( $image ); ?>" alt="<?php echo $image_alt; ?>" class="species__image" />
            </div>
        <?php endif; ?>
    </div>
    <?php
    return ob_get_clean();
}