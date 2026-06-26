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
        image: '',
        language: 'english',
        genre: 'sci-fi',
        director: 'denis villeneuve',
        cast: 'timothee chalamet, zendaya, rebecca ferguson',
        description: 'paul atreides unites with chani and the fremen to seek revenge against the conspirators who destroyed his family.',
        duration: 166,
        releaseDate: new Date('2024-02-29'),
        endDate: new Date('2027-12-31')
      },
      {
        _id: m2,
        title: 'oppenheimer',
        image: '',
        language: 'english',
        genre: 'drama',
        director: 'christopher nolan',
        cast: 'cillian murphy, emily blunt, matt damon',
        description: 'the story of j. robert oppenheimer and the making of the atomic bomb.',
        duration: 180,
        releaseDate: new Date('2023-07-21'),
        endDate: new Date('2027-12-31')
      },
      {
        _id: m3,
        title: 'barbie',
        image: '',
        language: 'english',
        genre: 'comedy',
        director: 'greta gerwig',
        cast: 'margot robbie, ryan gosling, america ferrera',
        description: 'barbie and ken travel to the real world and discover the joy of being human.',
        duration: 114,
        releaseDate: new Date('2023-07-21'),
        endDate: new Date('2027-12-31')
      }
    ]);

    db.cinemas.insertMany([
      {
        _id: c1,
        name: 'CinePlex Central',
        ticketPrice: 350,
        city: 'skopje',
        seatsAvailable: 28,
        image: '',
        seats: [
          [0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0]
        ]
      },
      {
        _id: c2,
        name: 'Millennium Cinema',
        ticketPrice: 300,
        city: 'bitola',
        seatsAvailable: 30,
        image: '',
        seats: [
          [0,0,0,0,0,0],
          [0,0,0,0,0,0],
          [0,0,0,0,0,0],
          [0,0,0,0,0,0],
          [0,0,0,0,0,0]
        ]
      },
      {
        _id: c3,
        name: 'Cinestar Lakeside',
        ticketPrice: 250,
        city: 'ohrid',
        seatsAvailable: 24,
        image: '',
        seats: [
          [0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0]
        ]
      }
    ]);

    const tomorrow  = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0,0,0,0);

    const farFuture = new Date();
    farFuture.setDate(farFuture.getDate() + 90);

    db.showtimes.insertMany([
      { startAt: '14:00', startDate: tomorrow, endDate: farFuture, movieId: m1, cinemaId: c1 },
      { startAt: '18:00', startDate: tomorrow, endDate: farFuture, movieId: m1, cinemaId: c1 },
      { startAt: '21:00', startDate: tomorrow, endDate: farFuture, movieId: m1, cinemaId: c2 },
      { startAt: '16:00', startDate: tomorrow, endDate: farFuture, movieId: m2, cinemaId: c1 },
      { startAt: '20:00', startDate: tomorrow, endDate: farFuture, movieId: m2, cinemaId: c2 },
      { startAt: '19:00', startDate: tomorrow, endDate: farFuture, movieId: m2, cinemaId: c3 },
      { startAt: '15:00', startDate: tomorrow, endDate: farFuture, movieId: m3, cinemaId: c2 },
      { startAt: '17:00', startDate: tomorrow, endDate: farFuture, movieId: m3, cinemaId: c3 },
      { startAt: '20:00', startDate: tomorrow, endDate: farFuture, movieId: m3, cinemaId: c1 }
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
        username: 'user',
        phone: '+12025550002',
        checkin: false
      },
      {
        date: resDate,
        startAt: '20:00',
        seats: [[1, 0], [1, 1], [1, 2]],
        ticketPrice: 300,
        total: 900,
        movieId: m2,
        cinemaId: c2,
        username: 'user1',
        phone: '+12025550003',
        checkin: false
      },
      {
        date: resDate,
        startAt: '17:00',
        seats: [[2, 4], [2, 5]],
        ticketPrice: 250,
        total: 500,
        movieId: m3,
        cinemaId: c3,
        username: 'user2',
        phone: '+12025550004',
        checkin: false
      }
    ]);

    print('[cinema-init] Database ready with all seed data.');
  "

echo "[cinema-init] Done."
