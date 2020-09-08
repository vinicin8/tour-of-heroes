import { Component, OnInit, OnDestroy } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Subscription } from 'rxjs';
import { delay, tap} from 'rxjs/operators';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit, OnDestroy {
  heroes: Hero[];
  heroesSubscription: Subscription;
  display2 = false;
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroesSubscription = this.heroService.getHeroes().pipe(delay(2000), tap(() => this.display2 = true))
    .subscribe(heroes => this.heroes = heroes);

  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero).subscribe(heroes => {
        this.heroes.push(heroes);
      });

  }

  delete(hero: Hero): void {
    if (window.confirm(`Você realmente quer deletar o ${hero.name}?`)) {
      this.heroes = this.heroes.filter(h => h !== hero);
      this.heroService.deleteHero(hero).subscribe();
    }
  }



  ngOnDestroy() {
    this.heroesSubscription.unsubscribe();
  }
}
