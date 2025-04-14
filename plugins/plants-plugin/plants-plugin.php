<?php
/**
 * Plugin Name: Plants Lookbook
 * Text Domain: plants-plugin
 * Description: A plugin to manage plant species and their biomes.
 * Version: 0.1.0
 */

if ( ! defined( "ABSPATH" ) ) {
    exit; // Exit if accessed directly.
}

function plants_plugin_get_block_list() {
	return [ 'species' ];
}


// Register custom blocks categories
add_filter( "block_categories_all" , function( $categories, $post ) {
    if ( ! is_admin() ) {
        return $categories;
    }

    // Adding a new category.
    $categories[] = array(
        "slug"  => "custom-blocks",
        "title" => "Custom Blocks",
    );

    return $categories;
}, 10, 2 );



function plants_plugin_register_assets() {
	foreach ( plants_plugin_get_block_list() as $block ) {
		$handle_prefix = "plants-plugin/{$block}";
		$block_dir     = plugin_dir_path( __FILE__ ) . "dist/blocks/{$block}";
		$block_url     = plugin_dir_url( __FILE__ ) . "dist/blocks/{$block}";

		// JS
		if ( file_exists( "{$block_dir}/block.js" ) ) {
			wp_register_script(
				"{$handle_prefix}/block",
				"{$block_url}/block.js",
				[ "wp-blocks", "wp-element", "wp-components", "wp-i18n", "wp-block-editor" ],
				filemtime( "{$block_dir}/block.js" ),
				true
			);
		}

		// Editor-only CSS
		if ( file_exists( "{$block_dir}/editor.css" ) ) {
			wp_register_style(
				"{$handle_prefix}/editor",
				"{$block_url}/editor.css",
				[],
				filemtime( "{$block_dir}/editor.css" )
			);
		}

		// Front-end + editor CSS
		if ( file_exists( "{$block_dir}/style.css" ) ) {
			wp_register_style(
				"{$handle_prefix}/style",
				"{$block_url}/style.css",
				[],
				filemtime( "{$block_dir}/style.css" )
			);
		}
	}
}
add_action( 'init', 'plants_plugin_register_assets' );

function plants_plugin_register_blocks() {
    foreach ( plants_plugin_get_block_list() as $block ) {
		register_block_type(
			__DIR__ . "/src/blocks/$block/block.json",
			[
				'editor_script'   => "plants-plugin/$block/block",
				'editor_style'    => "plants-plugin/$block/editor",
				'style'           => "plants-plugin/$block/style",
			]
		);
	}
}
add_action( "init", "plants_plugin_register_blocks" );

