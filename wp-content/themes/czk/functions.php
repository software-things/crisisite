<?php

function czk_themes_assets()
{
    wp_enqueue_style('foundation', '//cdn.jsdelivr.net/npm/foundation-sites@6.4.3/dist/css/foundation-float.min.css', false);
    wp_enqueue_style('font', '//fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap', false);
    wp_enqueue_style('main', get_template_directory_uri() . '/style.css?t=' . time(), false);
}

add_action('wp_enqueue_scripts', 'czk_themes_assets');

register_nav_menus([
    'main-menu' => 'Nawigacja',
    'footer-menu' => 'Nawigacja w stopce'
]);

add_theme_support('post-thumbnails');

add_action('admin_menu', function() {
    remove_menu_page('edit-comments.php');
});

add_action('wp_before_admin_bar_render', function() {
    global $wp_admin_bar;
    $wp_admin_bar->remove_menu('comments');
});

function remove_comment_support() {
    remove_post_type_support('post', 'comments');
    remove_post_type_support('page', 'comments');
}