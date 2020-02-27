import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { BandeauModule } from './app/app.module';
import { environment } from './environments/environment';
import { Bootstrapper } from './bootstraper';

if (environment.production) {
  enableProdMode();
}

const bootstrapApp = function(): void {
  platformBrowserDynamic()
    .bootstrapModule(BandeauModule)
    .then(() => {})
    .catch(err => console.error(err));
};

const bootstrapper = new Bootstrapper(bootstrapApp);
bootstrapper.startup();
