import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

interface Item {
  id?: number;
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
  newItem: string = '';
  items: Item[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {}

  adicionarItem() {
    if (this.newItem.trim()) {
      const item: Item = { name: this.newItem.trim(), purchased: false, isEditing: false };

      // Enviar o item para a API
      this.dataService.addItem(item).subscribe(
        (response) => {
          this.items.push(response);  
          this.newItem = '';  
        },
        (error) => {
          console.error('Erro ao adicionar item:', error);
        }
      );
    }
  }

  removeItem(index: number) {
    const itemToRemove = this.items[index];
    if (itemToRemove.id) {
      this.dataService.removeItem(itemToRemove.id).subscribe(
        () => {
          this.items.splice(index, 1);
        },
        (error) => {
          console.error('Erro ao remover item:', error);
        }
      );
    }
  }

  editItem(index: number, newName: string) {
    if (newName.trim()) {
      this.items[index].name = newName.trim();
      this.items[index].isEditing = false;

      const updatedItem = this.items[index];
      this.dataService.updateItem(updatedItem).subscribe(
        (response) => {
          console.log('Item atualizado:', response);
        },
        (error) => {
          console.error('Erro ao atualizar item:', error);
        }
      );
    }
  }

  toggleEdit(index: number) {
    this.items[index].isEditing = !this.items[index].isEditing;
  }

  togglePurchased(index: number) {
    this.items[index].purchased = !this.items[index].purchased;
  }
}
