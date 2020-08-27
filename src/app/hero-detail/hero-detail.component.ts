import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {

  hero$: Observable<Hero>;

  //hero: Hero;
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.hero$ = this.route.params.pipe(
      switchMap(({id}) => this.heroService.getHero(id))
    );
  }
/*
  getHero(): void {
    const ids = +this.route.snapshot.paramMap.get('id');
    this.id = this.idSearch.next(+this.hero.id);
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);


  }
 */
  goBack(): void {
    this.location.back();
  }

  save(hero: Hero): void {
    console.log(hero);
    this.heroService.updateHero(hero)
      .subscribe(() => this.goBack());
  }
}
