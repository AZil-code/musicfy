import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STATION_KEY = 'stationDB'

const songsGroup1 = [
    { title: 'Never Gonna Give You Up', ytbId: 'dQw4w9WgXcQ', album: 'Single', genre: 'Pop', artists: ['Rick Astley'], imgUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg' },
    { title: 'GANGNAM STYLE', ytbId: '9bZkp7q19f0', album: 'PSY 6 (Six Rules), Part 1', genre: 'K-Pop', artists: ['PSY'], imgUrl: 'https://img.youtube.com/vi/9bZkp7q19f0/hqdefault.jpg' },
    { title: 'Despacito (ft. Daddy Yankee)', ytbId: 'kJQP7kiw5Fk', album: 'Vida', genre: 'Latin Pop', artists: ['Luis Fonsi', 'Daddy Yankee'], imgUrl: 'https://img.youtube.com/vi/kJQP7kiw5Fk/hqdefault.jpg' },
    { title: 'Shape of You', ytbId: 'JGwWNGJdvx8', album: '÷ (Divide)', genre: 'Pop', artists: ['Ed Sheeran'], imgUrl: 'https://img.youtube.com/vi/JGwWNGJdvx8/hqdefault.jpg' },
    { title: 'Perfect', ytbId: '2Vv-BfVoq4g', album: '÷ (Divide)', genre: 'Pop', artists: ['Ed Sheeran'], imgUrl: 'https://img.youtube.com/vi/2Vv-BfVoq4g/hqdefault.jpg' },
    { title: 'See You Again (ft. Charlie Puth)', ytbId: '3JZ_D3ELwOQ', album: 'Furious 7 OST', genre: 'Hip-Hop', artists: ['Wiz Khalifa', 'Charlie Puth'], imgUrl: 'https://img.youtube.com/vi/3JZ_D3ELwOQ/hqdefault.jpg' },
    { title: 'Blank Space', ytbId: 'e-ORhEE9VVg', album: '1989', genre: 'Pop', artists: ['Taylor Swift'], imgUrl: 'https://img.youtube.com/vi/e-ORhEE9VVg/hqdefault.jpg' },
    { title: 'Uptown Funk (ft. Bruno Mars)', ytbId: 'OPf0YbXqDm0', album: 'Uptown Special', genre: 'Funk Pop', artists: ['Mark Ronson', 'Bruno Mars'], imgUrl: 'https://img.youtube.com/vi/OPf0YbXqDm0/hqdefault.jpg' },
    { title: 'Roar', ytbId: 'CevxZvSJLk8', album: 'Prism', genre: 'Pop', artists: ['Katy Perry'], imgUrl: 'https://img.youtube.com/vi/CevxZvSJLk8/hqdefault.jpg' },
    { title: 'Hello', ytbId: 'YQHsXMglC9A', album: '25', genre: 'Soul Pop', artists: ['Adele'], imgUrl: 'https://img.youtube.com/vi/YQHsXMglC9A/hqdefault.jpg' },
]

const songsGroup2 = [
    { title: 'Counting Stars', ytbId: 'hT_nvWreIhg', album: 'Native', genre: 'Pop Rock', artists: ['OneRepublic'], imgUrl: 'https://img.youtube.com/vi/hT_nvWreIhg/hqdefault.jpg' },
    { title: 'Faded', ytbId: '60ItHLz5WEA', album: 'Different World', genre: 'Electronic', artists: ['Alan Walker'], imgUrl: 'https://img.youtube.com/vi/60ItHLz5WEA/hqdefault.jpg' },
    { title: 'Radioactive', ytbId: 'ktvTqknDobU', album: 'Night Visions', genre: 'Alternative', artists: ['Imagine Dragons'], imgUrl: 'https://img.youtube.com/vi/ktvTqknDobU/hqdefault.jpg' },
    { title: 'Bohemian Rhapsody', ytbId: 'fJ9rUzIMcZQ', album: 'A Night at the Opera', genre: 'Rock', artists: ['Queen'], imgUrl: 'https://img.youtube.com/vi/fJ9rUzIMcZQ/hqdefault.jpg' },
    { title: 'Billie Jean', ytbId: 'sOnqjkJTMaA', album: 'Thriller', genre: 'Pop', artists: ['Michael Jackson'], imgUrl: 'https://img.youtube.com/vi/sOnqjkJTMaA/hqdefault.jpg' },
    { title: "Sweet Child O' Mine", ytbId: 'o1tj2zJ2Wvg', album: "Appetite for Destruction", genre: 'Rock', artists: ["Guns N' Roses"], imgUrl: 'https://img.youtube.com/vi/o1tj2zJ2Wvg/hqdefault.jpg' },
    { title: 'Numb', ytbId: 'kXYiU_JCYtU', album: 'Meteora', genre: 'Alternative Rock', artists: ['Linkin Park'], imgUrl: 'https://img.youtube.com/vi/kXYiU_JCYtU/hqdefault.jpg' },
    { title: 'Chandelier', ytbId: '2vjPBrBU-TM', album: '1000 Forms of Fear', genre: 'Pop', artists: ['Sia'], imgUrl: 'https://img.youtube.com/vi/2vjPBrBU-TM/hqdefault.jpg' },
    { title: 'Blinding Lights', ytbId: '4NRXx6U8ABQ', album: 'After Hours', genre: 'Synthwave Pop', artists: ['The Weeknd'], imgUrl: 'https://img.youtube.com/vi/4NRXx6U8ABQ/hqdefault.jpg' },
    { title: 'bad guy', ytbId: 'DyDfgMOUjCI', album: 'WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?', genre: 'Pop', artists: ['Billie Eilish'], imgUrl: 'https://img.youtube.com/vi/DyDfgMOUjCI/hqdefault.jpg' },
]

const songsGroup3 = [
    { title: 'Viva La Vida', ytbId: 'dvgZkm1xWPE', album: 'Viva la Vida or Death and All His Friends', genre: 'Pop Rock', artists: ['Coldplay'], imgUrl: 'https://img.youtube.com/vi/dvgZkm1xWPE/hqdefault.jpg' },
    { title: 'Californication', ytbId: 'YlUKcNNmywk', album: 'Californication', genre: 'Alternative Rock', artists: ['Red Hot Chili Peppers'], imgUrl: 'https://img.youtube.com/vi/YlUKcNNmywk/hqdefault.jpg' },
    { title: 'Smells Like Teen Spirit', ytbId: 'hTWKbfoikeg', album: 'Nevermind', genre: 'Grunge', artists: ['Nirvana'], imgUrl: 'https://img.youtube.com/vi/hTWKbfoikeg/hqdefault.jpg' },
    { title: 'Wake Me Up', ytbId: 'IcrbM1l_BoI', album: 'True', genre: 'EDM', artists: ['Avicii', 'Aloe Blacc'], imgUrl: 'https://img.youtube.com/vi/IcrbM1l_BoI/hqdefault.jpg' },
    { title: 'Wonderwall', ytbId: 'bx1Bh8ZvH84', album: "(What's the Story) Morning Glory?", genre: 'Britpop', artists: ['Oasis'], imgUrl: 'https://img.youtube.com/vi/bx1Bh8ZvH84/hqdefault.jpg' },
    { title: 'Take On Me', ytbId: 'djV11Xbc914', album: 'Hunting High and Low', genre: 'Synthpop', artists: ['a-ha'], imgUrl: 'https://img.youtube.com/vi/djV11Xbc914/hqdefault.jpg' },
    { title: 'Get Lucky (ft. Pharrell Williams)', ytbId: '5NV6Rdv1a3I', album: 'Random Access Memories', genre: 'Disco/Funk', artists: ['Daft Punk', 'Pharrell Williams', 'Nile Rodgers'], imgUrl: 'https://img.youtube.com/vi/5NV6Rdv1a3I/hqdefault.jpg' },
    { title: 'Sugar', ytbId: '09R8_2nJtjg', album: 'V', genre: 'Pop', artists: ['Maroon 5'], imgUrl: 'https://img.youtube.com/vi/09R8_2nJtjg/hqdefault.jpg' },
    { title: 'Somebody That I Used To Know (ft. Kimbra)', ytbId: '8UVNT4wvIGY', album: 'Making Mirrors', genre: 'Indie Pop', artists: ['Gotye', 'Kimbra'], imgUrl: 'https://img.youtube.com/vi/8UVNT4wvIGY/hqdefault.jpg' },
    { title: 'Believer', ytbId: '7wtfhZwyrcc', album: 'Evolve', genre: 'Alternative', artists: ['Imagine Dragons'], imgUrl: 'https://img.youtube.com/vi/7wtfhZwyrcc/hqdefault.jpg' },
]

const songsGroup4 = [
    { title: 'Back In Black', ytbId: 'pAgnJDJN4VA', album: 'Back in Black', genre: 'Classic Rock', artists: ['AC/DC'], imgUrl: 'https://img.youtube.com/vi/pAgnJDJN4VA/hqdefault.jpg' },
    { title: 'Thunderstruck', ytbId: 'v2AC41dglnM', album: 'The Razors Edge', genre: 'Hard Rock', artists: ['AC/DC'], imgUrl: 'https://img.youtube.com/vi/v2AC41dglnM/hqdefault.jpg' },
    { title: 'Highway to Hell', ytbId: 'l482T0yNkeo', album: 'Highway to Hell', genre: 'Hard Rock', artists: ['AC/DC'], imgUrl: 'https://img.youtube.com/vi/l482T0yNkeo/hqdefault.jpg' },
    { title: 'Livin’ On A Prayer', ytbId: 'lDK9QqIzhwk', album: 'Slippery When Wet', genre: 'Rock', artists: ['Bon Jovi'], imgUrl: 'https://img.youtube.com/vi/lDK9QqIzhwk/hqdefault.jpg' },
    { title: 'You Give Love a Bad Name', ytbId: 'KrZHPOeOxQQ', album: 'Slippery When Wet', genre: 'Rock', artists: ['Bon Jovi'], imgUrl: 'https://img.youtube.com/vi/KrZHPOeOxQQ/hqdefault.jpg' },
    { title: 'Don’t Stop Believin’', ytbId: '1k8craCGpgs', album: 'Escape', genre: 'Classic Rock', artists: ['Journey'], imgUrl: 'https://img.youtube.com/vi/1k8craCGpgs/hqdefault.jpg' },
    { title: 'Paint It, Black', ytbId: 'O4irXQhgMqg', album: 'Aftermath', genre: 'Rock', artists: ['The Rolling Stones'], imgUrl: 'https://img.youtube.com/vi/O4irXQhgMqg/hqdefault.jpg' },
    { title: 'November Rain', ytbId: '8SbUC-UaAxE', album: 'Use Your Illusion I', genre: 'Rock', artists: ['Guns N’ Roses'], imgUrl: 'https://img.youtube.com/vi/8SbUC-UaAxE/hqdefault.jpg' },
    { title: 'Dream On', ytbId: '89dGC8de0CA', album: 'Aerosmith', genre: 'Classic Rock', artists: ['Aerosmith'], imgUrl: 'https://img.youtube.com/vi/89dGC8de0CA/hqdefault.jpg' },
    { title: 'We Are The Champions', ytbId: '04854XqcfCY', album: 'News of the World', genre: 'Rock', artists: ['Queen'], imgUrl: 'https://img.youtube.com/vi/04854XqcfCY/hqdefault.jpg' },
]

const songsGroup5 = [
    { title: 'Another One Bites the Dust', ytbId: 'rY0WxgSXdEE', album: 'The Game', genre: 'Rock', artists: ['Queen'], imgUrl: 'https://img.youtube.com/vi/rY0WxgSXdEE/hqdefault.jpg' },
    { title: 'Don’t Stop Me Now', ytbId: 'HgzGwKwLmgM', album: 'Jazz', genre: 'Rock', artists: ['Queen'], imgUrl: 'https://img.youtube.com/vi/HgzGwKwLmgM/hqdefault.jpg' },
    { title: 'Smoke on the Water', ytbId: 'zUwEIt9ez7M', album: 'Machine Head', genre: 'Classic Rock', artists: ['Deep Purple'], imgUrl: 'https://img.youtube.com/vi/zUwEIt9ez7M/hqdefault.jpg' },
    { title: 'Baba O’Riley', ytbId: 'x2KRpRMSu4g', album: 'Who’s Next', genre: 'Classic Rock', artists: ['The Who'], imgUrl: 'https://img.youtube.com/vi/x2KRpRMSu4g/hqdefault.jpg' },
    { title: 'Sultans of Swing', ytbId: 'h0ffIJ7ZO4U', album: 'Dire Straits', genre: 'Classic Rock', artists: ['Dire Straits'], imgUrl: 'https://img.youtube.com/vi/h0ffIJ7ZO4U/hqdefault.jpg' },
    { title: 'Money for Nothing', ytbId: 'wTP2RUD_cL0', album: 'Brothers in Arms', genre: 'Rock', artists: ['Dire Straits'], imgUrl: 'https://img.youtube.com/vi/wTP2RUD_cL0/hqdefault.jpg' },
    { title: 'Born to Run', ytbId: 'IxuThNgl3YA', album: 'Born to Run', genre: 'Rock', artists: ['Bruce Springsteen'], imgUrl: 'https://img.youtube.com/vi/IxuThNgl3YA/hqdefault.jpg' },
    { title: 'Bad Moon Rising', ytbId: '5BmEGm-mraE', album: 'Green River', genre: 'Classic Rock', artists: ['Creedence Clearwater Revival'], imgUrl: 'https://img.youtube.com/vi/5BmEGm-mraE/hqdefault.jpg' },
    { title: 'Have You Ever Seen the Rain', ytbId: 'g4flAZEgtjs', album: 'Pendulum', genre: 'Classic Rock', artists: ['Creedence Clearwater Revival'], imgUrl: 'https://img.youtube.com/vi/g4flAZEgtjs/hqdefault.jpg' },
    { title: 'Born to Be Wild', ytbId: 'egMWlD3fLJ8', album: 'Steppenwolf', genre: 'Classic Rock', artists: ['Steppenwolf'], imgUrl: 'https://img.youtube.com/vi/egMWlD3fLJ8/hqdefault.jpg' },
]

const songsGroup6 = [
    { title: 'No Diggity (feat. Dr. Dre, Queen Pen)', ytbId: '3KL9mRus19o', album: 'Another Level', genre: 'R&B', artists: ['Blackstreet', 'Dr. Dre', 'Queen Pen'], imgUrl: 'https://img.youtube.com/vi/3KL9mRus19o/hqdefault.jpg' },
    { title: 'No Scrubs', ytbId: 'FrLequ6dUdM', album: 'FanMail', genre: 'R&B', artists: ['TLC'], imgUrl: 'https://img.youtube.com/vi/FrLequ6dUdM/hqdefault.jpg' },
    { title: 'Waterfalls', ytbId: '8WEtxJ4-sh4', album: 'CrazySexyCool', genre: 'R&B', artists: ['TLC'], imgUrl: 'https://img.youtube.com/vi/8WEtxJ4-sh4/hqdefault.jpg' },
    { title: 'Say My Name', ytbId: 'sQgd6MccwZc', album: 'The Writing’s on the Wall', genre: 'R&B', artists: ['Destiny’s Child'], imgUrl: 'https://img.youtube.com/vi/sQgd6MccwZc/hqdefault.jpg' },
    { title: 'Yeah! (feat. Lil Jon, Ludacris)', ytbId: 'GxBSyx85Kp8', album: 'Confessions', genre: 'R&B', artists: ['Usher', 'Lil Jon', 'Ludacris'], imgUrl: 'https://img.youtube.com/vi/GxBSyx85Kp8/hqdefault.jpg' },
    { title: 'U Got It Bad', ytbId: 'o3IWTfcks4k', album: '8701', genre: 'R&B', artists: ['Usher'], imgUrl: 'https://img.youtube.com/vi/o3IWTfcks4k/hqdefault.jpg' },
    { title: 'If I Ain’t Got You', ytbId: 'Ju8Hr50Ckwk', album: 'The Diary of Alicia Keys', genre: 'R&B', artists: ['Alicia Keys'], imgUrl: 'https://img.youtube.com/vi/Ju8Hr50Ckwk/hqdefault.jpg' },
    { title: 'Fallin’', ytbId: 'Urdlvw0SSEc', album: 'Songs in A Minor', genre: 'R&B / Soul', artists: ['Alicia Keys'], imgUrl: 'https://img.youtube.com/vi/Urdlvw0SSEc/hqdefault.jpg' },
    { title: 'I Will Always Love You', ytbId: '3JWTaaS7LdU', album: 'The Bodyguard (Soundtrack)', genre: 'R&B / Soul', artists: ['Whitney Houston'], imgUrl: 'https://img.youtube.com/vi/3JWTaaS7LdU/hqdefault.jpg' },
    { title: 'All of Me', ytbId: '450p7goxZqg', album: 'Love in the Future', genre: 'R&B', artists: ['John Legend'], imgUrl: 'https://img.youtube.com/vi/450p7goxZqg/hqdefault.jpg' },
]

const songsGroup7 = [
    { title: 'Stairway to Heaven', ytbId: 'QkF3oxziUI4', album: 'Led Zeppelin IV', genre: 'Classic Rock', artists: ['Led Zeppelin'], imgUrl: 'https://img.youtube.com/vi/QkF3oxziUI4/hqdefault.jpg' },
    { title: 'Another Brick in the Wall, Pt. 2', ytbId: 'HrxX9TBj2zY', album: 'The Wall', genre: 'Rock', artists: ['Pink Floyd'], imgUrl: 'https://img.youtube.com/vi/HrxX9TBj2zY/hqdefault.jpg' },
    { title: 'Hotel California (Live 1977)', ytbId: '09839DpTctU', album: 'Hotel California', genre: 'Classic Rock', artists: ['Eagles'], imgUrl: 'https://img.youtube.com/vi/09839DpTctU/hqdefault.jpg' },
    { title: 'Come Together', ytbId: '45cYwDMibGo', album: 'Abbey Road', genre: 'Classic Rock', artists: ['The Beatles'], imgUrl: 'https://img.youtube.com/vi/45cYwDMibGo/hqdefault.jpg' },
    { title: "(I Can't Get No) Satisfaction", ytbId: 'nrIPxlFzDi0', album: 'Out of Our Heads', genre: 'Classic Rock', artists: ['The Rolling Stones'], imgUrl: 'https://img.youtube.com/vi/nrIPxlFzDi0/hqdefault.jpg' },
    { title: 'Dreams', ytbId: 'Y3ywicffOj4', album: 'Rumours', genre: 'Classic Rock', artists: ['Fleetwood Mac'], imgUrl: 'https://img.youtube.com/vi/Y3ywicffOj4/hqdefault.jpg' },
    { title: 'Every Breath You Take', ytbId: 'OMOGaugKpzs', album: 'Synchronicity', genre: 'Rock', artists: ['The Police'], imgUrl: 'https://img.youtube.com/vi/OMOGaugKpzs/hqdefault.jpg' },
    { title: 'Sweet Home Alabama', ytbId: 'ye5BuYf8q4o', album: 'Second Helping', genre: 'Southern Rock', artists: ['Lynyrd Skynyrd'], imgUrl: 'https://img.youtube.com/vi/ye5BuYf8q4o/hqdefault.jpg' },
    { title: 'You Shook Me All Night Long', ytbId: 'Lo2qQmj0_h4', album: 'Back in Black', genre: 'Hard Rock', artists: ['AC/DC'], imgUrl: 'https://img.youtube.com/vi/Lo2qQmj0_h4/hqdefault.jpg' },
    { title: 'Nothing Else Matters', ytbId: 'tAGnKpE4NCI', album: 'Metallica', genre: 'Rock', artists: ['Metallica'], imgUrl: 'https://img.youtube.com/vi/tAGnKpE4NCI/hqdefault.jpg' },
]

const songsGroup8 = [
    { title: "It's My Life", ytbId: 'vx2u5uUu3DE', album: 'Crush', genre: 'Rock', artists: ['Bon Jovi'], imgUrl: 'https://img.youtube.com/vi/vx2u5uUu3DE/hqdefault.jpg' },
    { title: 'Pour Some Sugar on Me', ytbId: '0UIB9Y4OFPs', album: 'Hysteria', genre: 'Hard Rock', artists: ['Def Leppard'], imgUrl: 'https://img.youtube.com/vi/0UIB9Y4OFPs/hqdefault.jpg' },
    { title: "Won't Get Fooled Again", ytbId: 'UDfAdHBtK_Q', album: "Who's Next", genre: 'Classic Rock', artists: ['The Who'], imgUrl: 'https://img.youtube.com/vi/UDfAdHBtK_Q/hqdefault.jpg' },
    { title: 'All Along the Watchtower', ytbId: 'TLV4_xaYynY', album: 'Electric Ladyland', genre: 'Psychedelic Rock', artists: ['Jimi Hendrix'], imgUrl: 'https://img.youtube.com/vi/TLV4_xaYynY/hqdefault.jpg' },
    { title: 'You Really Got Me', ytbId: '_dHK6hLNTAI', album: 'Kinks', genre: 'Rock', artists: ['The Kinks'], imgUrl: 'https://img.youtube.com/vi/_dHK6hLNTAI/hqdefault.jpg' },
    { title: 'Africa', ytbId: 'FTQbiNvZqaY', album: 'Toto IV', genre: 'Rock', artists: ['Toto'], imgUrl: 'https://img.youtube.com/vi/FTQbiNvZqaY/hqdefault.jpg' },
    { title: 'Eye of the Tiger', ytbId: 'btPJPFnesV4', album: 'Eye of the Tiger', genre: 'Rock', artists: ['Survivor'], imgUrl: 'https://img.youtube.com/vi/btPJPFnesV4/hqdefault.jpg' },
    { title: "I Don't Want to Miss a Thing", ytbId: 'JkK8g6FMEXE', album: 'Armageddon (Music from the Motion Picture)', genre: 'Rock', artists: ['Aerosmith'], imgUrl: 'https://img.youtube.com/vi/JkK8g6FMEXE/hqdefault.jpg' },
    { title: 'Dancing in the Dark', ytbId: '129kuDCQtHs', album: 'Born in the U.S.A.', genre: 'Rock', artists: ['Bruce Springsteen'], imgUrl: 'https://img.youtube.com/vi/129kuDCQtHs/hqdefault.jpg' },
    { title: 'With or Without You', ytbId: 'ujNeHIo7oTE', album: 'The Joshua Tree', genre: 'Rock', artists: ['U2'], imgUrl: 'https://img.youtube.com/vi/ujNeHIo7oTE/hqdefault.jpg' },
]

const songsGroup9 = [
    { title: 'Zombie', ytbId: '6Ejga4kJUts', album: 'No Need to Argue', genre: 'Alternative Rock', artists: ['The Cranberries'], imgUrl: 'https://img.youtube.com/vi/6Ejga4kJUts/hqdefault.jpg' },
    { title: 'Wind of Change', ytbId: 'n4RjJKxsamQ', album: 'Crazy World', genre: 'Rock', artists: ['Scorpions'], imgUrl: 'https://img.youtube.com/vi/n4RjJKxsamQ/hqdefault.jpg' },
    { title: 'We Will Rock You', ytbId: '-tJYN-eG1zk', album: 'News of the World', genre: 'Rock', artists: ['Queen'], imgUrl: 'https://img.youtube.com/vi/-tJYN-eG1zk/hqdefault.jpg' },
    { title: 'Under Pressure', ytbId: 'a01QQZyl-_I', album: 'Hot Space', genre: 'Rock', artists: ['Queen', 'David Bowie'], imgUrl: 'https://img.youtube.com/vi/a01QQZyl-_I/hqdefault.jpg' },
    { title: 'Riders on the Storm', ytbId: 'W1hn1pF-ilQ', album: 'L.A. Woman', genre: 'Psychedelic Rock', artists: ['The Doors'], imgUrl: 'https://img.youtube.com/vi/W1hn1pF-ilQ/hqdefault.jpg' },
    { title: 'Free Fallin’', ytbId: '1lWJXDG2i0A', album: 'Full Moon Fever', genre: 'Rock', artists: ['Tom Petty'], imgUrl: 'https://img.youtube.com/vi/1lWJXDG2i0A/hqdefault.jpg' },
    { title: 'Take It Easy (Live)', ytbId: 'AaBw37-nWaY', album: 'Hell Freezes Over (Live)', genre: 'Classic Rock', artists: ['Eagles'], imgUrl: 'https://img.youtube.com/vi/AaBw37-nWaY/hqdefault.jpg' },
    { title: 'Walk of Life', ytbId: 'kd9TlGDZGkI', album: 'Brothers in Arms', genre: 'Rock', artists: ['Dire Straits'], imgUrl: 'https://img.youtube.com/vi/kd9TlGDZGkI/hqdefault.jpg' },
    { title: 'Fortunate Son', ytbId: 'ZWijx_AgPiA', album: 'Willy and the Poor Boys', genre: 'Classic Rock', artists: ['Creedence Clearwater Revival'], imgUrl: 'https://img.youtube.com/vi/ZWijx_AgPiA/hqdefault.jpg' },
    { title: 'Gimme Shelter', ytbId: 'RbmS3tQJ7Os', album: 'Let It Bleed', genre: 'Classic Rock', artists: ['The Rolling Stones'], imgUrl: 'https://img.youtube.com/vi/RbmS3tQJ7Os/hqdefault.jpg' },
]

const songsGroup10 = [
    { title: 'Somebody to Love', ytbId: 'kijpcUv-b8M', album: 'A Day at the Races', genre: 'Rock', artists: ['Queen'], imgUrl: 'https://img.youtube.com/vi/kijpcUv-b8M/hqdefault.jpg' },
    { title: 'Paradise City', ytbId: 'Rbm6GXllBiw', album: 'Appetite for Destruction', genre: 'Hard Rock', artists: ["Guns N' Roses"], imgUrl: 'https://img.youtube.com/vi/Rbm6GXllBiw/hqdefault.jpg' },
    { title: 'Jump', ytbId: 'SwYN7mTi6HM', album: '1984', genre: 'Rock', artists: ['Van Halen'], imgUrl: 'https://img.youtube.com/vi/SwYN7mTi6HM/hqdefault.jpg' },
    { title: 'Should I Stay or Should I Go', ytbId: 'xMaE6toi4mk', album: 'Combat Rock', genre: 'Punk Rock', artists: ['The Clash'], imgUrl: 'https://img.youtube.com/vi/xMaE6toi4mk/hqdefault.jpg' },
    { title: 'Roxanne', ytbId: '3T1c7GkzRQQ', album: "Outlandos d'Amour", genre: 'Rock', artists: ['The Police'], imgUrl: 'https://img.youtube.com/vi/3T1c7GkzRQQ/hqdefault.jpg' },
    { title: 'Heroes', ytbId: 'lXgkuM2NhYI', album: 'Heroes', genre: 'Rock', artists: ['David Bowie'], imgUrl: 'https://img.youtube.com/vi/lXgkuM2NhYI/hqdefault.jpg' },
    { title: 'Under the Bridge', ytbId: 'GLvohMXgcBo', album: 'Blood Sugar Sex Magik', genre: 'Alternative Rock', artists: ['Red Hot Chili Peppers'], imgUrl: 'https://img.youtube.com/vi/GLvohMXgcBo/hqdefault.jpg' },
    { title: 'Killer Queen', ytbId: '2ZBtPf7FOoM', album: 'Sheer Heart Attack', genre: 'Rock', artists: ['Queen'], imgUrl: 'https://img.youtube.com/vi/2ZBtPf7FOoM/hqdefault.jpg' },
    { title: 'Start Me Up', ytbId: 'SGyOaCXr8Lw', album: 'Tattoo You', genre: 'Rock', artists: ['The Rolling Stones'], imgUrl: 'https://img.youtube.com/vi/SGyOaCXr8Lw/hqdefault.jpg' },
    { title: 'House of the Rising Sun', ytbId: '4-43lLKaqBQ', album: 'The Animals', genre: 'Rock', artists: ['The Animals'], imgUrl: 'https://img.youtube.com/vi/4-43lLKaqBQ/hqdefault.jpg' },
]

const songsGroup11 = [
    { title: 'Hey Jude', ytbId: 'A_MjCqQoLLA', album: 'Single', genre: 'Classic Rock', artists: ['The Beatles'], imgUrl: 'https://img.youtube.com/vi/A_MjCqQoLLA/hqdefault.jpg' },
    { title: 'Good Vibrations', ytbId: 'apBWI6xrbLY', album: 'Single', genre: 'Classic Rock', artists: ['The Beach Boys'], imgUrl: 'https://img.youtube.com/vi/apBWI6xrbLY/hqdefault.jpg' },
    { title: 'Light My Fire', ytbId: 'tEXlWgMOtqc', album: 'The Doors', genre: 'Psychedelic Rock', artists: ['The Doors'], imgUrl: 'https://img.youtube.com/vi/tEXlWgMOtqc/hqdefault.jpg' },
    { title: 'Free Bird', ytbId: '0LwcvjNJTuM', album: "Pronounced 'Lĕh-'nérd 'Skin-'nérd", genre: 'Southern Rock', artists: ['Lynyrd Skynyrd'], imgUrl: 'https://img.youtube.com/vi/0LwcvjNJTuM/hqdefault.jpg' },
    { title: 'Highway Star', ytbId: 'AqEW53Ui2no', album: 'Machine Head', genre: 'Hard Rock', artists: ['Deep Purple'], imgUrl: 'https://img.youtube.com/vi/AqEW53Ui2no/hqdefault.jpg' },
    { title: 'La Grange', ytbId: 'aB4nH8qx2IM', album: 'Tres Hombres', genre: 'Rock', artists: ['ZZ Top'], imgUrl: 'https://img.youtube.com/vi/aB4nH8qx2IM/hqdefault.jpg' },
    { title: 'Pinball Wizard', ytbId: 'hHc7bR6y06M', album: 'Tommy', genre: 'Rock', artists: ['The Who'], imgUrl: 'https://img.youtube.com/vi/hHc7bR6y06M/hqdefault.jpg' },
    { title: 'Brown Eyed Girl', ytbId: 'UfmkgQRmmeE', album: "Blowin' Your Mind!", genre: 'Rock', artists: ['Van Morrison'], imgUrl: 'https://img.youtube.com/vi/UfmkgQRmmeE/hqdefault.jpg' },
    { title: "What's Going On", ytbId: 'H-kA3UtBj4M', album: "What's Going On", genre: 'R&B/Soul', artists: ['Marvin Gaye'], imgUrl: 'https://img.youtube.com/vi/H-kA3UtBj4M/hqdefault.jpg' },
    { title: 'Respect', ytbId: '6FOUqQt3Kg0', album: 'I Never Loved a Man the Way I Love You', genre: 'R&B/Soul', artists: ['Aretha Franklin'], imgUrl: 'https://img.youtube.com/vi/6FOUqQt3Kg0/hqdefault.jpg' },
]

_createStations()

export const stationService = {
    query,
    get,
    remove,
    save,
    getDefaultStation,
    getDefaultFilter,
}

async function query(filterBy = {}) {
    try {
        let stations = await storageService.query(STATION_KEY)
        stations = stations.map((station) => {
            if (station.coverImage && station.coverImage.length) return station
            const firstSong = station.songs && station.songs.length ? station.songs[0] : null
            const fallbackImage =
                firstSong && typeof firstSong.imgUrl === 'string' && firstSong.imgUrl.length
                    ? firstSong.imgUrl
                    : ''
            if (!fallbackImage) return station
            return { ...station, coverImage: fallbackImage }
        })
        if (filterBy.name) {
            const regex = new RegExp(filterBy.name, 'i')
            stations = stations.filter((station) => regex.test(station.name))
        }
        if (filterBy.tags) stations.filter((station) => station.tags.some((tag) => filterBy.tags.includes(tag)))
        if (filterBy.createdBy) stations.filter((station) => station.createdBy._id === filterBy.createdBy)
        if (filterBy.userStations) stations.filter((station) => filterBy.userStations.includes(station._id))
        return stations
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function get(stationId) {
    return storageService.get(STATION_KEY, stationId)
}

async function remove(stationId) {
    return storageService.remove(STATION_KEY, stationId)
}

async function save(station) {
    return station._id
        ? storageService.put(STATION_KEY, station)
        : storageService.post(STATION_KEY, { ...station, createdAt: Date.now() })
}

function getDefaultFilter() {
    return {
        name: '',
        createdBy: '',
        tags: [],
        userStations: [],
    }
}

function getDefaultStation() {
    return {
        name: '',
        songs: [],
        coverImage: '',
        tags: [],
        createdBy: {},
        likedByUsers: [],
        isLikedSongsPlaylist: false,
        isPrivate: false,
    }
}

function _createStations() {
    const existing = utilService.loadFromStorage(STATION_KEY, [])
    if (existing && existing.length) return

    const stations = [
        _buildStation('Global Pop Essentials', songsGroup1, ['pop', 'global']),
        _buildStation('Chart Toppers', songsGroup2, ['hits', 'trending']),
        _buildStation('Alt & Classics Mix', songsGroup3, ['alternative', 'classics']),
        _buildStation('Anthems of Rock', songsGroup4, ['rock', 'classics']),
        _buildStation('Legends Never Fade', songsGroup5, ['rock', 'classics']),
        _buildStation('R&B Essentials', songsGroup6, ['R&B', 'soul']),
        _buildStation('Timeless Classics', songsGroup7, ['rock', 'timeless']),
        _buildStation('Arena Rock Hits', songsGroup8, ['rock', 'arena']),
        _buildStation('Singalong Classics', songsGroup9, ['rock', 'favorites']),
        _buildStation('Rock Radio Classics', songsGroup10, ['rock', 'radio']),
        _buildStation('Golden Oldies Mix', songsGroup11, ['classics', 'soul']),
    ]

    utilService.saveToStorage(STATION_KEY, stations)
}

function _buildStation(name, songs, tags = []) {
    const stationId = utilService.makeId()
    return {
        _id: stationId,
        name,
        description: `${name} playlist`,
        coverImage:
            songs && songs.length && songs[0] && typeof songs[0].imgUrl === 'string'
                ? songs[0].imgUrl
                : '',
        tags,
        createdBy: {
            _id: 'spotify',
            username: 'Spotify',
            imgUrl: 'https://misc.scdn.co/liked-songs/playlist-announcement-image.jpg',
        },
        likedByUsers: [],
        isLikedSongsPlaylist: false,
        isPrivate: false,
        createdAt: Date.now(),
        songs: songs.map((song, idx) => _buildStationSong(song, idx)),
    }
}

function _buildStationSong(song, index) {
    const songId = utilService.makeId()
    const duration = utilService.getRandomIntInclusive(150, 320)
    return {
        _id: songId,
        title: song.title,
        ytbId: song.ytbId,
        url: `https://www.youtube.com/watch?v=${song.ytbId}`,
        imgUrl: song.imgUrl,
        album: song.album,
        genre: song.genre,
        artists: song.artists.map((name) => ({ name, _id: utilService.makeId() })),
        duration,
        length: duration,
        monthlyListens: utilService.getRandomIntInclusive(5000, 450000),
        dateAdded: Date.now() - index * 1000 * 60,
    }
}
