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

  private minCards: number = 0;
  private maxCards: number = 50;
  cards: Card[];
  freeRangeCards: Card[];
  minValue: number = 1;
  maxValue: number = 99;
  valueType: boolean = true;
  cardSize: string = "5vw";
  cardFontSize: string = "5vw";

  constructor() {
    this.cards = [
      new Card(1),
      new Card(2)
    ];
    this.freeRangeCards = [];
  }

  ngOnInit(): void {
    this.calcSize();
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
    if (value.trim().match(/\d/) && +value >= this.minCards && +value <= this.maxCards) {
      this.minValue = +value;
    }
  }

  setMax(value: string) {
    if (value.trim().match(/\d/) && +value >= this.minCards && +value <= this.maxCards) {
      this.maxValue = +value;
    }
  }

  addCards(value?: string) {
    if (this.valueType) {
      if (value && value.trim().match(/\d/) && +value >= this.minCards && +value <= this.maxCards) {
        for (let i = 0; i < +value; i++) {
          this.cards.push(new Card(Math.floor(Math.random() * (this.maxValue - this.minValue) + this.minValue)));
        }
      } else {
        alert(`Must be a number between ${this.minCards} and ${this.maxCards}`);
      }
    } else {
      for (let i = this.minValue; i <= this.maxValue; i++) {
        this.cards.push(new Card(i));
      }
    }
    this.calcSize();
  }

  addFreeRangeCards(value: string) {
    if (value.trim().match(/\d/) && +value >= this.minCards && +value <= this.maxCards) {
      for (let i = 0; i < +value; i++) {
        this.freeRangeCards.push(new Card());
      }
    } else {
      alert(`Must be a number between ${this.minCards} and ${this.maxCards}`);
    }
  }

  updateValueType(value: string) {
    this.valueType = value === 'random';
    console.log(this.valueType)
  }

  calcSize() {
    let x = (window.innerWidth / this.cards.length);
    this.cardSize = `${x * .85 > 400 ? 400 : x * .85}px`;
    this.cardFontSize = `${x * .65 > 400 ? 400 : x * .65}px`;
  }
}
