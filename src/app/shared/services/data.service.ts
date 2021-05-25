import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, find, mergeMap, pluck, take, tap, withLatestFrom } from 'rxjs/operators';
import { Character, DataResponse, Episode } from '../interfaces/data.interface';

const QUERY = gql`
{
 episodes {
   results {
     name
     episode
   }
 }
  characters {
   results {
     id
     name
     status
     species
     gender
     image
   }
 }
}`;


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private episodesSubject = new BehaviorSubject<Episode[]>(null);
  episodes$ = this.episodesSubject.asObservable();

  private charactersSubject = new BehaviorSubject<Character[]>(null);
  characters$ = this.charactersSubject.asObservable();

  constructor(private apollo: Apollo) { 
    this.getDataApi();
  }

  private getDataApi(): void {
    this.apollo.watchQuery<DataResponse>({
      query: QUERY
    }).valueChanges.pipe(
      take(1),
      tap(({data}) => {
        const { characters, episodes } = data;
        this.episodesSubject.next(episodes.results);
        this.charactersSubject.next(characters.results);
      })
    ).subscribe();
  }
}