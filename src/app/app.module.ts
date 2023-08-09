import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CounterModule } from './counter/counter.module';
import { HeroesModule } from './heroes/heroes.module';

import { AppComponent } from './app.component';
import { CardEffectComponent } from './others/card-effect/card-effect.component';
import { ComparisonComponent } from './others/comparison/comparison.component';

@NgModule({
  declarations: [
    AppComponent,
    CardEffectComponent,
    ComparisonComponent,
  ],
  imports: [
    BrowserModule,
    CounterModule,
    HeroesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
