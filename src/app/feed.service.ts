import { Inject, Injectable } from '@angular/core';
import { from, map, Observable, of } from 'rxjs';
import { Feed } from './feed';
import { FEEDS } from './feed/mock-feeds';
import { Story } from './story';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FeedrResponse } from './feedr-response';
import { APP_BASE_HREF } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(@Inject(APP_BASE_HREF) public baseHref:string, private http: HttpClient) { }

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
          let matches = story.content.match(/<img[^>]+src="(([^">]+))"/gi);

          let foundImage = false;
          if (matches != null) {
            
            
            for (let i = 0; i < matches.length && !foundImage; i++) {
              let match = matches[i].match(/<img[^>]+src="(([^">]+))"/i);
              
              if (match != null) {

                if (match[1].includes("api.follow.it")) {
                  continue;
                }
                story.image = match[1];
                foundImage = true;
              }
            }

          } 
          
          if (!foundImage) {
            story.image = this.baseHref + 'assets/article.png';
          }
          
          oStories.push(story);
        });

        return oStories;
      })
    );

    return stories;
  }
}
