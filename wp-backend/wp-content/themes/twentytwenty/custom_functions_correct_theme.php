
// --- REACT HEADLESS SETUP START ---

// 1. Register Header and Footer Menu Locations
function react_theme_register_menus_v2() {
    register_nav_menus( array(
        'header-menu' => __( 'Header Menu' ),
        'footer-menu' => __( 'Footer Menu' )
    ) );
}
add_action( 'init', 'react_theme_register_menus_v2' );

// 2. Custom REST API Endpoint for Menus
// Note: using unique function names to avoid potential conflicts if themes switch
function react_theme_get_menus_v2() {
    $menu_locations = get_nav_menu_locations();
    $response = [
        'header' => [],
        'footer' => []
    ];

    // Helper to format menu items
    $format_items = function($items) {
        $formatted = [];
        foreach ($items as $item) {
            $formatted[] = [
                'ID' => $item->ID,
                'title' => $item->title,
                'url' => $item->url,
            ];
        }
        return $formatted;
    };

    // Get Header Menu
    if (isset($menu_locations['header-menu'])) {
        $header_items = wp_get_nav_menu_items($menu_locations['header-menu']);
        if ($header_items) {
            $response['header'] = $format_items($header_items);
        }
    }

    // Get Footer Menu
    if (isset($menu_locations['footer-menu'])) {
        $footer_items = wp_get_nav_menu_items($menu_locations['footer-menu']);
        if ($footer_items) {
            $response['footer'] = $format_items($footer_items);
        }
    }

    return $response;
}

add_action( 'rest_api_init', function () {
    register_rest_route( 'react-theme/v1', '/menus', array(
        'methods' => 'GET',
        'callback' => 'react_theme_get_menus_v2',
        'permission_callback' => '__return_true'
    ) );
} );

// --- REACT HEADLESS SETUP END ---
