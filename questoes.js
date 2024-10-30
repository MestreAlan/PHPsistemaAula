$(document).ready(function() {
    $.getJSON('questoes.json', function(data) {
        var lista = [];
        var assuntos = [];

        for (var i = 0; i < data.length; i++) {
            var questao = data[i];
            if (!assuntos.includes(questao.assunto)) {
                assuntos.push(questao.assunto);
                lista.push([]);
            }
            var assuntoIndex = assuntos.indexOf(questao.assunto);
            lista[assuntoIndex].push(questao);
        }

        var id_aluno = getUrlParameter('id_aluno');
        if (!id_aluno) {
            $('#question-container').html('<p>É necessário fornecer um ID de aluno.</p>');
        } else {
            $.getJSON('log.json', function(logData) {
                var alunoExists = false;
                var alunoIndex = -1;

                for (var i = 0; i < logData.length; i++) {
                    if (logData[i].id_aluno === id_aluno) {
                        alunoExists = true;
                        alunoIndex = i;
                        break;
                    }
                }

                if (alunoExists) {
                    var selectedQuestions = logData[alunoIndex].questoes.map(function(questionId) {
                        return data.find(function(question) {
                            return question.id === questionId;
                        });
                    });
                    displayQuestions(selectedQuestions);
                } else {
                    var selectedQuestions = selectRandomQuestions(lista);
                    logData.push({
                        id_aluno: id_aluno,
                        questoes: selectedQuestions.map(function(question) {
                            return question.id;
                        })
                    });
                    saveLog(logData);
                    displayQuestions(selectedQuestions);
                }
            });
        }
    });
});


function getUrlParameter(name) {
    name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function selectRandomQuestions(lista) {
    var selectedQuestions = [];
    for (var i = 0; i < lista.length; i++) {
        var assunto = lista[i];
        var randomIndex = Math.floor(Math.random() * assunto.length);
        selectedQuestions.push(assunto[randomIndex]);
    }
    return selectedQuestions;
}

function displayQuestions(questions) {
    var container = $('#question-container');
    container.empty();
    for (var i = 0; i < questions.length; i++) {
        var question = questions[i];
        var questionHtml = '<div class="question">' +
            '<h2>' + question.title + '</h2>' +
            '<p>' + question.text + '</p>' +
            '</div>';
        container.append(questionHtml);
    }
}

function saveLog(logData) {
    $.ajax({
        type: 'POST',
        url: 'questoes.php',
        data: { logData: JSON.stringify(logData) },
        dataType: 'json',
        success: function(response) {
            console.log('Log saved successfully.');
        },
        error: function() {
            console.log('Error saving log.');
        }
    });
}
