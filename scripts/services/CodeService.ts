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

        //switch (text) {
        //    case "Custom":
        //        return "Custom text";
        //    case "CRUD":
        //        var result = ["// ---- Add MyObject ----",
        //            "run test Add my object: {NAME}",
        //            "login as myuser@uat.co",
        //            "click My Objects",
        //            "</br>",
        //            "// ---- Cancel button ---",
        //            "click New My Object",
        //            "click Cancel",
        //            'expect header "My objects"',
        //            "</br>",
        //            "// ---- Edit ----",
        //            'at row "{NAME}" click Edit',
        //            'set Name -> "Edited Name"',
        //            "click Save",
        //            'expect row "Edited Name"'
        //        ];
                

        //        for (var i = 0; i < result.length; i++) {
        //            var text = result[i];
        //            result[i] = wrapText(text);
        //        }

        //        return result.join("");
        //    case "Search":
        //        var result = ["// ---- Search: Exclusion ----",
        //            'set Find -> "non-existent"',
        //            "click Search",
        //            "</br>",
        //            "// ---- Search: Inclusion ----",
        //            'set Find -> "Edited Name"',
        //            "click Search",
        //            'expect row "Edited Name"',
        //            "</br>",
        //            "// ---- Delete ----",
        //            'at row "Edited Name" click Delete',
        //            'expect "Are you sure you want to delete MyObject?"',
        //            "click Cancel",
        //            'expect row "Edited Name"',
        //            'at row "Edited Name" click Delete',
        //            "click Yes",
        //            'expect no row "Edited Name"'
        //        ];


        //        for (var i = 0; i < result.length; i++) {
        //            var text = result[i];
        //            result[i] = wrapText(text);
        //        }

        //        return result.join("");
        //    default:

        //}
    }

}