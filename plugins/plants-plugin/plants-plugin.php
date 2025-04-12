<?php
/**
 * Plugin Name: Plants Lookbook
 * Text Domain: plants-plugin
 * Description: A plugin to manage plant species and their biomes.
 * Version: 0.1.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}


require_once __DIR__ . '/render/block-species.php';
require_once __DIR__ . '/render/block-biome.php';

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

    // Register custom blocks
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

