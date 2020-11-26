<?php
/**
 * Plugin Name:     Gutenberg Tooltips
 * Description:     Formatting button adding tooltips functionality. Based on tippy.js
 * Version:         0.1.0
 * Author:          Katya Leurdo
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     g-tooltips
 *
 */

function g_tooltips_script_register() {
	wp_register_script(
		'g-tooltips-format-js',
		plugins_url( '/build/index.js', __FILE__ ),
		array( 'wp-rich-text', 'wp-element', 'wp-editor', 'wp-compose', 'wp-data' ),
		'0.0.1',
		true
	);
}
add_action( 'init', 'g_tooltips_script_register' );

function g_tooltips_enqueue_assets_editor() {
	wp_enqueue_script( 'g-tooltips-format-js' );

	wp_enqueue_style(
		'g-tooltips-block-editor',
		plugins_url( '/build/index.css', __FILE__ ),
		array(),
		'0.0.1'
	);
}
add_action( 'enqueue_block_editor_assets', 'g_tooltips_enqueue_assets_editor', 0 );

function g_tooltips_enqueue_scripts() {
	wp_enqueue_script(
		'g-tooltips-js',
		plugins_url( '/build/g-tooltips.js', __FILE__ ),
		array(),
		'0.0.1',
		true
	);
	wp_enqueue_style(
		'g-tooltips-css',
		plugins_url( '/build/g-tooltips.css', __FILE__ ),
		array(),
		'0.0.1'
	);
}

add_action( 'wp_enqueue_scripts', 'g_tooltips_enqueue_scripts' );
