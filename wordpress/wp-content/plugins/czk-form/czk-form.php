<?php
/**
 * Plugin Name: CZK Form
 * Description: Form Plugin
 * Version: 1.0
 * Author: Software Things
 * Requires PHP: 7.2
 * Author URI: https://softwarethings.pro/
 **/

/**
 * Required Assets:
 */
add_action('init', 'czk_form_assets');
function czk_form_assets()
{
    if (strstr($_SERVER['REQUEST_URI'], 'wp-admin/post-new.php') || strstr($_SERVER['REQUEST_URI'], 'wp-admin/post.php')) {
        wp_enqueue_script('vue', '//cdn.jsdelivr.net/npm/vue/dist/vue.min.js', [], false, true);
        wp_enqueue_script('sortable', '//cdn.jsdelivr.net/npm/sortablejs@1.8.4/Sortable.min.js', [], false, true);
        wp_enqueue_script('vuedraggable', '//cdnjs.cloudflare.com/ajax/libs/Vue.Draggable/2.20.0/vuedraggable.umd.min.js', [], false, true);
        wp_enqueue_style('main-form-css', plugin_dir_url(__FILE__) . 'assets/css/main.css?t=' . time());
        wp_enqueue_script('main-form-js', plugin_dir_url(__FILE__) . 'assets/js/main.js?t=' . time(), ['jquery'], false, true);
    }
}

/**
 * Render Meta Box:
 */
add_action('add_meta_boxes', 'czk_form');
function czk_form()
{
    foreach (get_post_types(['public' => true]) as $screen) {
        add_meta_box('czk_form', 'Formularz', 'czk_form_render', $screen);
    }
}

/**
 * Render Form Builder:
 * @param $post
 */
function czk_form_render($post)
{
    $json = get_post_meta($post->ID, 'czk_form', true);
    $data = json_decode($json, true);
    $json = addslashes(json_encode($data));
    echo "<script>const form_json = '{$json}';</script>";
    echo '<label for="form-headline">Nagłówek formularza:</label><br><input type="text" id="form-headline" style="margin: 10px 0 30px; width: 100%" value="' . (isset($data['headline']) ? $data['headline'] : '') . '">';
    echo file_get_contents(plugin_dir_path(__FILE__) . 'assets/template/form-builder.html');
}

/**
 * Save Form Data:
 */
add_action('wp_ajax_update_czk_form', 'update_czk_form');
function update_czk_form()
{
    // @TODO: Validation
    $data = $_POST;
    update_post_meta($data['post_id'], 'czk_form', addslashes(json_encode(['headline' => $data['headline'], 'fields' => $data['fields']], JSON_UNESCAPED_UNICODE)));
    wp_send_json_success('OK');
}

/**
 * REST Endpoint:
 */
add_action('rest_api_init', 'czk_form_rest');
function czk_form_rest()
{
    register_rest_field(
        get_post_types(['public' => true]),
        'czk_form',
        [
            'get_callback' => 'czk_get_form',
            'update_callback' => null,
            'schema' => null,
        ]
    );
}

function czk_get_form($object)
{
    $field = get_post_meta($object['id'], 'czk_form', true);
    return empty($field) ? [] : json_decode($field, true);
}