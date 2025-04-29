<?php

define('API_GATEWAY_URL', 'http://localhost:8000');
// Configuración de las URLs base para los microservicios
define('USERS_SERVICE_URL', API_GATEWAY_URL . '/usuarios');
define('VEHICLES_QUERIES_SERVICE_URL', API_GATEWAY_URL . '/vehiculos/all');
define('VEHICLES_COMMANDS_SERVICE_URL', API_GATEWAY_URL . '/vehiculoscommands');
define('CONTRACTS_SERVICE_URL', API_GATEWAY_URL . '/contratos');
define('SALES_SERVICE_URL', API_GATEWAY_URL . '/ventas');

// Iniciar la sesión
if (session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
}
?>
