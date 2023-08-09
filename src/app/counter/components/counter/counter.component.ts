import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html'
})
export class CounterComponent {
  public counter: number = 0;

  incrementar( cantidad: number ) : void{
    this.counter += cantidad;
  }

  restar( cantidad: number ): void {
    this.counter -= cantidad;
  }

  resetCounter(): void {
    this.counter = 0;
  }
}
