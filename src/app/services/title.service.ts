import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from "rxjs";

export interface Title{
  id: number;
  start: string;
  end: string;
  text: string;
}

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  constructor(private http: HttpClient){}

  loadTitle(title: string){
    return this.http.get(title, {responseType: "text"}).pipe(
      map(data => this.parseSRT(data))
    )
  }

  parseSRT(data: string){
    const normalizedData = data.replace(/\r\n|\r/g, '\n');
    const blocks = normalizedData.trim().split('\n\n');
    const titles: Title[] = [];

    blocks.forEach(block => {
      const lines = block.split('\n');
      if(lines.length >= 3){
        const id = parseInt(lines[0], 10);
        const [start, end] = lines[1].split(" --> ");
        const text = lines.slice(2).join('\n').trim();

        titles.push({id, start, end, text});
      }
    });

    return titles;
  }
}
