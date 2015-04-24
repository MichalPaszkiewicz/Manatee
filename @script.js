var App;
(function (App) {
    var BuildService = (function () {
        function BuildService(selector) {
            this.selector = selector;
            this.codeArray = [];
            var self = this;
            this.toCode = function () {
                var stringArray = [];
                for (var i = 0; i < self.codeArray.length; i++) {
                    stringArray.push("<div>" + self.codeArray[i] + "</div>");
                }
                return stringArray.join("");
            };
            this.insert = function (code, position) {
                if (position == null) {
                    self.codeArray.push(code);
                }
                else {
                    var newArray = [];
                    for (var i = 0; i < self.codeArray.length; i++) {
                        if (position == i) {
                            newArray.push(code);
                        }
                        newArray.push(self.codeArray[i]);
                    }
                    self.codeArray = newArray;
                }
                self.build();
            };
            this.build = function () {
                $(self.selector).html(this.toCode());
            };
        }
        return BuildService;
    })();
    App.BuildService = BuildService;
})(App || (App = {}));
/// <reference path="services/buildservice.ts" />
var App;
(function (App) {
    var Control;
    (function (Control) {
        var buildService = new App.BuildService(".code");
        function DragDrop(item) {
            var txt = item.textContent.trim();
            var dragger = $("<div class='dragger'>" + txt + "</div>");
            $(".main-content").append(dragger);
            var x = item.offsetLeft;
            var y = item.offsetTop;
            dragger.css({ width: item.clientWidth, left: x, top: y });
            $(document).on("mousemove", function (e) {
                dragger.css({ left: e.clientX - item.clientWidth / 2, top: e.clientY - item.clientHeight / 2 });
            });
            $(document).on("mouseup", function (e) {
                $(document).unbind("mousemove");
                var middleBox = $(".script")[0];
                if (e.clientX > middleBox.offsetLeft) {
                    $(middleBox).append($(App.getConstruct(new App.TextConstruct(txt))));
                    buildService.insert(txt);
                }
                dragger.remove();
                $(document).unbind("mouseup");
            });
        }
        $(".toolbox li").mousedown(function (e) {
            e.preventDefault();
            if (this instanceof HTMLLIElement) {
                DragDrop(this);
            }
            $(".dragger").css({ cursor: "-webkit-grabbing" });
        });
    })(Control = App.Control || (App.Control = {}));
})(App || (App = {}));
var App;
(function (App) {
    var TextConstruct = (function () {
        function TextConstruct(text) {
            this.constructString = function () {
                return text;
            };
        }
        return TextConstruct;
    })();
    App.TextConstruct = TextConstruct;
})(App || (App = {}));
var App;
(function (App) {
    function getConstruct(item) {
        var totalString = "<li>" + item.constructString() + "</li>";
        return $(totalString);
    }
    App.getConstruct = getConstruct;
})(App || (App = {}));
var App;
(function (App) {
    var LocalStorageService = (function () {
        function LocalStorageService() {
            this.getItem = function (itemName) {
                var stringResult = localStorage.getItem(itemName);
                return JSON.parse(stringResult);
            };
            this.setItem = function (itemName, itemValue) {
                localStorage.setItem(itemName, JSON.stringify(itemValue));
            };
        }
        return LocalStorageService;
    })();
    App.Database = new LocalStorageService();
})(App || (App = {}));
//# sourceMappingURL=@script.js.map