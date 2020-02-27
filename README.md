#Intégration d'un Webcomponent Angular dans une SPA

Le but de ce projet est de démontrer la faisabilité d'intégrer un webcomponent dans une SPA dans le but de coller à l'architecture cible du site SID-RA

### But :
Créer un webcomponent **bandeau commun** (qui contiendra un moteur de recherche client et un menu de navigation) intégrable dans une application SPA.

### Démarche :

#### Création du Webcomponent

- Créer un projet Angular **spa-common-bandeau**

`ng new spa-common-bandeau`

- On va intégrer les Custom Element Angular à notre projet. Ainsi nous serons en mesure de convertir notre module Angular en WebComponent

`ng add @angular/elements`

- Déclarer à Angular quel composant on veut convertir en Custom Element, cela se fait dans le fichier **app.module.ts** en déclarant le le component à convertir dans la section **entryComponents**

`@NgModule({
  entryComponents: [
    SearchComponent
  ]
})`

- Dans le constructeur de notre module, on va demander à Angular de définir comment notre composant sera acessible :

`constructor(private injector: Injector) {
    const el = createCustomElement(SearchComponent, {injector});
    customElements.define("common-bandeau", el);
  }
  ngDoBootstrap(){};`
  
- A ce moment, nous sommes en mesure de générer notre webcomponent

`ng build -- prod` 

- On va créer un script qui va unifier l'ensemble des fichiers générés en un seul, c'est le fichier **concatenate.js**
- Créer une entrée pour builder notre composant et concaténer les fichiers dans le fichier **package.json**

`"build:component": "ng build --prod --output-hashing none && node concatenate.js"`

- On appelera simplement notre script en faisant un **npm run build:component**

A noter que le fichier généré **polyfill.js** n'est pas intégré lors de la concaténation des fichiers.
En effet cela peut avoir un effet de bord si notre Webcomponent est intégré dans une application Angular car, dans ce cas, le fichier **zone.js** sera inclus 2 fois et provoquera un plantage.
Pour ce prémunir de cela, un fichier **bootstraper.ts** a été créé
Celui-ci va injecter dynamiquement **Zone** si celui-ci n'est pas disponible au runtime

- Modification du fichier **main.ts** pour pour utiliser notre bootstraper lors du packaging :


`const bootstrapApp = function(): void {
platformBrowserDynamic()
    .bootstrapModule(BandeauModule)
    .then(() => {})
    .catch(err => console.error(err));
};
const bootstrapper = new Bootstrapper(bootstrapApp);
bootstrapper.startup();`

#### Création du notre SPA

Notre SPA sera une application angular classique

`ng new spa-ra`

Pour des raisons de simplicité, un lien a été créé entre notre webcomponent et notre application Angular

- Dans l'application spa-common-bandeau

`npm link`

- Dans l'application **spa-ra**

`npm link spa-common-bandeau`

Dans notre SPA, on va devoir lui dire de ne pas planter à la compile si on lui déclare des composants qu'il ne connait pas (notre Webcomponent)

- Modifier le fichier **app.module.ts** et ajouter 

`schemas: [CUSTOM_ELEMENTS_SCHEMA]`

- Ajouter la dépendance à notre Webcomponent dans le fichier **angular.json** dans la section **project > architect > build > options > scripts**

`"node_modules/spa-common-bandeau/dist/spa-common-bandeau/index.js"`

#### Communication Webcomponent / SPA 

Notre Webcomponent émettra un event lorsqu'un utilisateur sera sélectionné :

- Dans notre composant, on déclarera un **EventEmitter**

`@Output() selectUser = new EventEmitter();`

- A la sélection de l'utilisateur, on aura :

`this.selectUser.emit(event.option.value);`

Côté SPA, on développera une implémentation à l'event **selectUser** déclaré dans notre html

`<common-bandeau (selectUser)="userSelected($event)"></common-bandeau>`

Dans notre typescript

`userSelected(event: CustomEvent) {
    this.user = event.detail;
  }`
  
 
