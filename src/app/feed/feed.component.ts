import { Component, Input } from '@angular/core';
import { Feed } from '../feed';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { FeedService } from '../feed.service';
import { Story } from '../story';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent {
  feed$!: Observable<Feed>;
  stories$!: Observable<Story[]>;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private feedService: FeedService
  ) {
  }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id')!;
    this.feed$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => 
        this.feedService.getFeed(params.get('id')!))
    );

    this.feed$.subscribe(feed => this.stories$ = this.feedService.getStories(feed));

    this.stories$.subscribe(story => console.log(story));
  }

}
