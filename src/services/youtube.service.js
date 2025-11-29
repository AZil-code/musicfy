// https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=YOUR_API_KEY

import { SEARCH_RESULT_AMOUNT, YTB_API_KEY } from '../consts';

const base_url = 'https://www.googleapis.com/youtube/v3';

export const youtubeService = {
   searchSongs,
   formatSong,
};

async function searchSongs(searchStr) {
   const type = 'video';
   const part = 'snippet';
   const endpoint = `${base_url}/search?key=${YTB_API_KEY}&type=${type}&part=${part}&q=${searchStr}&maxResults=${SEARCH_RESULT_AMOUNT}`;
   const res = await fetch(endpoint, { method: 'GET' });
   if (!res.ok) throw new Error(`Bad status code! ${res.status} - ${res.statusText}`);
   const data = await res.json();
   if (!data || !Array.isArray(data.items)) return [];
   return data.items;
}

// For dev purposes
// async function searchSongs(searchStr) {
//    const a = new Response(JSON.stringify(mockRes));
//    return a;
// }

function formatSong(ytbSong = {}) {
   const { id, snippet = {} } = ytbSong;
   const videoId = (id && id.videoId) || id || '';
   const thumbnails = snippet && snippet.thumbnails ? snippet.thumbnails : {};
   const fallbackImg = thumbnails.high?.url || thumbnails.medium?.url || thumbnails.default?.url || '';
   const channelTitle = (snippet && snippet.channelTitle) || '';
   return {
      _id: videoId,
      title: snippet.title,
      ytbId: videoId,
      album: '',
      genre: '',
      artists: channelTitle ? [{ name: channelTitle }] : [],
      imgUrl: fallbackImg,
   };
}

