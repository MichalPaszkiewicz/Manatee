module App {

    export function getCode(text: string) {

        switch (text) {
            case "Custom":
                return "Custom text";
            case "CRUD":
                var result = ["// ---- Add MyObject ----",
                    "run test Add my object: {NAME}",
                    "login as myuser@uat.co",
                    "click My Objects",
                    "</br>",
                    "// ---- Cancel button ---",
                    "click New My Object",
                    "click Cancel",
                    'expect header "My objects"',
                    "</br>",
                    "// ---- Edit ----",
                    'at row "{NAME}" click Edit',
                    'set Name -> "Edited Name"',
                    "click Save",
                    'expect row "Edited Name"'
                ];
                

                for (var i = 0; i < result.length; i++) {
                    result[i] = "<div>" + result[i] + "</div>";
                }

                return result.join("");
            case "Search":
                var result = ["// ---- Search: Exclusion ----",
                    'set Find -> "non-existent"',
                    "click Search",
                    "</br>",
                    "// ---- Search: Inclusion ----",
                    'set Find -> "Edited Name"',
                    "click Search",
                    'expect row "Edited Name"',
                    "</br>",
                    "// ---- Delete ----",
                    'at row "Edited Name" click Delete',
                    'expect "Are you sure you want to delete MyObject?"',
                    "click Cancel",
                    'expect row "Edited Name"',
                    'at row "Edited Name" click Delete',
                    "click Yes",
                    'expect no row "Edited Name"'
                ];


                for (var i = 0; i < result.length; i++) {
                    result[i] = "<div>" + result[i] + "</div>";
                }

                return result.join("");
            default:

        }
    }

}