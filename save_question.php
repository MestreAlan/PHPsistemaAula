<?php
$data = array(
    'id' => $_POST['id'],
	'assunto' => $_POST['assunto'],
    'title' => $_POST['title'],
    'text' => $_POST['text']
);

$filename = 'questoes.json';
$questions = [];

if (file_exists($filename)) {
    $questions = json_decode(file_get_contents($filename), true);
}

$questions[] = $data;

if (file_put_contents($filename, json_encode($questions, JSON_PRETTY_PRINT)) !== false) {
    echo json_encode(array('success' => true));
} else {
    echo json_encode(array('success' => false, 'error' => 'Erro ao salvar a questão.'));
}
?>
