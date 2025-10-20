// https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=YOUR_API_KEY

import { SEARCH_RESULT_AMOUNT, YTB_API_KEY } from '../consts';

const base_url = 'https://www.googleapis.com/youtube/v3';

export const youtubeService = {
   searchSongs,
};

// async function searchSongs(searchStr) {
//    const type = 'video';
//    const part = 'snippet';
//    const endpoint = `${base_url}/search?key=${api_key}&type=${type}&part=${part}&q=${searchStr}&maxResults=${SEARCH_RESULT_AMOUNT}`;
//    // try {
//    const res = await fetch(endpoint, { method: 'GET' });
//    if (!res.ok) throw new Error(`Bad status code! ${res.status} - ${res.statusText}`);
//    return res;
//    // } catch (error) {
//    //     console.error()
//    //     throw error;
//    // }
// }

// For dev purposes
async function searchSongs(searchStr) {
   const a = new Response(JSON.stringify(mockRes));
   return a;
}

const mockRes = {
   kind: 'youtube#searchListResponse',
   etag: 'MTu0bj7SFVUt1sVaTATaJe-5o8c',
   nextPageToken: 'CA8QAA',
   regionCode: 'IL',
   pageInfo: {
      totalResults: 1000000,
      resultsPerPage: 15,
   },
   items: [
      {
         kind: 'youtube#searchResult',
         etag: 'ZXmYc-svLECA8E1lFyJEkmHD7tY',
         id: {
            kind: 'youtube#video',
            videoId: 'uwCXfVsI6QU',
         },
         snippet: {
            publishedAt: '2025-10-20T09:13:52Z',
            channelId: 'UCm7lHFkt2yB_WzL67aruVBQ',
            title: 'Zelensky &amp; Vance&#39;s New TV Fight After Trump Says &#39;No&#39; To Ukraine For Tomahawk Missiles| Putin,Russia',
            description:
               'In a tense and revealing exchange, Ukrainian President Volodymyr Zelensky and U.S. Vice President JD Vance had contrasting ...',
            thumbnails: {
               default: {
                  url: 'https://i.ytimg.com/vi/uwCXfVsI6QU/default.jpg',
                  width: 120,
                  height: 90,
               },
               medium: {
                  url: 'https://i.ytimg.com/vi/uwCXfVsI6QU/mqdefault.jpg',
                  width: 320,
                  height: 180,
               },
               high: {
                  url: 'https://i.ytimg.com/vi/uwCXfVsI6QU/hqdefault.jpg',
                  width: 480,
                  height: 360,
               },
            },
            channelTitle: 'Hindustan Times',
            liveBroadcastContent: 'none',
            publishTime: '2025-10-20T09:13:52Z',
         },
      },
      {
         kind: 'youtube#searchResult',
         etag: 'Ac8Migp2bQ9MxRFPoVxm7hR7vyw',
         id: {
            kind: 'youtube#video',
            videoId: 'YQ-obIXWNWg',
         },
         snippet: {
            publishedAt: '2025-10-14T21:00:44Z',
            channelId: 'UCRYxi3tzzGsXZuHv-upUBCA',
            title: 'New Cool Tool💚🙌! New Viral Gadgets,SmartKitchen  Appliances, Tools,Utensils, Home Cleaning #shorts',
            description:
               'New Cool Tool    ! New Viral Gadgets,SmartKitchen Appliances, Tools,Utensils, Home Cleaning #shorts New Cool Tool! New ...',
            thumbnails: {
               default: {
                  url: 'https://i.ytimg.com/vi/YQ-obIXWNWg/default.jpg',
                  width: 120,
                  height: 90,
               },
               medium: {
                  url: 'https://i.ytimg.com/vi/YQ-obIXWNWg/mqdefault.jpg',
                  width: 320,
                  height: 180,
               },
               high: {
                  url: 'https://i.ytimg.com/vi/YQ-obIXWNWg/hqdefault.jpg',
                  width: 480,
                  height: 360,
               },
            },
            channelTitle: 'Shehar-e-Madina',
            liveBroadcastContent: 'none',
            publishTime: '2025-10-14T21:00:44Z',
         },
      },
      {
         kind: 'youtube#searchResult',
         etag: 'sH94P66ZuAKM7q38ajr3DqxPMuM',
         id: {
            kind: 'youtube#video',
            videoId: 'ECqlObFCmZA',
         },
         snippet: {
            publishedAt: '2025-10-20T03:00:17Z',
            channelId: 'UCBi2mrWuNuyYy4gbM6fU18Q',
            title: 'President Trump mocks Saturday&#39;s &#39;No Kings&#39; protest',
            description:
               'Trump responded via social media, posting an AI-generated video depicting a crowned Trump flying a "King Trump" jet. Subscribe ...',
            thumbnails: {
               default: {
                  url: 'https://i.ytimg.com/vi/ECqlObFCmZA/default.jpg',
                  width: 120,
                  height: 90,
               },
               medium: {
                  url: 'https://i.ytimg.com/vi/ECqlObFCmZA/mqdefault.jpg',
                  width: 320,
                  height: 180,
               },
               high: {
                  url: 'https://i.ytimg.com/vi/ECqlObFCmZA/hqdefault.jpg',
                  width: 480,
                  height: 360,
               },
            },
            channelTitle: 'ABC News',
            liveBroadcastContent: 'none',
            publishTime: '2025-10-20T03:00:17Z',
         },
      },
      {
         kind: 'youtube#searchResult',
         etag: '2OyzdkG_Cw17lnqWb1TrT0mi9Io',
         id: {
            kind: 'youtube#video',
            videoId: 'iqcT0qOuPlE',
         },
         snippet: {
            publishedAt: '2023-02-28T12:00:34Z',
            channelId: 'UCE-KQxU0N4684m_FJXofRTw',
            title: 'Cool Gadgets!😍Smart Appliances,New Gadgets, Kitchen Gadgets, Home Gadgets,Inventions🙏P-112 #shorts',
            description:
               'Cool Gadgets!  Smart Appliances,New Gadgets, Kitchen Gadgets, Home Gadgets,Inventions  P-112 Hi Everyone This channel ...',
            thumbnails: {
               default: {
                  url: 'https://i.ytimg.com/vi/iqcT0qOuPlE/default.jpg',
                  width: 120,
                  height: 90,
               },
               medium: {
                  url: 'https://i.ytimg.com/vi/iqcT0qOuPlE/mqdefault.jpg',
                  width: 320,
                  height: 180,
               },
               high: {
                  url: 'https://i.ytimg.com/vi/iqcT0qOuPlE/hqdefault.jpg',
                  width: 480,
                  height: 360,
               },
            },
            channelTitle: 'New Sky TV',
            liveBroadcastContent: 'none',
            publishTime: '2023-02-28T12:00:34Z',
         },
      },
      {
         kind: 'youtube#searchResult',
         etag: 'Hm0UicM-x6tRqJT_GyNjOi6CZtk',
         id: {
            kind: 'youtube#video',
            videoId: 'O1iTw98dAwo',
         },
         snippet: {
            publishedAt: '2025-03-18T12:00:36Z',
            channelId: 'UC2s1BG4dr3K3OkKKfxTG_gQ',
            title: 'Alibaba Utilities! 😍New Gadgets, Smart Kitchen Appliances, Tools, Utensils, Home Cleaning, Beauty',
            description: '',
            thumbnails: {
               default: {
                  url: 'https://i.ytimg.com/vi/O1iTw98dAwo/default.jpg',
                  width: 120,
                  height: 90,
               },
               medium: {
                  url: 'https://i.ytimg.com/vi/O1iTw98dAwo/mqdefault.jpg',
                  width: 320,
                  height: 180,
               },
               high: {
                  url: 'https://i.ytimg.com/vi/O1iTw98dAwo/hqdefault.jpg',
                  width: 480,
                  height: 360,
               },
            },
            channelTitle: 'Color Sky',
            liveBroadcastContent: 'none',
            publishTime: '2025-03-18T12:00:36Z',
         },
      },
      {
         kind: 'youtube#searchResult',
         etag: 'mgHoS9l4FFQfCamU2qnXH-tmFZE',
         id: {
            kind: 'youtube#video',
            videoId: 'sE-GRG5p1g0',
         },
         snippet: {
            publishedAt: '2025-10-16T09:01:19Z',
            channelId: 'UCaOtWkB5dZn85CqhDUDOdVw',
            title: 'New Cool Tool! 🤲🕋😢 New Viral Gadgets,SmartKitchen Appliances, Tools, Utensils Home Cleaning #shorts',
            description:
               'New Cool Tool! ❤️       New Viral Gadgets,SmartKitchen Appliances, Tools,Utensils,Home Cleaning #shorts Hi Everyone This ...',
            thumbnails: {
               default: {
                  url: 'https://i.ytimg.com/vi/sE-GRG5p1g0/default.jpg',
                  width: 120,
                  height: 90,
               },
               medium: {
                  url: 'https://i.ytimg.com/vi/sE-GRG5p1g0/mqdefault.jpg',
                  width: 320,
                  height: 180,
               },
               high: {
                  url: 'https://i.ytimg.com/vi/sE-GRG5p1g0/hqdefault.jpg',
                  width: 480,
                  height: 360,
               },
            },
            channelTitle: 'Medina sharif vlogs ',
            liveBroadcastContent: 'none',
            publishTime: '2025-10-16T09:01:19Z',
         },
      },
      {
         kind: 'youtube#searchResult',
         etag: '-sO-GqYZjfTOOxKcOdzxxXFMyw0',
         id: {
            kind: 'youtube#video',
            videoId: 'lvthdMogRag',
         },
         snippet: {
            publishedAt: '2025-10-11T12:01:32Z',
            channelId: 'UCgKASTv4MvG_vAar1AKpQSA',
            title: 'New Cool Tool! ❤️🕋💜 New Viral Gadgets,SmartKitchen Appliances, Tools,Utensils,Home Cleaning #shorts​',
            description:
               'New Cool Tool! ❤️     New Viral Gadgets,SmartKitchen Appliances, Tools,Utensils,Home Cleaning #shorts​Hi Everyone This ...',
            thumbnails: {
               default: {
                  url: 'https://i.ytimg.com/vi/lvthdMogRag/default.jpg',
                  width: 120,
                  height: 90,
               },
               medium: {
                  url: 'https://i.ytimg.com/vi/lvthdMogRag/mqdefault.jpg',
                  width: 320,
                  height: 180,
               },
               high: {
                  url: 'https://i.ytimg.com/vi/lvthdMogRag/hqdefault.jpg',
                  width: 480,
                  height: 360,
               },
            },
            channelTitle: 'Macca madina status ',
            liveBroadcastContent: 'none',
            publishTime: '2025-10-11T12:01:32Z',
         },
      },
      {
         kind: 'youtube#searchResult',
         etag: 'lmwYaUettTkgggDDnXUpzcu7rtE',
         id: {
            kind: 'youtube#video',
            videoId: '8nWwFDEAjfM',
         },
         snippet: {
            publishedAt: '2025-10-15T14:47:25Z',
            channelId: 'UCUUNkL6Wke6i0P6funa7wdQ',
            title: 'New M5 iPad Pro released!',
            description: '',
            thumbnails: {
               default: {
                  url: 'https://i.ytimg.com/vi/8nWwFDEAjfM/default.jpg',
                  width: 120,
                  height: 90,
               },
               medium: {
                  url: 'https://i.ytimg.com/vi/8nWwFDEAjfM/mqdefault.jpg',
                  width: 320,
                  height: 180,
               },
               high: {
                  url: 'https://i.ytimg.com/vi/8nWwFDEAjfM/hqdefault.jpg',
                  width: 480,
                  height: 360,
               },
            },
            channelTitle: 'AppleInsider',
            liveBroadcastContent: 'none',
            publishTime: '2025-10-15T14:47:25Z',
         },
      },
      {
         kind: 'youtube#searchResult',
         etag: 'fwiqvgaPMzIPgtaKK4F9pOmBMXs',
         id: {
            kind: 'youtube#video',
            videoId: 'fML8Zl0WMss',
         },
         snippet: {
            publishedAt: '2025-10-13T16:36:49Z',
            channelId: 'UCYS6mSp3x-dP0rxzWoM3x_Q',
            title: 'Who made this! thenutsfactory 1030 3rd Ave, New York, NY 10065 chocolate #foodie #shorts',
            description: '',
            thumbnails: {
               default: {
                  url: 'https://i.ytimg.com/vi/fML8Zl0WMss/default.jpg',
                  width: 120,
                  height: 90,
               },
               medium: {
                  url: 'https://i.ytimg.com/vi/fML8Zl0WMss/mqdefault.jpg',
                  width: 320,
                  height: 180,
               },
               high: {
                  url: 'https://i.ytimg.com/vi/fML8Zl0WMss/hqdefault.jpg',
                  width: 480,
                  height: 360,
               },
            },
            channelTitle: 'Biggroove',
            liveBroadcastContent: 'none',
            publishTime: '2025-10-13T16:36:49Z',
         },
      },
      {
         kind: 'youtube#searchResult',
         etag: 'LMVcqU8kysZZ-XJfEhbxHGrTnCA',
         id: {
            kind: 'youtube#video',
            videoId: 'm1VfsauiY-0',
         },
         snippet: {
            publishedAt: '2025-10-15T03:26:29Z',
            channelId: 'UCbmOgzvvDg60mXGm9t9Ad5Q',
            title: 'Lays New Logo',
            description: '',
            thumbnails: {
               default: {
                  url: 'https://i.ytimg.com/vi/m1VfsauiY-0/default.jpg',
                  width: 120,
                  height: 90,
               },
               medium: {
                  url: 'https://i.ytimg.com/vi/m1VfsauiY-0/mqdefault.jpg',
                  width: 320,
                  height: 180,
               },
               high: {
                  url: 'https://i.ytimg.com/vi/m1VfsauiY-0/hqdefault.jpg',
                  width: 480,
                  height: 360,
               },
            },
            channelTitle: 'Omar Agamy',
            liveBroadcastContent: 'none',
            publishTime: '2025-10-15T03:26:29Z',
         },
      },
      {
         kind: 'youtube#searchResult',
         etag: 'cglN1p4_1ur5IZBRNi6nctjL2co',
         id: {
            kind: 'youtube#video',
            videoId: '0g-IC-MSdXA',
         },
         snippet: {
            publishedAt: '2025-04-03T03:35:19Z',
            channelId: 'UCbynwHnYbSmDHuoQva81Wlg',
            title: 'New Types Diwali crackers testing | 2025 Diwali',
            description: '',
            thumbnails: {
               default: {
                  url: 'https://i.ytimg.com/vi/0g-IC-MSdXA/default.jpg',
                  width: 120,
                  height: 90,
               },
               medium: {
                  url: 'https://i.ytimg.com/vi/0g-IC-MSdXA/mqdefault.jpg',
                  width: 320,
                  height: 180,
               },
               high: {
                  url: 'https://i.ytimg.com/vi/0g-IC-MSdXA/hqdefault.jpg',
                  width: 480,
                  height: 360,
               },
            },
            channelTitle: 'Crackers Testing',
            liveBroadcastContent: 'none',
            publishTime: '2025-04-03T03:35:19Z',
         },
      },
      {
         kind: 'youtube#searchResult',
         etag: 'w_GULkM3vcLP3Xc9ICZdoQiOwy8',
         id: {
            kind: 'youtube#video',
            videoId: 'z0mBfBAfyJk',
         },
         snippet: {
            publishedAt: '2025-10-20T00:08:34Z',
            channelId: 'UCDVYQ4Zhbm3S2dlz7P1GBDg',
            title: 'New York Giants vs Denver Broncos Game Highlights | 2025 NFL Season Week 7',
            description:
               'Get NFL Sunday Ticket: https://tv.youtube.com/learn/nflsundayticket/ Watch live local and primetime games, NFL RedZone, and ...',
            thumbnails: {
               default: {
                  url: 'https://i.ytimg.com/vi/z0mBfBAfyJk/default.jpg',
                  width: 120,
                  height: 90,
               },
               medium: {
                  url: 'https://i.ytimg.com/vi/z0mBfBAfyJk/mqdefault.jpg',
                  width: 320,
                  height: 180,
               },
               high: {
                  url: 'https://i.ytimg.com/vi/z0mBfBAfyJk/hqdefault.jpg',
                  width: 480,
                  height: 360,
               },
            },
            channelTitle: 'NFL',
            liveBroadcastContent: 'none',
            publishTime: '2025-10-20T00:08:34Z',
         },
      },
      {
         kind: 'youtube#searchResult',
         etag: 'NP0ObgNg_9ti3BHLEj1YHSvfA2w',
         id: {
            kind: 'youtube#video',
            videoId: '8ySSpqoQR0g',
         },
         snippet: {
            publishedAt: '2025-10-19T16:45:00Z',
            channelId: 'UC16niRr50-MSBwiO3YDb3RA',
            title: 'What are the new allegations against Prince Andrew? | BBC Newscast',
            description:
               'Today, new allegations against Prince Andrew have appeared in the Sunday newspapers, accusing him of asking his police ...',
            thumbnails: {
               default: {
                  url: 'https://i.ytimg.com/vi/8ySSpqoQR0g/default.jpg',
                  width: 120,
                  height: 90,
               },
               medium: {
                  url: 'https://i.ytimg.com/vi/8ySSpqoQR0g/mqdefault.jpg',
                  width: 320,
                  height: 180,
               },
               high: {
                  url: 'https://i.ytimg.com/vi/8ySSpqoQR0g/hqdefault.jpg',
                  width: 480,
                  height: 360,
               },
            },
            channelTitle: 'BBC News',
            liveBroadcastContent: 'none',
            publishTime: '2025-10-19T16:45:00Z',
         },
      },
      {
         kind: 'youtube#searchResult',
         etag: '_PVnnatXo85bFPffjwDCuPK0ANA',
         id: {
            kind: 'youtube#video',
            videoId: 'IHTBUDtzOFM',
         },
         snippet: {
            publishedAt: '2025-10-19T16:53:10Z',
            channelId: 'UCJekW1Vj5fCVEGdye_mBN6Q',
            title: 'Israel New Att@ck on G@za | Multiple Martyred | 9 PM News Headlines | Samaa TV',
            description:
               'samaatv #middleeast #middleeastconflict #headlines #pakistan #israel #headlinestoday #pakarmy #pakindiaconflict #modi ...',
            thumbnails: {
               default: {
                  url: 'https://i.ytimg.com/vi/IHTBUDtzOFM/default.jpg',
                  width: 120,
                  height: 90,
               },
               medium: {
                  url: 'https://i.ytimg.com/vi/IHTBUDtzOFM/mqdefault.jpg',
                  width: 320,
                  height: 180,
               },
               high: {
                  url: 'https://i.ytimg.com/vi/IHTBUDtzOFM/hqdefault.jpg',
                  width: 480,
                  height: 360,
               },
            },
            channelTitle: 'SAMAA TV',
            liveBroadcastContent: 'none',
            publishTime: '2025-10-19T16:53:10Z',
         },
      },
      {
         kind: 'youtube#searchResult',
         etag: 'pyTl9v-sGNWL3wNWfN7dIT90iwg',
         id: {
            kind: 'youtube#video',
            videoId: '41uU1EitO18',
         },
         snippet: {
            publishedAt: '2025-10-18T12:32:36Z',
            channelId: 'UC_vt34wimdCzdkrzVejwX9g',
            title: '𝐀𝐟𝐠𝐡𝐚𝐧𝐢𝐬𝐭𝐚𝐧 𝐀𝐭𝐭𝐚𝐜𝐤.. - 𝐋𝐚𝐭𝐞𝐬𝐭 𝐍𝐞𝐰𝐬 𝐔𝐩𝐝𝐚𝐭𝐞𝐬..!! | Headlines Geo News 5 PM | 18 October 2025',
            description:
               'GeoNews #PakVSAfg #PakAfghanWAR #SohailAfridi #PMLN #DGISPR #PakArmy #WeatherUpdate #ISPR #PAKvsIND ...',
            thumbnails: {
               default: {
                  url: 'https://i.ytimg.com/vi/41uU1EitO18/default.jpg',
                  width: 120,
                  height: 90,
               },
               medium: {
                  url: 'https://i.ytimg.com/vi/41uU1EitO18/mqdefault.jpg',
                  width: 320,
                  height: 180,
               },
               high: {
                  url: 'https://i.ytimg.com/vi/41uU1EitO18/hqdefault.jpg',
                  width: 480,
                  height: 360,
               },
            },
            channelTitle: 'Geo News',
            liveBroadcastContent: 'none',
            publishTime: '2025-10-18T12:32:36Z',
         },
      },
   ],
};
