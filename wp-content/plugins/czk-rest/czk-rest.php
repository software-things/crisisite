<?php
/**
 * Plugin Name: CZK REST
 * Description: REST API Plugin
 * Version: 1.0
 * Author: Software Things
 * Requires PHP: 7.2
 * Author URI: https://softwarethings.pro/
 **/

 /**
 * Combine REST Endpoints:
 */
add_action('rest_api_init', function () {
  register_rest_route('wp/v2/', 'czk-rest', array(
      'methods' => 'GET',
      'callback' => 'combine_endpoints'
  ));

  function combine_endpoints()
  {
    $baseURL = get_site_url() . '/wp-json/';
    $endpoints = [
      'main-menu' => 'menus/v1/menus/2',
      'footer-menu' => 'menus/v1/menus/3',
      'settings' => 'wp/v2/czk-settings'
    ];
    $data = [];
    foreach ($endpoints as $key => $endpoint) {
      $data[$key] = json_decode(file_get_contents($baseURL . $endpoint), true);
    }
    return $data;
  }
});

/**
 * Add Created Endpoint to Cache:
 */
function wprc_add_czk_rest_endpoint($allowed_endpoints) {
  if (!isset($allowed_endpoints['wp/v2']) || !in_array('czk-rest', $allowed_endpoints['wp/v2'])) {
    $allowed_endpoints['wp/v2'][] = 'czk-rest';
  }
  return $allowed_endpoints;
}
add_filter('wp_rest_cache/allowed_endpoints', 'wprc_add_czk_rest_endpoint', 10, 1);