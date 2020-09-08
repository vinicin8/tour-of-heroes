import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Subscription } from 'rxjs';
import { delay, tap } from 'rxjs/operators';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  heroesSubscription: Subscription;
  constructor(private heroService: HeroService) { }
  display = false;


  ngOnInit() {
    this.getHeroes();
  }




  getHeroes(): void {
   this.heroesSubscription = this.heroService.getHeroes().pipe(delay(2000), tap(() => this.display = true))
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));

  }
}
