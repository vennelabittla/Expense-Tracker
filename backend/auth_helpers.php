<?php
function generateAuthorizationUrl($config) {
    $params = [
        'response_type' => 'code',
        'client_id' => $config['client_id'],
        'redirect_uri' => $config['redirect_uri'],
        'scope' => 'openid profile email',
        'state' => bin2hex(random_bytes(16)) // CSRF protection
    ];

    return sprintf(
        'https://%s/authorize?%s', 
        $config['domain'], 
        http_build_query($params)
    );
}

function exchangeCodeForTokens($config, $code) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://{$config['domain']}/oauth/token");
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
        'grant_type' => 'authorization_code',
        'client_id' => $config['client_id'],
        'client_secret' => $config['client_secret'],
        'code' => $code,
        'redirect_uri' => $config['redirect_uri']
    ]));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);
    curl_close($ch);

    return json_decode($response, true);
}

function getUserInfo($config, $accessToken) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://{$config['domain']}/userinfo");
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Authorization: Bearer $accessToken"
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);
    curl_close($ch);

    return json_decode($response, true);
}

function validateToken($config, $token) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://{$config['domain']}/introspect");
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
        'token' => $token,
        'client_id' => $config['client_id'],
        'client_secret' => $config['client_secret']
    ]));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);
    curl_close($ch);

    return json_decode($response, true);
}