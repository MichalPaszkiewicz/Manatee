module App {

    class BuildService{

        codeArray: string[];

        toCode: () => string;

        build: (selector: string) => void;

        constructor() {

            this.codeArray = [];

            this.toCode = function () {

                return "";
            }

            this.build = function(selector: string){

                $(selector).html(this.toCode);

            }

        }
    }
}