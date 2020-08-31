import { Component, OnInit, NgModule } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Subscription, Observable, Subject } from 'rxjs';
import { delay, tap, switchMap } from 'rxjs/operators';



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
    /*setTimeout(() => {
      this.display = true;
    }, 4000);
   */
  }




  getHeroes(): void {
   this.heroesSubscription = this.heroService.getHeroes().pipe(delay(4000), tap(() => this.display = true))
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));

  }
}
