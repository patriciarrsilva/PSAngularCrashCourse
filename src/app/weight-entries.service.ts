import { Injectable } from "@angular/core";
import { Entry } from "./model/entry";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeightEntriesService {
  constructor(private http: HttpClient) {
  }

  public getEntries() {
    return this.http.get<Entry[]>('/api/entries').pipe(
      map(entries => { // map operator from rxjs - allows us to manipulate the values as they pass through the stream
        return entries.map(e => { // array map
          e.date = new Date(e.date);
          return e;
        })
      }),
      map(entries => {
        return entries.sort((a: Entry, b: Entry) => {
          if (a.date > b.date) {
            return 1;
          } else if (a.date.getTime() == b.date.getTime()) {
            return 0;
          } else {
            return -1
          }
        });
      })
    )
  }

  addEntry(entry: Entry) {
    return this.http.post('/api/entries', entry)
  }
}