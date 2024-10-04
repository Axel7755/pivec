<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
    $file = $_FILES['file'];
    
    // Define el directorio de subida
    $uploadDir = '../crear-tareas-d/uploads/';
    
    // Verifica si el directorio existe, si no, lo crea
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);  // Crea la carpeta con permisos de escritura
    }
    
    // Ruta completa al archivo
    $uploadFile = $uploadDir . basename($file['name']);
    
    // Mueve el archivo a la carpeta de destino
    if (move_uploaded_file($file['tmp_name'], $uploadFile)) {
        echo json_encode([
            'status' => 'success',
            'message' => 'El archivo ha sido subido con éxito.',
            'file' => [
                'name' => $file['name'],
                'size' => $file['size'],
                'type' => $file['type'],
                'uploadedAt' => date('d M Y H:i:s')
            ]
        ]);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Error al mover el archivo.'
        ]);
    }
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'No se ha enviado ningún archivo.'
    ]);
}
?>
