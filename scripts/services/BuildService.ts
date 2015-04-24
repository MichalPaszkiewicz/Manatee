module App {

    export class BuildService{

        codeArray: string[];

        toCode: () => string;

        build: () => void;

        insert: (code: string, position?: number) => void;

        selector: string;

        constructor(selector: string) {

            this.selector = selector;

            this.codeArray = [];

            var self = this;

            this.toCode = function () {

                var stringArray = [];

                for (var i = 0; i < self.codeArray.length; i++) {
                    stringArray.push("<div>" + self.codeArray[i] + "</div>");
                }

                return stringArray.join("");
            }

            this.insert = function(code: string, position?: number){
                
                if (position == null) {
                    self.codeArray.push(code);
                }
                else {
                    var newArray: string[] = [];

                    for (var i = 0; i < self.codeArray.length; i++) {
                        if (position == i) {
                            newArray.push(code);
                        }
                        newArray.push(self.codeArray[i]);
                    }

                    self.codeArray = newArray;
                }

                self.build();
            }

            this.build = function(){

                $(self.selector).html(this.toCode());

            }

        }
    }
}