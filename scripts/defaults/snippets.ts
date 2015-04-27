module App {

    export var snippets = {
        Add:
        ["// ---- Add MyObject ----",
            "run test Add my object: {NAME}",
            "login as myuser@uat.co",
            "click My Objects",
            "</br>"],
        Cancel:
        ["// ---- Cancel button ---",
            "click New My Object",
            "click Cancel",
            'expect header "My objects"',
            "</br>"],
        Edit:
        ["// ---- Edit ----",
            'at row "{NAME}" click Edit',
            'set Name -> "Edited Name"',
            "click Save",
            'expect row "Edited Name"'],
        SearchExclusion:
        ["// ---- Search: Exclusion ----",
            'set Find -> "non-existent"',
            "click Search",
            "</br>"],
        SearchInclusion:
        ["// ---- Search: Inclusion ----",
            'set Find -> "Edited Name"',
            "click Search",
            'expect row "Edited Name"',
            "</br>"],
        Delete:
        ["// ---- Delete ----",
            'at row "Edited Name" click Delete',
            'expect "Are you sure you want to delete MyObject?"',
            "click Cancel",
            'expect row "Edited Name"',
            'at row "Edited Name" click Delete',
            "click Yes",
            'expect no row "Edited Name"'],
        Custom:
        ["Custom text"]
    }

    snippets["CRUD"] = [snippets.Add, snippets.Cancel, snippets.Edit, snippets.SearchExclusion, snippets.SearchInclusion, snippets.Delete].join().split(",");

} 