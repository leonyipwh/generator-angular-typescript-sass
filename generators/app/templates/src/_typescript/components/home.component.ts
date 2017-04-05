export class HomeComponent {

    static componentName  : string = "home";
    static componentConfig:ng.IComponentOptions = {
        bindings: {
        },
        controller: HomeComponent,
        controllerAs: "$HomeCtrl",
        templateUrl: "views/home.component.html"
    };

    constructor() {
        console.log('Home Component init');
    }
 
}