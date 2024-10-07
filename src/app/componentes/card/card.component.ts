import { Component, OnInit } from '@angular/core';

interface Item {
  name: string;
  purchased: boolean;
  isEditing: boolean;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    
  }

  newItem: string = '';
  items: Item[] = [];

  adicionarItem() {
    if (this.newItem.trim()) {
      this.items.push({ name: this.newItem.trim(), purchased: false, isEditing: false });
      this.newItem = '';
    }
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }

  editItem(index: number, newName: string) {
    if (newName.trim()) {
      this.items[index].name = newName.trim();
      this.items[index].isEditing = false;
    }
  }

  toggleEdit(index: number) {
    this.items[index].isEditing = !this.items[index].isEditing;
  }

  togglePurchased(index: number) {
    this.items[index].purchased = !this.items[index].purchased;
  }
}