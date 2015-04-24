module App {

    class LocalStorageService {
        
        getItem: (itemName: string) => any;

        setItem: (itemName: string, itemValue: Object) => void;

        constructor() {

            this.getItem = function (itemName: string) {
                var stringResult = localStorage.getItem(itemName);

                return JSON.parse(stringResult);
            }

            this.setItem = function (itemName: string, itemValue: Object) {
                localStorage.setItem(itemName, JSON.stringify(itemValue));
            }
        } 
    }

    export var Database = new LocalStorageService();
} 