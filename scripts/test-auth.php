#!/usr/bin/env php
<?php

require __DIR__.'/../vendor/autoload.php';

$app = require_once __DIR__.'/../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\Auth;
use App\Models\User;

echo "═══════════════════════════════════════════════════════════════\n";
echo "🔐 Тест авторизації та API\n";
echo "═══════════════════════════════════════════════════════════════\n\n";

// Перевірка користувачів
$users = User::all();
echo "👥 Користувачі в системі: " . $users->count() . "\n";
echo "─────────────────────────────────────────────────────────────\n";

foreach ($users as $user) {
    echo sprintf("  ID: %-3d Email: %-30s Name: %s\n", $user->id, $user->email, $user->name);
}

echo "\n═══════════════════════════════════════════════════════════════\n";
echo "Для тестування API створіть Sanctum токен:\n";
echo "php artisan tinker\n";
echo "\$user = User::first();\n";
echo "\$token = \$user->createToken('test-token')->plainTextToken;\n";
echo "echo \$token;\n";
echo "═══════════════════════════════════════════════════════════════\n";
