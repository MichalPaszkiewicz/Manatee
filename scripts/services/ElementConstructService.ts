module App {

    export function getConstruct(item: IConstructable, id: string) {

        var onclick = "onclick='App.editCode(" + id + ")'";

        var totalString = "<li " + onclick + ">" + item.constructString() + "</li>";

        return $(totalString);

    }

}