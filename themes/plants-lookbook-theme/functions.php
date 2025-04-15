<?php
/**
 * Theme functions and definitions
 */

 add_action('wp_enqueue_scripts', function() {
	wp_enqueue_style(
		'plants-lookbook-style',
		get_stylesheet_uri(),
		[],
		null
	);
});