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
            this.getCode = function (id) {
                for (var i = 0; i < self.codeArray.length; i++) {
                    if (self.codeArray[i].ID == id) {
                        return self.codeArray[i].code;
                    }
                }
            };
            this.editCode = function (id, update) {
                for (var i = 0; i < self.codeArray.length; i++) {
                    if (self.codeArray[i].ID == id) {
                        update(self.codeArray[i]);
                    }
                }
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
        Control.buildService = new App.BuildService(".code");
        function DragDrop(item) {
            var txt = item.textContent.trim();
            var dragger = $("<div class='dragger'>" + txt + "</div>");
            $(".main-content").append(dragger);
            dragger.css({ width: item.clientWidth, left: item.offsetLeft, top: item.offsetTop });
            $(document).on("mousemove", function (e) {
                dragger.css({ left: e.clientX - item.clientWidth / 2, top: e.clientY - item.clientHeight / 2 });
            });
            $(document).on("mouseup", function (e) {
                $(document).unbind("mousemove");
                var middleBox = $(".script")[0];
                if (e.clientX > middleBox.offsetLeft) {
                    var id = App.guidGenerator();
                    $(middleBox).append($(App.getConstruct(new App.TextConstruct(txt), id)));
                    Control.buildService.insert(new App.Code(id, App.getCode(txt)));
                }
                dragger.remove();
                $(document).unbind("mouseup");
            });
        }
        function setUp() {
            $(".toolbox li").mousedown(function (e) {
                e.preventDefault();
                if (this instanceof HTMLLIElement) {
                    DragDrop(this);
                }
                $(".dragger").css({ cursor: "-webkit-grabbing" });
            });
        }
        Control.setUp = setUp;
    })(Control = App.Control || (App.Control = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Code = (function () {
        function Code(ID, code) {
            this.ID = ID;
            this.code = code;
        }
        return Code;
    })();
    App.Code = Code;
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
    App.snippets = {
        Add: ["// ---- Add MyObject ----", "run test Add my object: {NAME}", "login as myuser@uat.co", "click My Objects", "</br>"],
        Cancel: ["// ---- Cancel button ---", "click New My Object", "click Cancel", 'expect header "My objects"', "</br>"],
        Edit: ["// ---- Edit ----", 'at row "{NAME}" click Edit', 'set Name -> "Edited Name"', "click Save", 'expect row "Edited Name"'],
        SearchExclusion: ["// ---- Search: Exclusion ----", 'set Find -> "non-existent"', "click Search", "</br>"],
        SearchInclusion: ["// ---- Search: Inclusion ----", 'set Find -> "Edited Name"', "click Search", 'expect row "Edited Name"', "</br>"],
        Delete: ["// ---- Delete ----", 'at row "Edited Name" click Delete', 'expect "Are you sure you want to delete MyObject?"', "click Cancel", 'expect row "Edited Name"', 'at row "Edited Name" click Delete', "click Yes", 'expect no row "Edited Name"'],
        Custom: ["Custom text"]
    };
    App.snippets["CRUD"] = [App.snippets.Add, App.snippets.Cancel, App.snippets.Edit, App.snippets.SearchExclusion, App.snippets.SearchInclusion, App.snippets.Delete].join().split(",");
})(App || (App = {}));
var App;
(function (App) {
    function editCode(id) {
        var code = App.Control.buildService.getCode(id);
        App.Control.buildService.editCode(id, function () {
        });
    }
    App.editCode = editCode;
})(App || (App = {}));
var App;
(function (App) {
    function wrapText(text) {
        text = App.keyWordService.replaceKeywordsWithSpan(text);
        var className = "";
        if (text.indexOf("//") == 0) {
            className = "green";
        }
        text = "<div class='" + className + "'>" + text + "</div>";
        return text;
    }
    function getCode(text) {
        var newText = App.snippets[text];
        for (var i = 0; i < newText.length; i++) {
            var temptext = newText[i];
            newText[i] = wrapText(temptext);
        }
        return newText.join("");
    }
    App.getCode = getCode;
})(App || (App = {}));
var App;
(function (App) {
    function getConstruct(item, id) {
        var onclick = "onclick='App.editCode(" + id + ")'";
        var totalString = "<li " + onclick + ">" + item.constructString() + "</li>";
        return $(totalString);
    }
    App.getConstruct = getConstruct;
})(App || (App = {}));
var App;
(function (App) {
    function guidGenerator() {
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }
    App.guidGenerator = guidGenerator;
})(App || (App = {}));
var App;
(function (App) {
    function replaceWholeWord(text, word, replaceWord) {
        var rge = new RegExp("\\b" + word + "\\b");
        text = text.replace(rge, replaceWord);
        return text;
    }
    function wrapWord(word) {
        return "<span class='blue'>" + word + "</span>";
    }
    var KeyWordService = (function () {
        function KeyWordService(keywords) {
            this.keywords = keywords;
            var me = this;
            this.replaceKeywordsWithSpan = function (text) {
                for (var i = 0; i < me.keywords.length; i++) {
                    text = replaceWholeWord(text, keywords[i], wrapWord(keywords[i]));
                }
                return text;
            };
        }
        return KeyWordService;
    })();
    var keyWords = ["run", "login", "as", "click", "expect", "at", "row", "set"];
    App.keyWordService = new KeyWordService(keyWords);
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