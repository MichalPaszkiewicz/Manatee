module App {

    export class TextConstruct implements IConstructable{

        constructString: () => string;

        constructor(text) {
            this.constructString = function () {

                return text;

            }
        }
    }

}