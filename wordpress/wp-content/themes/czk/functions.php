<?php

function czk_themes_assets()
{
    wp_enqueue_style('foundation', '//cdn.jsdelivr.net/npm/foundation-sites@6.4.3/dist/css/foundation-float.min.css', false);
    wp_enqueue_style('font', '//fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap', false);
    wp_enqueue_style('main', get_template_directory_uri() . '/style.css?t=' . time(), false);
}

add_action('wp_enqueue_scripts', 'czk_themes_assets');