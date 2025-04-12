<?php
/**
 * Plugin Name: Plants Plugin
 * Text Domain: plants-plugin
 * Description: A plugin to manage plant species and their biomes.
 * Version: 0.1.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

// Register custom blocks categories
add_filter( 'block_categories_all' , function( $categories, $post ) {
    if ( ! is_admin() ) {
        return $categories;
    }

    // Adding a new category.
    $categories[] = array(
        'slug'  => 'custom-blocks',
        'title' => 'Custom Blocks',
    );

    return $categories;
}, 10, 2 );


function plants_plugin_render_species_block( $attributes ) {
    $common_name = esc_html( $attributes['speciesCommonName'] ?? '' );
    $scientific_name = esc_html( $attributes['speciesFormalName'] ?? '' );
    $desc = esc_html( $attributes['speciesDescription'] ?? '' );
    $image = $attributes['speciesImage']['url'] ?? '';
    $image_alt = esc_attr( $attributes['speciesImage']['alt'] ?? '' );

    ob_start();
    ?>
    <div class="wp-block-plants-plugin-species">
        <?php if ( $image ): ?>
            <img src="<?php echo esc_url( $image ); ?>" alt="<?php echo $image_alt; ?>" class="species-image" />
        <?php endif; ?>
        <?php if ( $common_name ): ?>
            <h2 class="species-title"><?php echo $common_name; ?></h2>
        <?php endif; ?>
        <?php if ( $scientific_name ): ?>
            <p class="species-scientific"><?php echo $scientific_name; ?></p>
        <?php endif; ?>
        <?php if ( $desc ): ?>
            <p class="species-description"><?php echo $desc; ?></p>
        <?php endif; ?>
    </div>
    <?php
    return ob_get_clean();
}

function plants_plugin_render_biome_block( $attributes ) {
    $name = esc_html( $attributes['biomeName'] ?? '' );
    $desc = esc_html( $attributes['biomeDescription'] ?? '' );
    $image = $attributes['biomeImage']['url'] ?? '';
    $image_alt = esc_attr( $attributes['biomeImage']['alt'] ?? '' );

    ob_start();
    ?>
    <div class="wp-block-plants-plugin-biome">
        <?php if ( $image ): ?>
            <img src="<?php echo esc_url( $image ); ?>" alt="<?php echo $image_alt; ?>" class="biome-image" />
        <?php endif; ?>
        <?php if ( $name ): ?>
            <h2 class="biome-title"><?php echo $name; ?></h2>
        <?php endif; ?>
        <?php if ( $desc ): ?>
            <p class="biome-description"><?php echo $desc; ?></p>
        <?php endif; ?>
    </div>
    <?php
    return ob_get_clean();
}

function plants_plugin_register_blocks() {
    wp_register_script(
        'plants-plugin-species-editor',
        plugins_url( 'blocks/species/edit.js;', __FILE__ ),
        array( 'wp-blocks', 'wp-element', 'wp-editor'),
        filemtime( plugin_dir_path( __FILE__ ) . 'blocks/species/edit.js' )
    );

    wp_register_script(
        'plants-plugin-biome-editor',
        plugins_url( 'blocks/biome/edit.js;', __FILE__ ),
        array( 'wp-blocks', 'wp-element', 'wp-editor'),
        filemtime( plugin_dir_path( __FILE__ ) . 'blocks/biome/edit.js' )
    );

    // Register a custom block
    register_block_type( 'plants-plugin/species', array(
        'render_callback' => 'plants_plugin_render_species_block',
        'editor_script' => 'plants-plugin-species-editor',
        'style'        => 'plants-plugin-species-style',
    ) );

    register_block_type( 'plants-plugin/biome', array(
        'render_callback' => 'plants_plugin_render_biome_block',
        'editor_script' => 'plants-plugin-biome-editor',
        'style'        => 'plants-plugin-biome-style',
    ) );
}
add_action( 'init', 'plants_plugin_register_blocks' );


wp_register_style(
    'plants-plugin-species-style',
    plugins_url( 'blocks/species/style.css', __FILE__ ),
    array(),
    filemtime( plugin_dir_path( __FILE__ ) . 'blocks/species/style.css' )
);

wp_register_style(
    'plants-plugin-biome-style',
    plugins_url( 'blocks/biome/style.css', __FILE__ ),
    array(),
    filemtime( plugin_dir_path( __FILE__ ) . 'blocks/biome/style.css' )
);

