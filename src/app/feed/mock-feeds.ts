import { Feed } from "../feed";

export const FEEDS: Feed[] = [
    { title: 'SRF', url: 'https://www.srf.ch/news/bnf/rss/1646', onlyImage: false },
    { title: 'NZZ', url: 'https://www.nzz.ch/recent.rss', onlyImage: false },
    { title: 'Bund', url: 'https://partner-feeds.publishing.tamedia.ch/rss/derbund/ticker', onlyImage: false },
    { title: 'xkcd', url: 'https://xkcd.com/rss.xml', onlyImage: true },
    { title: 'Postillon', url: 'https://follow.it/der-postillon-abo?user=kreemer&key=2k6O1LHNPrM', onlyImage: false}
     
]