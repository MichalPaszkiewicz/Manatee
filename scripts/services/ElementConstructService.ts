module App {

    export function getConstruct(item: IConstructable) {

        var totalString = "<li>" + item.constructString() + "</li>";

        return $(totalString);

    }

}