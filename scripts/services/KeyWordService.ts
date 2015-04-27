module App {

    function replaceWholeWord(text: string, word: string, replaceWord: string): string {

        var rge = new RegExp("\\b" + word + "\\b");

        text = text.replace(rge, replaceWord);
         
        return text;
    }

    function wrapWord(word: string): string {
        return "<span class='blue'>" + word + "</span>";
    }

    class KeyWordService {

        keywords: string[];

        replaceKeywordsWithSpan: (text: string) => string;

        constructor(keywords: string[]) {

            this.keywords = keywords;

            var me = this;

            this.replaceKeywordsWithSpan = function (text) {

                for (var i = 0; i < me.keywords.length; i++) {
                    text = replaceWholeWord(text, keywords[i], wrapWord(keywords[i]));
                }

                return text;
            }

        }
    }

    var keyWords = ["run", "login", "as", "click", "expect", "at", "row", "set"];

    export var keyWordService = new KeyWordService(keyWords);

}