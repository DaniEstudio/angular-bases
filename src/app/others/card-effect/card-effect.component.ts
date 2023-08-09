import { Component } from '@angular/core';

@Component({
  selector: 'app-card-effect',
  templateUrl: './card-effect.component.html',
  styleUrls: ['./card-effect.component.scss']
})
export class CardEffectComponent {
  isTransformed: boolean = false;
  targetElement: HTMLElement | null = null;

  applyTransform(event: MouseEvent) {
    if (!this.isTransformed) {
      this.targetElement = <HTMLElement>event.target;
      this.isTransformed = true;
    }

    if (this.targetElement === event.target && this.targetElement) {
      const width = this.targetElement.offsetWidth;
      const height = this.targetElement.offsetHeight;
      const offsetX = event.offsetX;
      const offsetY = event.offsetY;

      const yRotation = ((offsetX - width / 2) / width) * 20;
      const xRotation = ((offsetY - height / 2) / height) * 20;

      this.targetElement.style.setProperty('--yRotation', yRotation + 'deg');
      this.targetElement.style.setProperty('--xRotation', xRotation + 'deg');
    }
  }

  removeTransform(event: MouseEvent) {
    if (this.isTransformed && this.targetElement === event.target) {
      if (this.targetElement) {
        this.targetElement.style.removeProperty('--yRotation');
        this.targetElement.style.removeProperty('--xRotation');
      }

      this.isTransformed = false;
      this.targetElement = null;
    }
  }
}
