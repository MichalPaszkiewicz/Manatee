var App;
(function (App) {
    var Control;
    (function (Control) {
        function DragDrop(item) {
            console.log(item);
            var txt = item.textContent.trim();
            var dragger = $("<div class='dragger'>" + txt + "</div>");
            $(".main-content").append(dragger);
            var x = item.offsetLeft;
            var y = item.offsetTop;
            console.log(x + " " + y);
            dragger.css({ width: item.clientWidth, left: x, top: y });
            $(document).on("mousemove", function (e) {
                console.log(e.clientX + "," + e.clientY);
                dragger.css({ left: e.clientX - item.clientWidth / 2, top: e.clientY - item.clientHeight / 2 });
            });
            $(document).on("mouseup", function (e) {
                $(document).unbind("mousemove");
                var leftBox = $(".section.left .script")[0];
                if (e.clientX < leftBox.offsetLeft + leftBox.clientWidth) {
                    $(leftBox).append($("<li>" + txt + "</li>"));
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