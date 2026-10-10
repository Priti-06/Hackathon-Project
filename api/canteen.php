<?php
require_once __DIR__ . '/db.php';

$action = isset($_GET['action']) ? $_GET['action'] : 'menu';

if ($action === 'menu') {
    $menu = [
        ['id' => 'food-01', 'category' => 'lunch', 'name' => 'RIMS Special Veg Lunch Thali', 'desc' => 'Rice, Dal, 2 Veg Curries, Papad & Salad', 'price' => 40, 'emoji' => '🍛', 'prepTime' => 'Hot & Ready'],
        ['id' => 'food-02', 'category' => 'lunch', 'name' => 'Special Egg Curry Thali', 'desc' => '2-Egg Curry, Rice, Dal, Aloo Bhaja, Papad & Salad', 'price' => 55, 'emoji' => '🍳', 'prepTime' => '5 Mins'],
        ['id' => 'food-03', 'category' => 'lunch', 'name' => 'Paneer Butter Masala Thali', 'desc' => 'Shahi Paneer, 3 Rotis, Jeera Rice, Dal Fry & Sweet', 'price' => 65, 'emoji' => '🍲', 'prepTime' => '5 Mins'],
        ['id' => 'food-04', 'category' => 'lunch', 'name' => 'RIMS Hyderabadi Veg Biryani', 'desc' => 'Basmati rice with spiced veggies & Boondi Raita', 'price' => 50, 'emoji' => '🍚', 'prepTime' => 'Hot & Ready'],
        ['id' => 'food-05', 'category' => 'breakfast', 'name' => 'Hot Samosa & Masala Chai Combo (2 Pcs)', 'desc' => 'Crispy samosas with mint chutney & hot tea', 'price' => 20, 'emoji' => '🥟', 'prepTime' => 'Ready'],
        ['id' => 'food-06', 'category' => 'breakfast', 'name' => 'Crispy South Indian Masala Dosa', 'desc' => 'Golden dosa with potato masala, sambar & chutney', 'price' => 35, 'emoji' => '🥞', 'prepTime' => '3 Mins'],
        ['id' => 'food-07', 'category' => 'breakfast', 'name' => 'Steamed Idli Sambar (2 Pcs)', 'desc' => 'Soft fluffy steamed idlis with piping hot sambar', 'price' => 25, 'emoji' => '🥣', 'prepTime' => 'Ready'],
        ['id' => 'food-08', 'category' => 'breakfast', 'name' => 'Fresh Puri Sabji (3 Pcs)', 'desc' => 'Puffed puris with spicy Odia Aloo Dum sabji', 'price' => 30, 'emoji' => '🫓', 'prepTime' => '3 Mins'],
        ['id' => 'food-09', 'category' => 'breakfast', 'name' => 'Grilled Paneer & Veg Sandwich', 'desc' => 'Toasted sandwich with spiced paneer & cheese', 'price' => 35, 'emoji' => '🥪', 'prepTime' => '4 Mins'],
        ['id' => 'food-10', 'category' => 'beverages', 'name' => 'Special RIMS Masala Chai', 'desc' => 'Freshly brewed aromatic tea with ginger', 'price' => 10, 'emoji' => '☕', 'prepTime' => 'Ready'],
        ['id' => 'food-11', 'category' => 'beverages', 'name' => 'South Indian Filter Coffee', 'desc' => 'Frothy freshly ground roasted coffee', 'price' => 15, 'emoji' => '☕', 'prepTime' => '1 Min'],
        ['id' => 'food-12', 'category' => 'beverages', 'name' => 'Chilled Sweet Punjabi Lassi', 'desc' => 'Creamy sweet yogurt drink topped with malai', 'price' => 25, 'emoji' => '🥤', 'prepTime' => 'Ready'],
        ['id' => 'food-13', 'category' => 'beverages', 'name' => 'Cold Coffee with Ice Cream', 'desc' => 'Chilled chocolate coffee with vanilla scoop', 'price' => 35, 'emoji' => '🧋', 'prepTime' => '2 Mins'],
        ['id' => 'food-14', 'category' => 'beverages', 'name' => 'Fresh Gulab Jamun (2 Pcs)', 'desc' => 'Warm soft dumplings soaked in saffron sugar syrup', 'price' => 20, 'emoji' => '🍮', 'prepTime' => 'Ready']
    ];

    echo json_encode(['status' => 'success', 'menu' => $menu]);
    exit;
}

if ($action === 'order' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $itemName = isset($input['item_name']) ? $input['item_name'] : 'RIMS Veg Lunch Thali';
    $amount = isset($input['amount']) ? floatval($input['amount']) : 40.0;
    $pickupSlot = isset($input['pickup_slot']) ? $input['pickup_slot'] : '1:15 PM Lunch Break';
    $paymentMode = isset($input['payment_mode']) ? $input['payment_mode'] : 'UPI / QR Code';
    $customerRoll = isset($input['customer_roll']) ? $input['customer_roll'] : '23MCA014';
    $customerName = isset($input['customer_name']) ? $input['customer_name'] : 'Soumya Patnaik';

    $tokenNumber = rand(40, 99);
    $orderId = 'ORD-' . rand(1000, 9999);

    if ($pdo) {
        $stmt = $pdo->prepare("INSERT INTO canteen_orders (order_id, customer_roll, customer_name, item_name, amount_inr, pickup_slot, payment_mode, payment_status, order_status, ordered_at) VALUES (?, ?, ?, ?, ?, ?, ?, 'PAID', 'Preparing', datetime('now'))");
        if ($stmt) {
            $stmt->execute([$orderId, $customerRoll, $customerName, $itemName, $amount, $pickupSlot, $paymentMode]);
        }
    }

    echo json_encode([
        'status' => 'success',
        'message' => 'Canteen Pre-Order Confirmed',
        'token_number' => $tokenNumber,
        'order_id' => $orderId,
        'item_name' => $itemName,
        'amount_inr' => $amount,
        'pickup_slot' => $pickupSlot,
        'payment_mode' => $paymentMode,
        'upi_vpa' => 'rimscanteen@sbi',
        'counter' => 'Counter 1 (Main Food Court, Chhend Campus)'
    ]);
    exit;
}
?>
