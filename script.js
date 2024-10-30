$(document).ready(function() {
  $('#question-form').submit(function(e) {
    e.preventDefault(); // Impede o envio do formulário
	
    // Obter os valores do título e do texto
    var id = $('#id').val();
	var assunto = $('#assunto').val();
	var title = $('#title').val();
    var text = $('#text').val();

    // Criar um objeto com o título, o texto e um ID aleatório
    var entry = {
      id: id,
	  assunto: assunto,
      title: title,
      text: text
    };

    // Enviar a requisição AJAX para salvar a questão
    $.ajax({
      url: 'save_question.php',
      type: 'POST',
      data: entry,
      success: function(response) {
        alert('Questão salva com sucesso!' + response);
      },
      error: function(xhr, status, error) {
        alert('Erro ao salvar a questão. Por favor, tente novamente.');
      }
    });

    // Limpar os campos de entrada
    $('#id').val('');
	$('#assunto').val('');
	$('#title').val('');
    $('#text').val('');
  });
});
