module App {

    function wrapText(text: string): string {
        text = keyWordService.replaceKeywordsWithSpan(text);
        var className = "";

        if (text.indexOf("//") == 0) {
            className = "green";
        }
        text = "<div class='" + className + "'>" + text + "</div>";
        return text;
    }

    export function getCode(text: string) {

        var newText = snippets[text];

        for (var i = 0; i < newText.length; i++) {
            var temptext = newText[i];
            newText[i] = wrapText(temptext);
        }

        return newText.join("");
    }

}