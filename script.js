const textArea = document.getElementById("text-area");

function caseHandler(event) {
    switch (event.target.id) {
        case 'upper-case':
            textArea.value = textArea.value.toUpperCase();
            break;
        case 'lower-case':
            textArea.value = textArea.value.toLowerCase();
            break;
        case 'proper-case':
            textArea.value = textArea.value.toLowerCase();
            [' ', '\n', '\t'].forEach(whitespace => {
                textArea.value = textArea.value
                    .split(whitespace)
                    .map(word => word.slice(0, 1).toUpperCase().concat(word.slice(1)))
                    .join(whitespace);
            });
            break;
        case 'sentence-case':
            textArea.value = textArea.value.toLowerCase();
            ['. ', '! ', '? ', '.\n', '!\n', '?\n', '\n'].forEach(sentenceEnd => {
                textArea.value = textArea.value
                    .split(sentenceEnd)
                    .map(sentence => sentence.slice(0, 1).toUpperCase().concat(sentence.slice(1)))
                    .join(sentenceEnd);
            });
            break;
    }
}

function download(filename, text) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

document.querySelectorAll('button')
    .forEach(button => {
        button.addEventListener("click", caseHandler);
    });

document.getElementById('save-text-file')
    .addEventListener('click', event => {
        download('text.txt', textArea.value);
    });