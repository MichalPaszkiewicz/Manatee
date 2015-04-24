/// <reference path="services/buildservice.ts" />
module App.Control {

    export var buildService = new BuildService(".code");

    function DragDrop(item : HTMLLIElement) {

        var txt = item.textContent.trim();

        var dragger = $("<div class='dragger'>" + txt + "</div>");
        $(".main-content").append(dragger);

        dragger.css({ width: item.clientWidth, left: item.offsetLeft, top: item.offsetTop});

        $(document).on("mousemove", function (e) {
            dragger.css({ left: e.clientX - item.clientWidth / 2, top: e.clientY - item.clientHeight / 2});
        });
        
        $(document).on("mouseup", function (e) {
            $(document).unbind("mousemove");
            var middleBox = $(".script")[0];

            if (e.clientX > middleBox.offsetLeft) {

                var id = guidGenerator();
                $(middleBox).append($(getConstruct(new TextConstruct(txt), id)));
                buildService.insert(new Code(id, getCode(txt)));

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
        $(".dragger").css({cursor:"-webkit-grabbing"});
    }); 
} 