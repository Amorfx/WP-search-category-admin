<?php

/*
Plugin Name: WP search category admin
Description: Search dynamically a category in the box cat in admin
Version: 0.1
Author: Clément Décou
Author URI: http://www.clement-decou.fr
*/

function register_wpsca_custom_script($hook)
{
    if ( 'post.php' != $hook && $hook != 'post-new.php' )
    {
        return;
    }

    wp_register_script('wpsca_admin', site_url().'/plugins/wp-search-cat-admin/js/debounce.min.js');
    wp_register_script('wpsca_debounce', site_url().'/wp-content/plugins/wp-search-cat-admin/js/script.js');
    wp_enqueue_script('wpsca_debounce', false, array(), false, true);
    wp_enqueue_script('wpsca_admin', false, array(), false, true);
}

add_action( 'admin_enqueue_scripts', 'register_wpsca_custom_script');