const mockRes = {
   kind: 'youtube#searchListResponse',
   etag: 'QdMc67LNopY01xgXkj6TbBXN98M',
   nextPageToken: 'CBkQAA',
   regionCode: 'IL',
   pageInfo: {
      totalResults: 1000000,
      resultsPerPage: 25,
   },
   items: [
      {
         kind: 'youtube#searchResult',
         etag: 'XjuO8rb3WLMUqImUaXfn0RhiQXc',
         id: {
            kind: 'youtube#video',
            videoId: 'gKpdPOdN26Y',
         },
         snippet: {
            publishedAt: '2014-11-24T21:46:52Z',
            channelId: 'UCJls2FMEbRYxi28jcuKe2vA',
            title: 'Waking The Fallen: Resurrected',
            description:
               'Provided to YouTube by Hopeless Records Inc Waking The Fallen: Resurrected · Avenged Sevenfold Waking The Fallen: ...',
            thumbnails: {
               default: {
                  url: 'https://i.ytimg.com/vi/gKpdPOdN26Y/default.jpg',
                  width: 120,
                  height: 90,
               },
               medium: {
                  url: 'https://i.ytimg.com/vi/gKpdPOdN26Y/mqdefault.jpg',
                  width: 320,
                  height: 180,
               },
               high: {
                  url: 'https://i.ytimg.com/vi/gKpdPOdN26Y/hqdefault.jpg',
                  width: 480,
                  height: 360,
               },
            },
            channelTitle: 'Avenged Sevenfold - Topic',
            liveBroadcastContent: 'none',
            publishTime: '2014-11-24T21:46:52Z',
         },
      },
      {
         kind: 'youtube#searchResult',
         etag: 'vM7lg1PobhlzG4eUwaCZ-ZpzFsA',
         id: {
            kind: 'youtube#video',
            videoId: 'TIld9jnqZlA',
         },
         snippet: {
            publishedAt: '2011-10-11T22:42:08Z',
            channelId: 'UCToUNe4i9j_SlKGFl8MrQHg',
            title: 'Avenged Sevenfold - Waking the Fallen',
            description:
               "Avenged Sevenfold's 'Waking The Fallen: Resurrected' is out now via Hopeless Records. Buy now on iTunes: ...",
            thumbnails: {
               default: {
                  url: 'https://i.ytimg.com/vi/TIld9jnqZlA/default.jpg',
                  width: 120,
                  height: 90,
               },
               medium: {
                  url: 'https://i.ytimg.com/vi/TIld9jnqZlA/mqdefault.jpg',
                  width: 320,
                  height: 180,
               },
               high: {
                  url: 'https://i.ytimg.com/vi/TIld9jnqZlA/hqdefault.jpg',
                  width: 480,
                  height: 360,
               },
            },
            channelTitle: 'Hopeless Records',
            liveBroadcastContent: 'none',
            publishTime: '2011-10-11T22:42:08Z',
         },
      },
      {
         kind: 'youtube#searchResult',
         etag: 'OJ6QVmAStGsc_8enJJXyHKGP4Ck',
         id: {
            kind: 'youtube#video',
            videoId: '36stRPPIy2w',
         },
         snippet: {
            publishedAt: '2015-08-11T23:55:49Z',
            channelId: 'UCJls2FMEbRYxi28jcuKe2vA',
            title: 'Unholy Confessions',
            description:
               'Provided to YouTube by Hopeless Records Inc Unholy Confessions · Avenged Sevenfold Waking The Fallen ℗ 2003 Hopeless ...',
            thumbnails: {
               default: {
                  url: 'https://i.ytimg.com/vi/36stRPPIy2w/default.jpg',
                  width: 120,
                  height: 90,
               },
               medium: {
                  url: 'https://i.ytimg.com/vi/36stRPPIy2w/mqdefault.jpg',
                  width: 320,
                  height: 180,
               },
               high: {
                  url: 'https://i.ytimg.com/vi/36stRPPIy2w/hqdefault.jpg',
                  width: 480,
                  height: 360,
               },
            },
            channelTitle: 'Avenged Sevenfold - Topic',
            liveBroadcastContent: 'none',
            publishTime: '2015-08-11T23:55:49Z',
         },
      },
      {
         kind: 'youtube#searchResult',
         etag: 'OHcNGVkivYtjW75DlfRlB9LVJ1A',
         id: {
            kind: 'youtube#video',
            videoId: 'NiqJXz653IU',
         },
         snippet: {
            publishedAt: '2025-03-15T23:12:42Z',
            channelId: 'UCW65atOhrL2VNeD9CfYaqBg',
            title: 'Avenged Sevenfold - Waking The Fallen (Full Album 2003)',
            description:
               'Avenged Sevenfold (United States) Waking The Fallen (2nd Album) Released: August 26th, 2003 Label: Hopeless Records ...',
            thumbnails: {
               default: {
                  url: 'https://i.ytimg.com/vi/NiqJXz653IU/default.jpg',
                  width: 120,
                  height: 90,
               },
               medium: {
                  url: 'https://i.ytimg.com/vi/NiqJXz653IU/mqdefault.jpg',
                  width: 320,
                  height: 180,
               },
               high: {
                  url: 'https://i.ytimg.com/vi/NiqJXz653IU/hqdefault.jpg',
                  width: 480,
                  height: 360,
               },
            },
            channelTitle: 'Metalhead - foREVer',
            liveBroadcastContent: 'none',
            publishTime: '2025-03-15T23:12:42Z',
         },
      },
      {
         kind: 'youtube#searchResult',
         etag: 'o2bb_eyuwE8yd3tEJXXloyQaARo',
         id: {
            kind: 'youtube#video',
            videoId: 'pqdn1VvjVek',
         },
         snippet: {
            publishedAt: '2023-04-25T15:00:39Z',
            channelId: 'UCuvX5rV31-OL3IQVmqUkfdw',
            title: 'What M Shadows REALLY thinks about &quot;Waking The Fallen&quot;',
            description:
               'M Shadows of Avenged Sevenfold joins to talk about what he REALLY thinks of "Waking The Fallen." Full interview: ...',
            thumbnails: {
               default: {
                  url: 'https://i.ytimg.com/vi/pqdn1VvjVek/default.jpg',
                  width: 120,
                  height: 90,
               },
               medium: {
                  url: 'https://i.ytimg.com/vi/pqdn1VvjVek/mqdefault.jpg',
                  width: 320,
                  height: 180,
               },
               high: {
                  url: 'https://i.ytimg.com/vi/pqdn1VvjVek/hqdefault.jpg',
                  width: 480,
                  height: 360,
               },
            },
            channelTitle: 'Punk Rock MBA Podcast clips',
            liveBroadcastContent: 'none',
            publishTime: '2023-04-25T15:00:39Z',
         },
      },
      {
         kind: 'youtube#searchResult',
         etag: '9jRfIB1Vtb_Fwn-PNUBuxZRwmhk',
         id: {
            kind: 'youtube#video',
            videoId: 'uEWm-FfvgI4',
         },
         snippet: {
            publishedAt: '2025-05-08T01:05:09Z',
            channelId: 'UCw1NPWdyFiYTeHkA3XkE4cg',
            title: 'Avenged Sevenfold, Waking The Fallen, Full Album (Original Tracks)',
            description:
               'Waking the Fallen is the second studio album by American heavy metal band Avenged Sevenfold, released on August 26, 2003, ...',
            thumbnails: {
               default: {
                  url: 'https://i.ytimg.com/vi/uEWm-FfvgI4/default.jpg',
                  width: 120,
                  height: 90,
               },
               medium: {
                  url: 'https://i.ytimg.com/vi/uEWm-FfvgI4/mqdefault.jpg',
                  width: 320,
                  height: 180,
               },
               high: {
                  url: 'https://i.ytimg.com/vi/uEWm-FfvgI4/hqdefault.jpg',
                  width: 480,
                  height: 360,
               },
            },
            channelTitle: 'Goosetraxx Radio',
            liveBroadcastContent: 'none',
            publishTime: '2025-05-08T01:05:09Z',
         },
      },
      {
         kind: 'youtube#searchResult',
         etag: 'm6WXa7B8LbRBEuMkPsd61cltJAc',
         id: {
            kind: 'youtube#video',
            videoId: '433S3tuuB94',
         },
         snippet: {
            publishedAt: '2011-10-11T22:41:30Z',
            channelId: 'UCToUNe4i9j_SlKGFl8MrQHg',
            title: 'Avenged Sevenfold - Chapter Four',
            description:
               "Avenged Sevenfold's 'Waking The Fallen: Resurrected' is out now via Hopeless Records. Stream 'Waking The Fallen' today: ...",
            thumbnails: {
               default: {
                  url: 'https://i.ytimg.com/vi/433S3tuuB94/default.jpg',
                  width: 120,
                  height: 90,
               },
               medium: {
                  url: 'https://i.ytimg.com/vi/433S3tuuB94/mqdefault.jpg',
                  width: 320,
                  height: 180,
               },
               high: {
                  url: 'https://i.ytimg.com/vi/433S3tuuB94/hqdefault.jpg',
                  width: 480,
                  height: 360,
               },
            },
            channelTitle: 'Hopeless Records',
            liveBroadcastContent: 'none',
            publishTime: '2011-10-11T22:41:30Z',
         },
      },
      {
         kind: 'youtube#searchResult',
         etag: '8NXxkLADJbxjeGYkM8ufJLiNgBs',
         id: {
            kind: 'youtube#video',
            videoId: 'iyY7Z2hMMGM',
         },
         snippet: {
            publishedAt: '2014-08-28T01:33:01Z',
            channelId: 'UC9keqYABefKefWX11TrzC7w',
            title: 'A7X - Waking the Fallen Resurrected Documentary',
            description:
               'A documentary about the making of waking the fallen and how the band became successful. Avenged Sevenfold Album Waking ...',
            thumbnails: {
               default: {
                  url: 'https://i.ytimg.com/vi/iyY7Z2hMMGM/default.jpg',
                  width: 120,
                  height: 90,
               },
               medium: {
                  url: 'https://i.ytimg.com/vi/iyY7Z2hMMGM/mqdefault.jpg',
                  width: 320,
                  height: 180,
               },
               high: {
                  url: 'https://i.ytimg.com/vi/iyY7Z2hMMGM/hqdefault.jpg',
                  width: 480,
                  height: 360,
               },
            },
            channelTitle: 'A7XEntertainment',
            liveBroadcastContent: 'none',
            publishTime: '2014-08-28T01:33:01Z',
         },
      },
      {
         kind: 'youtube#searchResult',
         etag: 'B9GE_jv6BCGJIReeiGF84X9C6gI',
         id: {
            kind: 'youtube#video',
            videoId: 'rCNTEAh9Kdw',
         },
         snippet: {
            publishedAt: '2025-10-19T04:28:04Z',
            channelId: 'UCWMJW-pr5kwmA-JDNvDhmbQ',
            title: 'Will he able to save the cow 🐄❓ What you think 🤔 #shorts #viralshorts',
            description:
               'Oh! Will he able to save the cow ❓ What you think #shorts #viralshorts Once a Cow and baby cow was walking suddenly ...',
            thumbnails: {
               default: {
                  url: 'https://i.ytimg.com/vi/rCNTEAh9Kdw/default.jpg',
                  width: 120,
                  height: 90,
               },
               medium: {
                  url: 'https://i.ytimg.com/vi/rCNTEAh9Kdw/mqdefault.jpg',
                  width: 320,
                  height: 180,
               },
               high: {
                  url: 'https://i.ytimg.com/vi/rCNTEAh9Kdw/hqdefault.jpg',
                  width: 480,
                  height: 360,
               },
            },
            channelTitle: 'The Last Scene ',
            liveBroadcastContent: 'none',
            publishTime: '2025-10-19T04:28:04Z',
         },
      },
      {
         kind: 'youtube#searchResult',
         etag: 'XSI9OYzoGwcV3kfbKWhhMHp5Ojs',
         id: {
            kind: 'youtube#video',
            videoId: 'vqw65P2zOgo',
         },
         snippet: {
            publishedAt: '2015-05-06T12:58:05Z',
            channelId: 'UCxeSzFxBVyHUw8UINFBMcrQ',
            title: 'Avenged Sevenfold - Waking The Fallen [Lyrics on screen] [Full HD]',
            description: 'Song: Waking The Fallen Album: Waking The Fallen My Twitter: http://adf.ly/VQ6Ss.',
            thumbnails: {
               default: {
                  url: 'https://i.ytimg.com/vi/vqw65P2zOgo/default.jpg',
                  width: 120,
                  height: 90,
               },
               medium: {
                  url: 'https://i.ytimg.com/vi/vqw65P2zOgo/mqdefault.jpg',
                  width: 320,
                  height: 180,
               },
               high: {
                  url: 'https://i.ytimg.com/vi/vqw65P2zOgo/hqdefault.jpg',
                  width: 480,
                  height: 360,
               },
            },
            channelTitle: 'A7XLyrics',
            liveBroadcastContent: 'none',
            publishTime: '2015-05-06T12:58:05Z',
         },
      },
      {
         kind: 'youtube#searchResult',
         etag: 'x8c4ZBPzaAGj9GYTtwq7DQpBVz0',
         id: {
            kind: 'youtube#video',
            videoId: 'tysmwGx7TNU',
         },
         snippet: {
            publishedAt: '2011-10-11T22:40:55Z',
            channelId: 'UCToUNe4i9j_SlKGFl8MrQHg',
            title: 'Avenged Sevenfold - Remenissions',
            description:
               "Avenged Sevenfold's 'Waking The Fallen' is out now via Hopeless Records. Stream today: https://ffm.to/wakingthefallen ...",
            thumbnails: {
               default: {
                  url: 'https://i.ytimg.com/vi/tysmwGx7TNU/default.jpg',
                  width: 120,
                  height: 90,
               },
               medium: {
                  url: 'https://i.ytimg.com/vi/tysmwGx7TNU/mqdefault.jpg',
                  width: 320,
                  height: 180,
               },
               high: {
                  url: 'https://i.ytimg.com/vi/tysmwGx7TNU/hqdefault.jpg',
                  width: 480,
                  height: 360,
               },
            },
            channelTitle: 'Hopeless Records',
            liveBroadcastContent: 'none',
            publishTime: '2011-10-11T22:40:55Z',
         },
      },
      {
         kind: 'youtube#searchResult',
         etag: 'WNU4H2arP8KH7-uDYM__zi10C7U',
         id: {
            kind: 'youtube#video',
            videoId: 'piRVvIlShyg',
         },
         snippet: {
            publishedAt: '2015-08-12T01:06:59Z',
            channelId: 'UCJls2FMEbRYxi28jcuKe2vA',
            title: 'Eternal Rest',
            description:
               'Provided to YouTube by Hopeless Records Inc Eternal Rest · Avenged Sevenfold Waking The Fallen ℗ 2003 Hopeless Records, ...',
            thumbnails: {
               default: {
                  url: 'https://i.ytimg.com/vi/piRVvIlShyg/default.jpg',
                  width: 120,
                  height: 90,
               },
               medium: {
                  url: 'https://i.ytimg.com/vi/piRVvIlShyg/mqdefault.jpg',
                  width: 320,
                  height: 180,
               },
               high: {
                  url: 'https://i.ytimg.com/vi/piRVvIlShyg/hqdefault.jpg',
                  width: 480,
                  height: 360,
               },
            },
            channelTitle: 'Avenged Sevenfold - Topic',
            liveBroadcastContent: 'none',
            publishTime: '2015-08-12T01:06:59Z',
         },
      },
      {
         kind: 'youtube#searchResult',
         etag: 'NhHzbOh3v5FPjz8Ra0mN_F56Q0Q',
         id: {
            kind: 'youtube#video',
            videoId: '17HHZ0Jtbbs',
         },
         snippet: {
            publishedAt: '2024-01-05T02:38:37Z',
            channelId: 'UCnwBOsEmSyqeG-tlkVTZKCg',
            title: 'Ranking &#39;Waking the Fallen&#39; Songs (Avenged Sevenfold)',
            description: 'avengedsevenfold #Wakingthefallen #albumreview #songs #ranking #rating.',
            thumbnails: {
               default: {
                  url: 'https://i.ytimg.com/vi/17HHZ0Jtbbs/default.jpg',
                  width: 120,
                  height: 90,
               },
               medium: {
                  url: 'https://i.ytimg.com/vi/17HHZ0Jtbbs/mqdefault.jpg',
                  width: 320,
                  height: 180,
               },
               high: {
                  url: 'https://i.ytimg.com/vi/17HHZ0Jtbbs/hqdefault.jpg',
                  width: 480,
                  height: 360,
               },
            },
            channelTitle: 'Song Rankings',
            liveBroadcastContent: 'none',
            publishTime: '2024-01-05T02:38:37Z',
         },
      },
      {
         kind: 'youtube#searchResult',
         etag: 'NdZZCit3nIy2Bd9QI2X49O0Urno',
         id: {
            kind: 'youtube#video',
            videoId: '2mnLOTrpoEs',
         },
         snippet: {
            publishedAt: '2023-09-03T09:27:46Z',
            channelId: 'UC2UG5L-a3WC8MuT55ZfNWGA',
            title: 'Waking the Fallen riffs are so good',
            description: 'Original by Avenged Sevenfold Instagram : https://www.instagram.com/saysay_gtr',
            thumbnails: {
               default: {
                  url: 'https://i.ytimg.com/vi/2mnLOTrpoEs/default.jpg',
                  width: 120,
                  height: 90,
               },
               medium: {
                  url: 'https://i.ytimg.com/vi/2mnLOTrpoEs/mqdefault.jpg',
                  width: 320,
                  height: 180,
               },
               high: {
                  url: 'https://i.ytimg.com/vi/2mnLOTrpoEs/hqdefault.jpg',
                  width: 480,
                  height: 360,
               },
            },
            channelTitle: 'Saysay',
            liveBroadcastContent: 'none',
            publishTime: '2023-09-03T09:27:46Z',
         },
      },
      {
         kind: 'youtube#searchResult',
         etag: 'kiy5ja_vu5wDN55A-csSVYXDs2M',
         id: {
            kind: 'youtube#video',
            videoId: 'Lkxt-6I48jA',
         },
         snippet: {
            publishedAt: '2011-10-11T22:36:10Z',
            channelId: 'UCToUNe4i9j_SlKGFl8MrQHg',
            title: 'Avenged Sevenfold - Clairvoyant Disease',
            description:
               "Avenged Sevenfold's 'Waking The Fallen: Resurrected' is out now via Hopeless Records. Buy now on iTunes: ...",
            thumbnails: {
               default: {
                  url: 'https://i.ytimg.com/vi/Lkxt-6I48jA/default.jpg',
                  width: 120,
                  height: 90,
               },
               medium: {
                  url: 'https://i.ytimg.com/vi/Lkxt-6I48jA/mqdefault.jpg',
                  width: 320,
                  height: 180,
               },
               high: {
                  url: 'https://i.ytimg.com/vi/Lkxt-6I48jA/hqdefault.jpg',
                  width: 480,
                  height: 360,
               },
            },
            channelTitle: 'Hopeless Records',
            liveBroadcastContent: 'none',
            publishTime: '2011-10-11T22:36:10Z',
         },
      },
      {
         kind: 'youtube#searchResult',
         etag: 'UfASRzNgGQtwn-Pzh47UdbvsNwU',
         id: {
            kind: 'youtube#video',
            videoId: '9GJoUzoBG5k',
         },
         snippet: {
            publishedAt: '2023-08-25T23:18:25Z',
            channelId: 'UCToUNe4i9j_SlKGFl8MrQHg',
            title: '20 years of &#39;Waking The Fallen,&#39; can you believe it!? 🎉 #a7x #avengedsevenfold #metal',
            description: '',
            thumbnails: {
               default: {
                  url: 'https://i.ytimg.com/vi/9GJoUzoBG5k/default.jpg',
                  width: 120,
                  height: 90,
               },
               medium: {
                  url: 'https://i.ytimg.com/vi/9GJoUzoBG5k/mqdefault.jpg',
                  width: 320,
                  height: 180,
               },
               high: {
                  url: 'https://i.ytimg.com/vi/9GJoUzoBG5k/hqdefault.jpg',
                  width: 480,
                  height: 360,
               },
            },
            channelTitle: 'Hopeless Records',
            liveBroadcastContent: 'none',
            publishTime: '2023-08-25T23:18:25Z',
         },
      },
      {
         kind: 'youtube#searchResult',
         etag: 'MndR-Qarcc08ziVNXjBheKVMpjc',
         id: {
            kind: 'youtube#video',
            videoId: '3BIBk8WXuUY',
         },
         snippet: {
            publishedAt: '2014-09-16T18:07:26Z',
            channelId: 'UCToUNe4i9j_SlKGFl8MrQHg',
            title: 'Avenged Sevenfold - Chapter Four (Live Footage Video)',
            description:
               "Avenged Sevenfold's 'Waking The Fallen: Resurrected' is out now via Hopeless Records. Buy now on iTunes: ...",
            thumbnails: {
               default: {
                  url: 'https://i.ytimg.com/vi/3BIBk8WXuUY/default.jpg',
                  width: 120,
                  height: 90,
               },
               medium: {
                  url: 'https://i.ytimg.com/vi/3BIBk8WXuUY/mqdefault.jpg',
                  width: 320,
                  height: 180,
               },
               high: {
                  url: 'https://i.ytimg.com/vi/3BIBk8WXuUY/hqdefault.jpg',
                  width: 480,
                  height: 360,
               },
            },
            channelTitle: 'Hopeless Records',
            liveBroadcastContent: 'none',
            publishTime: '2014-09-16T18:07:26Z',
         },
      },
      {
         kind: 'youtube#searchResult',
         etag: '78lyAJB3WngreXLHECvi3jLvnQg',
         id: {
            kind: 'youtube#video',
            videoId: '6uQ__DN_4iE',
         },
         snippet: {
            publishedAt: '2015-08-11T23:59:42Z',
            channelId: 'UCJls2FMEbRYxi28jcuKe2vA',
            title: 'And All Things Will End',
            description:
               'Provided to YouTube by Hopeless Records Inc And All Things Will End · Avenged Sevenfold Waking The Fallen ℗ 2003 Hopeless ...',
            thumbnails: {
               default: {
                  url: 'https://i.ytimg.com/vi/6uQ__DN_4iE/default.jpg',
                  width: 120,
                  height: 90,
               },
               medium: {
                  url: 'https://i.ytimg.com/vi/6uQ__DN_4iE/mqdefault.jpg',
                  width: 320,
                  height: 180,
               },
               high: {
                  url: 'https://i.ytimg.com/vi/6uQ__DN_4iE/hqdefault.jpg',
                  width: 480,
                  height: 360,
               },
            },
            channelTitle: 'Avenged Sevenfold - Topic',
            liveBroadcastContent: 'none',
            publishTime: '2015-08-11T23:59:42Z',
         },
      },
      {
         kind: 'youtube#searchResult',
         etag: 'NL8gSf8eYbXdUIbZAraZrxdC7Qg',
         id: {
            kind: 'youtube#video',
            videoId: 'uXz2XAT3YTQ',
         },
         snippet: {
            publishedAt: '2024-11-07T17:33:19Z',
            channelId: 'UCzSZY6RKNYVdLlCwEPWgFfg',
            title: 'Avenged Sevenfold - Waking the Fallen REACTION',
            description:
               'Follow a real ONE: https://patreon.com/OkayReno https://kick.com/okayreno https://www.twitch.tv/okayreno ...',
            thumbnails: {
               default: {
                  url: 'https://i.ytimg.com/vi/uXz2XAT3YTQ/default.jpg',
                  width: 120,
                  height: 90,
               },
               medium: {
                  url: 'https://i.ytimg.com/vi/uXz2XAT3YTQ/mqdefault.jpg',
                  width: 320,
                  height: 180,
               },
               high: {
                  url: 'https://i.ytimg.com/vi/uXz2XAT3YTQ/hqdefault.jpg',
                  width: 480,
                  height: 360,
               },
            },
            channelTitle: 'OkayReno',
            liveBroadcastContent: 'none',
            publishTime: '2024-11-07T17:33:19Z',
         },
      },
      {
         kind: 'youtube#searchResult',
         etag: 'ZHJAT7gLK6i6e5DZngji8eWJVtk',
         id: {
            kind: 'youtube#video',
            videoId: 'bXbTtU252yM',
         },
         snippet: {
            publishedAt: '2011-10-11T22:38:27Z',
            channelId: 'UCToUNe4i9j_SlKGFl8MrQHg',
            title: 'Avenged Sevenfold - Second Heartbeat',
            description:
               "Avenged Sevenfold's 'Waking The Fallen: Resurrected' is out now via Hopeless Records. Stream here: ...",
            thumbnails: {
               default: {
                  url: 'https://i.ytimg.com/vi/bXbTtU252yM/default.jpg',
                  width: 120,
                  height: 90,
               },
               medium: {
                  url: 'https://i.ytimg.com/vi/bXbTtU252yM/mqdefault.jpg',
                  width: 320,
                  height: 180,
               },
               high: {
                  url: 'https://i.ytimg.com/vi/bXbTtU252yM/hqdefault.jpg',
                  width: 480,
                  height: 360,
               },
            },
            channelTitle: 'Hopeless Records',
            liveBroadcastContent: 'none',
            publishTime: '2011-10-11T22:38:27Z',
         },
      },
      {
         kind: 'youtube#searchResult',
         etag: 'BVt5akQFI0ExKCit3XgmzqlPuVc',
         id: {
            kind: 'youtube#video',
            videoId: '6AbLnI1nPiw',
         },
         snippet: {
            publishedAt: '2022-03-09T13:28:35Z',
            channelId: 'UCmvdTeaAfn2PKxhdTENUDOg',
            title: 'Avenged Sevenfold - Waking The Fallen (Oxblood) Vinyl',
            description: '',
            thumbnails: {
               default: {
                  url: 'https://i.ytimg.com/vi/6AbLnI1nPiw/default.jpg',
                  width: 120,
                  height: 90,
               },
               medium: {
                  url: 'https://i.ytimg.com/vi/6AbLnI1nPiw/mqdefault.jpg',
                  width: 320,
                  height: 180,
               },
               high: {
                  url: 'https://i.ytimg.com/vi/6AbLnI1nPiw/hqdefault.jpg',
                  width: 480,
                  height: 360,
               },
            },
            channelTitle: 'MidnightVinyl',
            liveBroadcastContent: 'none',
            publishTime: '2022-03-09T13:28:35Z',
         },
      },
      {
         kind: 'youtube#searchResult',
         etag: 'lvu_ry8rzorglmdZ5qTIgaeoO4I',
         id: {
            kind: 'youtube#video',
            videoId: 'yd5fAmy2CLI',
         },
         snippet: {
            publishedAt: '2022-11-03T04:08:37Z',
            channelId: 'UCpZ02u1n8HuImKTOOOzOtqg',
            title: 'Walking the Fallen',
            description:
               'Provided to YouTube by IIP-DDS Walking the Fallen · Kam Rapp Walking the Fallen ℗ Kam Rapp Released on: 2022-10-30 ...',
            thumbnails: {
               default: {
                  url: 'https://i.ytimg.com/vi/yd5fAmy2CLI/default.jpg',
                  width: 120,
                  height: 90,
               },
               medium: {
                  url: 'https://i.ytimg.com/vi/yd5fAmy2CLI/mqdefault.jpg',
                  width: 320,
                  height: 180,
               },
               high: {
                  url: 'https://i.ytimg.com/vi/yd5fAmy2CLI/hqdefault.jpg',
                  width: 480,
                  height: 360,
               },
            },
            channelTitle: 'Kam Rapp - Topic',
            liveBroadcastContent: 'none',
            publishTime: '2022-11-03T04:08:37Z',
         },
      },
      {
         kind: 'youtube#searchResult',
         etag: 'YPFg8LlTf3ugh_tCNauHfADnjuM',
         id: {
            kind: 'youtube#video',
            videoId: 'ZQVU22YGTUc',
         },
         snippet: {
            publishedAt: '2020-08-26T00:30:37Z',
            channelId: 'UCmm9iuwnSkZzD1MwMqQahqQ',
            title: 'Waking the Fallen - Avenged Sevenfold (lirik terjemahan)',
            description: 'lirik dan terjemahan lagu: Waking the Fallen - Avenged Sevenfold album: Waking the Fallen.',
            thumbnails: {
               default: {
                  url: 'https://i.ytimg.com/vi/ZQVU22YGTUc/default.jpg',
                  width: 120,
                  height: 90,
               },
               medium: {
                  url: 'https://i.ytimg.com/vi/ZQVU22YGTUc/mqdefault.jpg',
                  width: 320,
                  height: 180,
               },
               high: {
                  url: 'https://i.ytimg.com/vi/ZQVU22YGTUc/hqdefault.jpg',
                  width: 480,
                  height: 360,
               },
            },
            channelTitle: 'LT PROJECT',
            liveBroadcastContent: 'none',
            publishTime: '2020-08-26T00:30:37Z',
         },
      },
      {
         kind: 'youtube#searchResult',
         etag: 'HVaJxNvJjkvOqDOVFuB_oAjU7WU',
         id: {
            kind: 'youtube#video',
            videoId: 'TF3lpJH-9Os',
         },
         snippet: {
            publishedAt: '2021-02-22T21:18:52Z',
            channelId: 'UClST1VvoC9ElRmK4XCfJ0QA',
            title: 'Avenged Sevenfold - Waking the Fallen (Full Album)',
            description: 'Avenged Sevenfold - Waking the Fallen (Full Album) Enjoy more the best Rock music: ...',
            thumbnails: {
               default: {
                  url: 'https://i.ytimg.com/vi/TF3lpJH-9Os/default.jpg',
                  width: 120,
                  height: 90,
               },
               medium: {
                  url: 'https://i.ytimg.com/vi/TF3lpJH-9Os/mqdefault.jpg',
                  width: 320,
                  height: 180,
               },
               high: {
                  url: 'https://i.ytimg.com/vi/TF3lpJH-9Os/hqdefault.jpg',
                  width: 480,
                  height: 360,
               },
            },
            channelTitle: 'Rock Solid Records',
            liveBroadcastContent: 'none',
            publishTime: '2021-02-22T21:18:52Z',
         },
      },
      {
         kind: 'youtube#searchResult',
         etag: 'Jjn21KItkQBMFsBqvleadfOGyfI',
         id: {
            kind: 'youtube#video',
            videoId: 'dQHPtZGqwjg',
         },
         snippet: {
            publishedAt: '2022-11-28T11:50:16Z',
            channelId: 'UCW0sf7RG9TSfT5DAQvfwRmg',
            title: 'The Fallen Angel',
            description: '',
            thumbnails: {
               default: {
                  url: 'https://i.ytimg.com/vi/dQHPtZGqwjg/default.jpg',
                  width: 120,
                  height: 90,
               },
               medium: {
                  url: 'https://i.ytimg.com/vi/dQHPtZGqwjg/mqdefault.jpg',
                  width: 320,
                  height: 180,
               },
               high: {
                  url: 'https://i.ytimg.com/vi/dQHPtZGqwjg/hqdefault.jpg',
                  width: 480,
                  height: 360,
               },
            },
            channelTitle: 'Sarah New Sfx',
            liveBroadcastContent: 'none',
            publishTime: '2022-11-28T11:50:16Z',
         },
      },
   ],
};
