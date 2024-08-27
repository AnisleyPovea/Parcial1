import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent{
@Input() title: string='';
@Input() description: string='';
@Input() image: string='';
@Input() price: number=0;
@Input() category: string='';
@Input() id: number=0;
@Input() rating: { rate: number, count: number } = { rate: 0, count: 0 };

  constructor() { }

 getStarArray(rate: number): boolean[] {
  return Array.from({ length: 5 }, (_, i) => i < Math.round(rate));
}

}

