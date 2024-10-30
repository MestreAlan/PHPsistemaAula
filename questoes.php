<?php
$logData = $_POST['logData'];
$filename = 'log.json';

if (file_put_contents($filename, $logData)) {
    echo json_encode(array('success' => true));
} else {
    echo json_encode(array('success' => false, 'error' => 'Error saving log.'));
}
?>
