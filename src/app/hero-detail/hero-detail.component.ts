import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero$: Observable<Hero>;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.hero$ = this.route.params.pipe(
      switchMap(({ id }) => this.heroService.getHero(id))
    );

  }

  goBack(): void {
    this.location.back();
  }

  save(hero: Hero): void {
    console.log(hero);
    this.heroService.updateHero(hero).
      subscribe(() => this.goBack());
  }
}
