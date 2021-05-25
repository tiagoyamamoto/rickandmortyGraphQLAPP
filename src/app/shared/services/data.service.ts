import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

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

  constructor() { }
}
