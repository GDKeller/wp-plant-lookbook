<?php

function plants_plugin_render_biome_block( $attributes ) {
    $name = esc_html( $attributes['biomeName'] ?? '' );
    $desc = esc_html( $attributes['biomeDescription'] ?? '' );
    $image = $attributes['biomeImage']['url'] ?? '';
    $image_alt = esc_attr( $attributes['biomeImage']['alt'] ?? '' );

    ob_start();
    ?>
    <div class="wp-block-plants-lookbook-biome">
        <div>
        <?php if ( $common_name ): ?>
            <h2 class="biome-title"><?php echo $common_name; ?></h2>
        <?php endif; ?>
        <?php if ( $desc ): ?>
            <p class="biome-description"><?php echo $desc; ?></p>
        <?php endif; ?>
        </div>
        <?php if ( $image ): ?>
            <div>
                <img src="<?php echo esc_url( $image ); ?>" alt="<?php echo $image_alt; ?>" class="biome-image" />
            </div>
        <?php endif; ?>
    </div>
    <?php
    return ob_get_clean();
}