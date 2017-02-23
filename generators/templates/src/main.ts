import * as angular from "angular";
import 'angular-ui-router';

import { AppComponent }   from "./components/app.component";
import { HomeComponent }   from "./components/home.component";

module App {
    
	angular.module('app', ["ui.router"])
    .config(function(
        $stateProvider: angular.ui.IStateProvider,
        $urlRouterProvider: angular.ui.IUrlRouterProvider,
        $locationProvider: angular.ILocationProvider
    ){
        var states = [
            {
                name: 'home',
                url: '/home',
                template: '<home></home>'
            },
            {
                name: 'about',
                url: '/about',
                template: '<about>AAABout page</about>'
            }        
        ];

        states.forEach(function(state) {
            $stateProvider.state(state);
        });

        $urlRouterProvider.otherwise('/home',);
        // $locationProvider.html5Mode(true).hashPrefix("!");
    })
    .component(AppComponent.componentName, AppComponent.componentConfig)
    .component(HomeComponent.componentName, HomeComponent.componentConfig)
    ;
}