<?php
/**
 * Plugin Name: CZK Map
 * Description: Map Plugin
 * Version: 1.0
 * Author: Software Things
 * Requires PHP: 7.2
 * Author URI: https://softwarethings.pro/
 **/

/**
 * Required Assets:
 */
add_action('init', 'czk_assets');
function czk_assets()
{
    if (strstr($_SERVER['REQUEST_URI'], 'wp-admin/post-new.php') || strstr($_SERVER['REQUEST_URI'], 'wp-admin/post.php')) {
        wp_enqueue_style('leaflet', '//unpkg.com/leaflet@1.6.0/dist/leaflet.css');
        wp_enqueue_style('geocoder', '//unpkg.com/esri-leaflet-geocoder@2.3.2/dist/esri-leaflet-geocoder.css');

        wp_enqueue_script('leaflet', '//unpkg.com/leaflet@1.6.0/dist/leaflet.js', [], false, true);
        wp_enqueue_script('esri-leaflet', '//unpkg.com/esri-leaflet@2.3.3/dist/esri-leaflet.js', [], false, true);
        wp_enqueue_script('esri-leaflet-geocoder', '//unpkg.com/esri-leaflet-geocoder@2.3.2/dist/esri-leaflet-geocoder.js', [], false, true);

        wp_enqueue_script('main', plugin_dir_url(__FILE__) . 'assets/js/main.js?t=' . time(), ['jquery'], false, true);
    }
}

/**
 * Render Meta Box:
 */
add_action('add_meta_boxes', 'czk_map');
function czk_map()
{
    foreach (get_post_types(['public' => true]) as $screen) {
        add_meta_box('czk_map', 'Mapa', 'czk_leaflet', $screen);
    }
}

/**
 * Save Map Data:
 */
add_action('wp_ajax_update_czk_map', 'update_czk_map');
function update_czk_map()
{
    // @TODO: Validation
    $data = $_POST;
    update_post_meta($data['post_id'], 'czk_map', json_encode(['headline' => $data['headline'], 'markers' => $data['markers']], JSON_UNESCAPED_UNICODE));
    wp_send_json_success('OK');
}

/**
 * Render Leaflet Map:
 * @param $post
 */
function czk_leaflet($post)
{
    $json = get_post_meta($post->ID, 'czk_map', true);
    $data = json_decode($json, true);
    echo '<label for="map-headline">Nagłówek mapy:</label><br><input type="text" id="map-headline" style="margin: 10px 0 30px; width: 100%" value="' . (isset($data['headline']) ? $data['headline'] : '') . '">';
    echo '<div id="map" data-markers=\'' . $json . '\' style="width: 100%; height: 500px;"></div>';
}

/**
 * REST Endpoint:
 */
add_action('rest_api_init', 'czk_rest');
function czk_rest()
{
    register_rest_field(
        get_post_types(['public' => true]),
        'czk_map',
        [
            'get_callback' => 'czk_get_map',
            'update_callback' => null,
            'schema' => null,
        ]
    );
}

function czk_get_map($object)
{
    $field = get_post_meta($object['id'], 'czk_map', true);
    return empty($field) ? [] : json_decode($field, true);
}
