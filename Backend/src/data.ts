export const sample_movies: any[] = [
  {
    id: "0",
    title: "Captain America : First Avenger",
    year: "2011",
    trailer: "IsiV9IJieMk",
    streaming: [{ name: "Disney", url: "https://www.disneyplus.com" }],
    time: 124,
    numberOfReviews: 1,
    stars: 5,
    favorite: false,
    director: [{ photo: "", name: "Joe Johnston" }],
    screenwriters: [
      {
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Christopher_Markus_%26_Stephen_McFeely_%2848385355446%29.jpg/1920px-Christopher_Markus_%26_Stephen_McFeely_%2848385355446%29.jpg",
        name: "Christopher Markus",
      },
      {
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Christopher_Markus_%26_Stephen_McFeely_%2848385355446%29.jpg/1920px-Christopher_Markus_%26_Stephen_McFeely_%2848385355446%29.jpg",
        name: "Stephen McFeely",
      },
    ],
    actors: [
      {
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/3/33/Mark_Kassen%2C_Tony_C%C3%A1rdenas_and_Chris_Evans_%28cropped%29.jpg",
        name: "Chris Evans",
        role: "Captain America",
      },
      {
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/HVFFLondon2017Cap-ALS-29_%2835183142201%29_Cropped.jpg/800px-HVFFLondon2017Cap-ALS-29_%2835183142201%29_Cropped.jpg",
        name: "Hayley Atwell",
        role: "Peggy Carter",
      },
      {
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Sebastian_Stan_by_Gage_Skidmore_2_%28cropped%29.jpg/800px-Sebastian_Stan_by_Gage_Skidmore_2_%28cropped%29.jpg",
        name: "Sebastian Stan",
        role: "James Barnes (Bucky)",
      },
    ],
    plot: "Captain America: First Avenger nous plonge dans les premières années de l’univers Marvel. Steve Rogers, frêle et timide, se porte volontaire pour participer à un programme expérimental qui va le transformer en un Super Soldat connu sous le nom de Captain America. Allié à Bucky Barnes et Peggy Carter, il sera confronté à la diabolique organisation HYDRA dirigée par le redoutable Red Skull.",
    poster:
      "https://upload.wikimedia.org/wikipedia/en/3/37/Captain_America_The_First_Avenger_poster.jpg",
    comments: [
      {
        userId: "647a72b0b1572f86c54396be",
        nameUser: "Federico",
        rating: 5,
        comment: "Super!!",
      },
    ],
  },
];

export const sample_users: any[] = [
  {
    name: "Federico",
    email: "fede@test.fr",
    password: "$2a$10$0JtHVpvWO7B0PgSCfT/ABO.O.5ZbkWTsqPtXukhrC329awKS7oPFu",
    isAdmin: true,
    favorite: [
      { idMovie: "64734ce21e75f306febc9a58" },
      { idMovie: "6459ee3f3710a80843b09bb6" },
    ],
    myList: [
      {
        idMovie: "64734ce21e75f306febc9a58",
      },
      { idMovie: "6459ee3f3710a80843b09bb6" },
    ],
  },
  {
    name: "Admin",
    email: "admin@test.fr",
    password: "$2a$10$0JtHVpvWO7B0PgSCfT/ABO.O.5ZbkWTsqPtXukhrC329awKS7oPFu",
    isAdmin: true,
    favorite: [
      {
        idMovie: "64734ce21e75f306febc9a58",
      },
      { idMovie: "6459ee3f3710a80843b09bb6" },
    ],
    myList: [
      {
        idMovie: "64734ce21e75f306febc9a58",
      },
      { idMovie: "6459ee3f3710a80843b09bb6" },
    ],
  },
];

export const sample_favorite: any[] = [
  {
    idUser: "6418115652b7cb63a915f677",
    favorite: [
      {
        idMovie: "64734ce21e75f306febc9a58",
      },
      {
        idMovie: "6459ee3f3710a80843b09bb6",
      },
    ],
  },
];
