import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {


selectedHero: Hero;
heroes: Hero[];


onSelect(hero: Hero): void {
  this.selectedHero = hero;
  this.messageService.add(`Herói selecionado -  id=${hero.id}`);
}
constructor(private heroService: HeroService, private messageService: MessageService) {}
getHeroes(): void {
  this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
}

  ngOnInit(): void {
    this.getHeroes();
  }

}
