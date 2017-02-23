export class AppComponent {

    static componentName  : string = "app";
    static componentConfig:ng.IComponentOptions = {
        bindings: {
        },
        controller: AppComponent,
        controllerAs: "$AppCtrl",
        templateUrl: "views/app.component.html"
    };

    constructor() {
        console.log('AppComponent init');
    }
 
}