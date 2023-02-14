import { Injectable } from '@angular/core';
import { from, map, Observable, of } from 'rxjs';
import { Feed } from './feed';
import { FEEDS } from './feed/mock-feeds';
import { Story } from './story';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FeedrResponse } from './feedr-response';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private http: HttpClient) { }

  getFeeds(): Observable<Feed[]> {
    return of(FEEDS);
  }

  getFeed(title: string) {
    return this.getFeeds().pipe(
      map((feeds: Feed[]) => feeds.find(feed => feed.title === title)!)
    );
  }

  getStories(feed: Feed): Observable<Story[]> {
    let response = this.http.get<FeedrResponse>("http://www.feedrapp.info/?q="+feed.url+"&num=16");

    let stories = response.pipe(
      map((data: FeedrResponse) => {
        let oStories: Story[] = [];
        data.responseData.feed.entries.forEach((story) => {
          let match = story.content.match(/<img[^>]+src="(([^">]+))"/i);

          console.log(match);
          if (match != null) {
            story.image = match[1];
          }
          
          oStories.push(story);
        });

        return oStories;
      })
    );

    return stories;
  }
}
