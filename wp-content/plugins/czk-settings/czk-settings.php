<?php
/**
 * Plugin Name: CZK Settings
 * Description: Settings Plugin
 * Version: 1.0
 * Author: Software Things
 * Requires PHP: 7.2
 * Author URI: https://softwarethings.pro/
 **/

/**
 * Custom Section In General Settings:
 */
add_action('admin_init', 'czk_settings');

function czk_settings()
{
    /**
     * Available Fields:
     */
    $fields = [
        [
            'label' => 'Nagłówek',
            'name' => 'czk_headline',
            'type' => 'text'
        ],
        [
            'label' => 'Ostrzeżenie',
            'name' => 'czk_warning',
            'type' => 'text'
        ],
        [
            'label' => 'Telefon',
            'name' => 'czk_phone',
            'type' => 'phone'
        ],
        [
            'label' => 'E-mail',
            'name' => 'czk_email',
            'type' => 'email'
        ],
        [
            'label' => 'Logo',
            'name' => 'czk_logo',
            'type' => 'url'
        ],
        [
            'label' => 'Link do BIPu',
            'name' => 'czk_bip',
            'type' => 'url'
        ],
        [
            'label' => 'Kolor (primary)',
            'name' => 'czk_color_primary',
            'type' => 'color'
        ],
        [
            'label' => 'Kolor (secondary)',
            'name' => 'czk_color_secondary',
            'type' => 'color'
        ]
    ];

    add_settings_section('czk_settings', 'Centrum Zarządzania Kryzysowego', '', 'general');
    foreach ($fields as $field) {
        add_settings_field($field['name'], $field['label'], 'czk_input', 'general', 'czk_settings', [$field['name'], $field['type']]);
        register_setting('general', $field['name'], 'esc_attr');
    }
}

/**
 * Render Field (callback)
 * @param $args
 */
function czk_input($args)
{
    $value = get_option($args[0]);
    echo '<input type="' . (isset($args[1]) ? $args[1] : 'text') . '" id="' . $args[0] . '" name="' . $args[0] . '" value="' . $value . '">';
    echo $args[0] === 'czk_logo' ? '<br><br>Odnośnik do pliku svg, png, jpg. Kliknij <a href="media-new.php">tutaj</a> aby wgrać plik na serwer.' : '';
}

/**
 * REST Endpoint:
 */
add_action('rest_api_init', function () {
    register_rest_route('wp/v2/', 'czk-settings', array(
        'methods' => 'GET',
        'callback' => 'get_custom_settings_fields'
    ));

    function get_custom_settings_fields()
    {
        $fields = ['headline', 'warning', 'phone', 'email', 'logo', 'bip', 'color_primary', 'color_secondary'];
        $fields = array_map(function ($field) {
            return get_option("czk_{$field}");
        }, array_combine(array_values($fields), $fields));
        $fields['page_title'] = get_bloginfo('name');
        $fields['page_description'] = get_bloginfo('description');
        return $fields;
    }
});