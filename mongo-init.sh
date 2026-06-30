#!/bin/bash
set -euo pipefail

ADMIN_HASH='$2a$08$OuTUD.Xlj/eNSd0hT5XelOViMj02bj6vY35WmDZ8cD7QVO9FurLW.'
USER_HASH='$2b$08$6p9DeqeGPXgm.9MQDvyx0OsWtRwzGrYJ3NjeWkE.UiNP4vFSjwFKi'
USER1_HASH='$2b$08$P/pQeaxTxBruVDytezPR4eZsDyyRcRNHWH.gpJ3e7G9pEy4khXne6'
USER2_HASH='$2b$08$zRqxamJfgH8wZw.ZfRmTt.qyQHkMbLYu8mNfJfJ2w/oAJyFBH5dSS'

echo "[cinema-init] Seeding database..."

mongosh \
  --username "$MONGO_INITDB_ROOT_USERNAME" \
  --password "$MONGO_INITDB_ROOT_PASSWORD" \
  --authenticationDatabase admin \
  --eval "
    const db = db.getSiblingDB('${MONGO_INITDB_DATABASE}');

    db.createUser({
      user: '${MONGO_APP_USER}',
      pwd:  '${MONGO_APP_PASSWORD}',
      roles: [
        { role: 'readWrite', db: '${MONGO_INITDB_DATABASE}' },
        { role: 'dbAdmin',   db: '${MONGO_INITDB_DATABASE}' }
      ]
    });

    const m1 = ObjectId(), m2 = ObjectId(), m3 = ObjectId();
    const c1 = ObjectId(), c2 = ObjectId(), c3 = ObjectId();

    db.users.insertMany([
      {
        name: 'Admin',
        username: 'admin',
        email: 'admin@cinema.local',
        password: '${ADMIN_HASH}',
        role: 'superadmin',
        phone: '+12025550001',
        tokens: []
      },
      {
        name: 'Regular User',
        username: 'user',
        email: 'user@cinema.local',
        password: '${USER_HASH}',
        role: 'guest',
        phone: '+12025550002',
        tokens: []
      },
      {
        name: 'User One',
        username: 'user1',
        email: 'user1@cinema.local',
        password: '${USER1_HASH}',
        role: 'guest',
        phone: '+12025550003',
        tokens: []
      },
      {
        name: 'User Two',
        username: 'user2',
        email: 'user2@cinema.local',
        password: '${USER2_HASH}',
        role: 'guest',
        phone: '+12025550004',
        tokens: []
      }
    ]);

    db.movies.insertMany([
      {
        _id: m1,
        title: 'dune: part two',
        image: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
        status: 'nowShowing',
        language: 'english',
        genre: 'sci-fi',
        director: 'denis villeneuve',
        cast: 'timothee chalamet, zendaya, rebecca ferguson',
        description: 'paul atreides unites with chani and the fremen to seek revenge against the conspirators who destroyed his family.',
        duration: 166,
        releaseDate: new Date('2024-02-29'),
        endDate: new Date('2027-12-31'),
        ticketPrice: 350
      },
      {
        _id: m2,
        title: 'oppenheimer',
        image: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
        status: 'nowShowing',
        language: 'english',
        genre: 'drama',
        director: 'christopher nolan',
        cast: 'cillian murphy, emily blunt, matt damon',
        description: 'the story of j. robert oppenheimer and the making of the atomic bomb.',
        duration: 180,
        releaseDate: new Date('2023-07-21'),
        endDate: new Date('2027-12-31'),
        ticketPrice: 400
      },
      {
        _id: m3,
        title: 'barbie',
        image: 'https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg',
        status: 'nowShowing',
        language: 'english',
        genre: 'comedy',
        director: 'greta gerwig',
        cast: 'margot robbie, ryan gosling, america ferrera',
        description: 'barbie and ken travel to the real world and discover the joy of being human.',
        duration: 114,
        releaseDate: new Date('2023-07-21'),
        endDate: new Date('2027-12-31'),
        ticketPrice: 300
      },
      {
        title: 'the batman',
        image: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg',
        status: 'nowShowing',
        language: 'english',
        genre: 'action',
        director: 'matt reeves',
        cast: 'robert pattinson, zoe kravitz, paul dano',
        description: 'when a sadistic killer leaves behind a trail of cryptic clues, batman must forge new relationships and unmask the culprit.',
        duration: 176,
        releaseDate: new Date('2022-03-04'),
        endDate: new Date('2027-12-31'),
        ticketPrice: 350
      },
      {
        title: 'joker',
        image: 'https://image.tmdb.org/t/p/w500/n6bUvigpRFqSwmPp1m2YADdbRBc.jpg',
        status: 'nowShowing',
        language: 'english',
        genre: 'drama',
        director: 'todd phillips',
        cast: 'joaquin phoenix, robert de niro, zazie beetz',
        description: 'a mentally troubled comedian embarks on a downward spiral that leads to the creation of an iconic villain.',
        duration: 122,
        releaseDate: new Date('2019-10-04'),
        endDate: new Date('2027-12-31'),
        ticketPrice: 320
      },
      {
        title: 'interstellar',
        image: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
        status: 'nowShowing',
        language: 'english',
        genre: 'sci-fi',
        director: 'christopher nolan',
        cast: 'matthew mcconaughey, anne hathaway, jessica chastain',
        description: 'a team of explorers travel through a wormhole in space in an attempt to ensure humanity survival.',
        duration: 169,
        releaseDate: new Date('2014-11-07'),
        endDate: new Date('2027-12-31'),
        ticketPrice: 330
      },
      {
        title: 'deadpool & wolverine',
        image: 'https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
        status: 'comingSoon',
        language: 'english',
        genre: 'action',
        director: 'shawn levy',
        cast: 'ryan reynolds, hugh jackman, emma corrin',
        description: 'wade wilson teams up with a reluctant wolverine on a mission that will change the history of the multiverse.',
        duration: 128,
        releaseDate: new Date('2027-09-01'),
        endDate: new Date('2028-12-31'),
        ticketPrice: 400
      },
      {
        title: 'gladiator ii',
        image: 'https://image.tmdb.org/t/p/w500/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg',
        status: 'comingSoon',
        language: 'english',
        genre: 'action',
        director: 'ridley scott',
        cast: 'paul mescal, pedro pascal, denzel washington',
        description: 'years after witnessing the death of the revered hero maximus, lucius is forced to enter the colosseum.',
        duration: 148,
        releaseDate: new Date('2027-10-15'),
        endDate: new Date('2028-12-31'),
        ticketPrice: 400
      },
      {
        title: 'wicked',
        image: 'https://image.tmdb.org/t/p/w500/c5Tqxeo1UpBvnAc3csUm7j3hlQl.jpg',
        status: 'comingSoon',
        language: 'english',
        genre: 'musical',
        director: 'jon m. chu',
        cast: 'cynthia erivo, ariana grande, jeff goldblum',
        description: 'the untold story of the witches of oz and an unlikely friendship that changes their lives forever.',
        duration: 160,
        releaseDate: new Date('2027-11-20'),
        endDate: new Date('2028-12-31'),
        ticketPrice: 380
      }
    ]);

    db.cinemas.insertMany([
      { _id: c1, name: 'CinePlex Central', city: 'skopje', image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800' },
      { _id: c2, name: 'Millennium Cinema', city: 'bitola', image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800' },
      { _id: c3, name: 'Cinestar Lakeside', city: 'ohrid', image: 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=800' }
    ]);

    const r1 = ObjectId(), r2 = ObjectId(), r3 = ObjectId(), r4 = ObjectId(), r5 = ObjectId();

    db.rooms.insertMany([
      { _id: r1, name: 'Room 1', cinemaId: c1, seatsAvailable: 28, seats: [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]] },
      { _id: r2, name: 'Room 2', cinemaId: c1, seatsAvailable: 18, seats: [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]] },
      { _id: r3, name: 'Room 1', cinemaId: c2, seatsAvailable: 30, seats: [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]] },
      { _id: r4, name: 'Room 1', cinemaId: c3, seatsAvailable: 24, seats: [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]] },
      { _id: r5, name: 'Room 2', cinemaId: c3, seatsAvailable: 16, seats: [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]] }
    ]);

    const tomorrow  = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0,0,0,0);

    const farFuture = new Date();
    farFuture.setDate(farFuture.getDate() + 90);

    db.showtimes.insertMany([
      { startAt: '14:00', startDate: tomorrow, endDate: farFuture, movieId: m1, cinemaId: c1, roomId: r1 },
      { startAt: '18:00', startDate: tomorrow, endDate: farFuture, movieId: m1, cinemaId: c1, roomId: r2 },
      { startAt: '21:00', startDate: tomorrow, endDate: farFuture, movieId: m1, cinemaId: c2, roomId: r3 },
      { startAt: '16:00', startDate: tomorrow, endDate: farFuture, movieId: m2, cinemaId: c1, roomId: r1 },
      { startAt: '20:00', startDate: tomorrow, endDate: farFuture, movieId: m2, cinemaId: c2, roomId: r3 },
      { startAt: '19:00', startDate: tomorrow, endDate: farFuture, movieId: m2, cinemaId: c3, roomId: r4 },
      { startAt: '15:00', startDate: tomorrow, endDate: farFuture, movieId: m3, cinemaId: c2, roomId: r3 },
      { startAt: '17:00', startDate: tomorrow, endDate: farFuture, movieId: m3, cinemaId: c3, roomId: r5 },
      { startAt: '20:00', startDate: tomorrow, endDate: farFuture, movieId: m3, cinemaId: c1, roomId: r1 }
    ]);

    const resDate = new Date();
    resDate.setDate(resDate.getDate() + 5);
    resDate.setHours(0,0,0,0);

    db.reservations.insertMany([
      {
        date: resDate,
        startAt: '18:00',
        seats: [[0, 2], [0, 3]],
        ticketPrice: 350,
        total: 700,
        movieId: m1,
        cinemaId: c1,
        roomId: r2,
        username: 'user',
        phone: '+12025550002',
        checkin: false
      },
      {
        date: resDate,
        startAt: '20:00',
        seats: [[1, 0], [1, 1], [1, 2]],
        ticketPrice: 400,
        total: 1200,
        movieId: m2,
        cinemaId: c2,
        roomId: r3,
        username: 'user1',
        phone: '+12025550003',
        checkin: false
      },
      {
        date: resDate,
        startAt: '17:00',
        seats: [[0, 4], [0, 5]],
        ticketPrice: 300,
        total: 600,
        movieId: m3,
        cinemaId: c3,
        roomId: r5,
        username: 'user2',
        phone: '+12025550004',
        checkin: false
      }
    ]);

    print('[cinema-init] Database ready with all seed data.');
  "

echo "[cinema-init] Done."
