module App {

    export function editCode(id: string) {

        var code = App.Control.buildService.getCode(id);

        App.Control.buildService.editCode(id, function () {
            
        });

    }

}