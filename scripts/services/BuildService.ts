module App {

    export class BuildService{

        codeArray: Code[];

        toCode: () => string;

        build: () => void;

        insert: (code: Code, position?: number) => void;

        selector: string;

        getCode: (id: string) => string;

        editCode: (id: string, update: (x) => void) => void;

        constructor(selector: string) {

            this.selector = selector;

            this.codeArray = [];

            var self = this;

            this.toCode = function () {

                var stringArray = [];

                for (var i = 0; i < self.codeArray.length; i++) {
                    var codeString = self.codeArray[i].code;
                    stringArray.push("<div>" + codeString + "</div>");
                }

                stringArray.push("<span class='green'>//....................xXXXXx.................//</span>");
                stringArray.push("<span class='green'>//...............xXXXX......XXXXXXx..........//</span>");
                stringArray.push("<span class='green'>//...XXx.....xXXX..................XXXXXXx...//</span>");
                stringArray.push("<span class='green'>//.X....XXXXX.............................Xx.//</span>");
                stringArray.push("<span class='green'>//X....................................O....X//</span>");
                stringArray.push("<span class='green'>//.X....xXXXXXXx.............X.....X...------//</span>");
                stringArray.push("<span class='green'>//...XXX........XXx.......xXX.X.....X....xXX.//</span>");
                stringArray.push("<span class='green'>//.................XXXXXXX....X.....XXXX.....//</span>");
                stringArray.push("<span class='green'>//.....MANATEE.................X...xX........//</span>");
                stringArray.push("<span class='green'>//..............................XXXX.........//</span>");

                return stringArray.join("</br>");
            }

            this.insert = function (code: Code, position?: number) {

                if (position == null) {
                    self.codeArray.push(code);
                }
                else {
                    var newArray: Code[] = [];

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

            this.build = function () {

                $(self.selector).html(this.toCode());

            }

            this.getCode = function (id: string) {
                for (var i = 0; i < self.codeArray.length; i++) {
                    if (self.codeArray[i].ID == id) {
                        return self.codeArray[i].code;
                    }
                }
            }

            this.editCode = function (id: string, update: (x) => void) {
                for (var i = 0; i < self.codeArray.length; i++) {
                    if (self.codeArray[i].ID == id) {
                        update(self.codeArray[i]);
                    }
                }
            }

        }
    }
}