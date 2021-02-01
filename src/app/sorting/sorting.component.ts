import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { UpdateEvent, DeleteEvent } from './events';

class Card {
  value: string|number;

  constructor(value?: string|number) {
    this.value = value || 0;
  }
}

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss']
})
export class SortingComponent implements OnInit {

  cards: Card[];
  freeRangeCards: Card[];
  cardFontSize: string;
  showInstructions: boolean = true;
  minValue: number = 0;
  maxValue: number = 99;

  constructor() {
    this.cards = [
      new Card(1),
      new Card(2)
    ];
    this.freeRangeCards = [];
    this.cardFontSize = `${(window.innerWidth / this.cards.length) * .3}px`;
  }

  ngOnInit(): void {
    
  }

  drop(event: CdkDragDrop<Card[]>) {
    moveItemInArray(this.cards, event.previousIndex, event.currentIndex);
  }

  onChange(event: UpdateEvent) {
    if (event.type === 'sorting')
      this.cards[event.index].value = event.value;
    else if (event.type === 'free')
      this.freeRangeCards[event.index].value = event.value;
  }

  onDelete(event: DeleteEvent) {
    if (event.type === 'sorting')
      this.cards.splice(event.index, 1);
    else if (event.type === 'free')
      this.freeRangeCards.splice(event.index, 1);
  }

  setMin(value: string) {
    if (value.trim().match(/\d/) && +value >= 0 && +value <= 99) {
      this.minValue = +value;
    }
  }

  setMax(value: string) {
    if (value.trim().match(/\d/) && +value >= 0 && +value <= 99) {
      this.maxValue = +value;
    }
  }

  addCards(value: string) {
    if (value.trim().match(/\d/) && +value >= 0 && +value <= 99) {
      for (let i = 0; i < +value; i++) {
        this.cards.push(new Card(Math.floor(Math.random() * (this.maxValue - this.minValue) + this.minValue)));
      }
      this.cardFontSize = `${(window.innerWidth / this.cards.length) * .3}px`;
    } else {
      alert('Must be a number between 1 and 99');
    }
  }

  addFreeRangeCards(value: string) {
    if (value.trim().match(/\d/) && +value >= 0 && +value <= 99) {
      for (let i = 0; i < +value; i++) {
        this.freeRangeCards.push(new Card());
      }
      this.cardFontSize = `${(window.innerWidth / this.cards.length) * .3}px`;
    } else {
      alert('Must be a number between 1 and 99');
    }
  }

  toggleInstructions() {
    this.showInstructions = !this.showInstructions;
  }

}
