// router.get("/testsearch1", (req,res) =>{
//   const lotr = [
//   {
//     title: "Lord of the Rings: The Fellowship of the Ring",
//     poster: "https://drewreviewmovies.files.wordpress.com/2016/07/lordoftheringsthe01-thefellowshipofthering.jpg",
//     genres: ["Adventure", "Drama", "Fantasy"],
//     synopsis: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
//     scene_images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDAHxXYM03WZ9LK_-vom7VTozSSj2ygOzm5ggNNIHCUCH6oEQ7", "https://travisryanfilmblog.files.wordpress.com/2016/08/fellowship-of-the-ring.jpg", "http://parentpreviews.com/images/made/legacy-pics/lotr-fellowship-of-the-ring_668_330_80_int_s_c1.jpg"],
//     trailer: "https://www.youtube.com/watch?v=V75dMMIW2B4",
//     imdb_rating: 8.8,
//     imdb_id: "tt0120737",
//     release_date: "12-19-2001",
//     cast: [{character: "Frodo Baggins", name: "Elijah Wood"}, {character: "Legolas", name: "Orlando Bloom"}],
//     crew: [{job: "director", name: "Peter Jackson"}]
//   },
//   {
//     title: "Lord of the Rings: The Two Towers",
//     poster: "https://m.media-amazon.com/images/M/MV5BNGE5MzIyNTAtNWFlMC00NDA2LWJiMjItMjc4Yjg1OWM5NzhhXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
//     genres: ["Adventure", "Drama", "Fantasy"],
//     synopsis: "While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron's new ally, Saruman, and his hordes of Isengard.",
//     scene_images: ["https://www.whats-on-netflix.com/wp-content/uploads/2018/11/lord-of-the-rings-the-two-towers.jpeg","https://lh3.googleusercontent.com/_I5TmoX57runARTAZcGrXxaR376476-iy2mKcjovrJOp5s8g1t4_9kW2Xttfq4xE89oOVQ=w720-h405-rw", "https://www.unilad.co.uk/wp-content/uploads/2018/12/helms-deep.jpg"],
//     trailer: "https://www.youtube.com/watch?v=LbfMDwc4azU",
//     imdb_rating: 8.7,
//     imdb_id: "tt0167261",
//     release_date: "12-18-2002",
//     cast: [{character: "Frodo Baggins", name: "Elijah Wood"}, {character: "Legolas", name: "Orlando Bloom"}],
//     crew: [{job: "director", name: "Peter Jackson"}]
//   },
//   {
//     title: "Lord of the Rings: The Return of the King",
//     poster: "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY1200_CR90,0,630,1200_AL_.jpg",
//     genres: ["Adventure", "Drama", "Fantasy"],
//     synopsis: "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
//     scene_images: ["https://macmcentire.files.wordpress.com/2017/05/rotk4.jpg", "https://i.ytimg.com/vi/JB7fjEtzrsk/maxresdefault.jpg", "https://sleeplessthought.files.wordpress.com/2015/11/87_the_lord_of_the_rings_the_return_of_the_king.jpg?w=474&h=267"],
//     trailer: "https://www.youtube.com/watch?v=r5X-hFf6Bwo",
//     imdb_rating: 8.9,
//     imdb_id: "tt0167260",
//     release_date: "12-17-2003",
//     cast: [{character: "Frodo Baggins", name: "Elijah Wood"}, {character: "Legolas", name: "Orlando Bloom"}],
//     crew: [{job: "director", name: "Peter Jackson"}]
//   }
// ]
//   res.send(lotr)
// })

// router.get("/testsearch2", (req, res) =>{
//   const aladdin = [
//     {
//       title: "Aladdin",
//       poster: "https://i.pinimg.com/originals/ab/d6/be/abd6beb712ef72adf32acc94bb31607c.jpg",
//       genres: ["Animation", "Adventure", "Comedy"],
//       synopsis: "A kindhearted street urchin and a power-hungry Grand Vizier vie for a magic lamp that has the power to make their deepest wishes come true.",
//       scene_images: ["https://i.ytimg.com/vi/wIGqHxwzjGA/maxresdefault.jpg", "https://i.ytimg.com/vi/s94HmtQwX7o/hqdefault.jpg", "https://cdn.newsapi.com.au/image/v1/64f4edbb13e62477becbe4648471b84d"],
//       trailer: "https://www.youtube.com/watch?v=8HrmBXgiwDU",
//       imdb_rating: 8.0,
//       imdb_id: "tt0103639",
//       release_date: "11-25-1992",
//       cast: [{character: "Aladdin", name: "Scott Weinger"}, {character: "Jasmine", name: "Linda Larkin"}, {character: "Genie", name: "Robin Williams"}],
//       crew: [{job: "director", name: "Ron Clements"}, {job: "director", name: "John Musker"}]
//     },
//     {
//       title: "Aladdin",
//       poster: "https://m.media-amazon.com/images/M/MV5BMjQ2ODIyMjY4MF5BMl5BanBnXkFtZTgwNzY4ODI2NzM@._V1_.jpg",
//       genres: ["Adventure", "Comedy", "Family"],
//       synopsis: "A kind-hearted street urchin and a power-hungry Grand Vizier vie for a magic lamp that has the power to make their deepest wishes come true.",
//       scene_images: ["https://imgix.bustle.com/uploads/image/2019/5/22/f89631fa-fa79-419d-95ee-60ead1e89958-liveactionaladdin2.jpg?w=970&h=546&fit=crop&crop=faces&auto=format&q=70", "https://www.moviequotesandmore.com/wp-content/uploads/aladdin-2019-2.jpg", "https://i.ytimg.com/vi/ceSt3bYwP0A/maxresdefault.jpg"],
//       trailer: "https://www.youtube.com/watch?v=JcMtWwiyzpU",
//       imdb_rating: 7.4,
//       imdb_id: "tt6139732",
//       release_date: "05-24-2019",
//       release_date: "11-25-1992",
//       cast: [{character: "Aladdin", name: "Mena Mssoud"}, {character: "Jasmine", name: "Naomi Scott"}, {character: "Genie", name: "Will Smith"}],
//       crew: [{job: "director", name: "Guy Ritchie"}]
//     }
//   ]
//   res.send(aladdin)
// })


// router.get("/testsearch3", (req,res) =>{
//   const titanic = [
//     {
//       title: "Titanic",
//       poster: "https://cdn.shopify.com/s/files/1/1416/8662/products/titanic_1997_french_grande_original_film_art_2000x.jpg?v=1558250674",
//       genres: ["Drama", "Romance"],
//       synopsis: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
//       scene_images: ["https://pixel.nymag.com/imgs/daily/vulture/2017/12/07/07-titanic.w600.h315.2x.jpg", "https://i.pinimg.com/originals/17/de/63/17de631fb19a739677253ce30453c38d.jpg", "https://www.hindustantimes.com/rf/image_size_960x540/HT/p2/2018/02/18/Pictures/_6edad41a-1474-11e8-82d6-43c3cccec057.jpg"],
//       trailer: "https://www.youtube.com/watch?v=zCy5WQ9S4c0",
//       imdb_rating: 7.8,
//       imdb_id: "tt0120338",
//       cast: [{character: "Jack Dawson", name: "Leonardo DiCaprio"}, {character: "Rose Dewitt Bukater", name: "Kate Winslet"}],
//       crew: [{job: "director", name: "James Cameron"}]
//     }
//   ]
//   res.send(titanic)
// })