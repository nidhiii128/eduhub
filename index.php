<?php
// Get the requested path
$request = $_SERVER['REQUEST_URI'];

// If the request starts with /api/, let PHP handle it normally
if (preg_match('/^\/api\//', $request)) {
    return false; // PHP continues to handle API requests
}

// If the request is for an existing file (like CSS/JS/assets), serve it
$filePath = __DIR__ . $request;
if ($request !== '/' && file_exists($filePath)) {
    return false; // Let PHP/webserver serve the file directly
}

// Otherwise, serve the React index.html (Vite build output)
readfile(__DIR__ . '/index.html');
exit;
