import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { BrowserModule } from '@angular/platform-browser';
import { CardEffectComponent } from './others/card-effect/card-effect.component';
import { CounterModule } from './counter/counter.module';
import { HeroesModule } from './heroes/heroes.module';
import { VampiresModule } from './vampires/vampires.module';

@NgModule({
  declarations: [
    AppComponent,
    CardEffectComponent
  ],
  imports: [
    BrowserModule,
    CounterModule,
    HeroesModule,
    VampiresModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
