const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const requireLogin = require("../middleware/requireLogin")
const Movie = mongoose.model("Movie")
const User = mongoose.model("User")
const translate = require('google-translate-api');
const axios = require('axios');



/* router.get('/allmovie',(req,res)=>{
    Movie.find()
    .limit(75)
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
}) */

router.get('/allmovie',requireLogin,(req,res)=>{
    console.log("çalıştı")
    Movie.aggregate([
        {$match: {}},
        {$sample: {size: 500}}
    ], ).then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post("/search-movie", async (req, res) => {
    console.log(req.body)
    try {
        const searchText = req.body.text.trim(); // Boşlukları temizle

        // Daha az karmaşık arama sorgusu kullanma
        const movies = await Movie.find({
            name: new RegExp(searchText, "i")
        }).select('name number').limit(5);

        // Paralel işlem kullanarak çeviri işlemlerini işleme
        const translatePromises = movies.map(async (movie) => {
            try {
                const response = await axios.post('https://rapid-translate-multi-traduction.p.rapidapi.com/t', {
                    from: 'en',
                    to: req.body.language,
                    q: movie.name
                }, {
                    headers: {
                        'content-type': 'application/json',
                        'X-RapidAPI-Key': '090799eccbmsh1bf639a0223c926p177597jsnd0c6a9ec8a4f',
                        'X-RapidAPI-Host': 'rapid-translate-multi-traduction.p.rapidapi.com'
                    }
                });

                // Çeviri bilgisini movie nesnesine ekleyin
                return {
                    ...movie.toObject(),
                    translate: response.data
                };
            } catch (error) {
                console.error("Çeviri hatası:", error);
                return movie;
            }
        });

        const translatedMovies = await Promise.all(translatePromises);
        res.json({ movies: translatedMovies });
    } catch (error) {
        console.error("Bir hata oluştu:", error);
        res.status(500).json({ error: "Bir hata oluştu. Detaylar için konsolu kontrol edin." });
    }
});


router.post("/search-movie-single",requireLogin,(req, res) => {
   

    Movie.find({
        $or:[
            

        {name: new RegExp(" "+ req.body.text + " ", "i"),},

        {name: new RegExp(" "+ req.body.text+"\\.", "i"),},
        {name: new RegExp(" "+ req.body.text+"\\,", "i"),},





        ]
    })
        .select("_id number name tr movie")
        .limit(1)
        .then((posts) => {

            res.json({ posts });
            console.log(posts)

        })
        .catch((err) => {
            console.log(err);
        });
});



router.get('/allmovie-free1453',(req,res)=>{
    console.log("çalıştı")
    Movie.aggregate([
        {$match: {}},
        {$sample: {size: 500}}
    ], ).then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})





const customLimit = (concurrency) => {
    let running = 0;
    const queue = [];

    const runNext = async () => {
        if (running < concurrency && queue.length > 0) {
            const { fn, resolve } = queue.shift();
            running++;
            try {
                const result = await fn();
                resolve(result);
            } catch (error) {
                resolve(Promise.reject(error));
            } finally {
                running--;
                runNext();
            }
        }
    };

    return (fn) => {
        return new Promise((resolve, reject) => {
            queue.push({ fn, resolve });
            runNext();
        });
    };
};

const limit = customLimit(5); // İşlem sınırı: 5

router.post("/search-movie-translate", async (req, res) => {
    try {
        const movies = await Movie.find({
            $or: [
                { name: new RegExp(" " + req.body.text + " ", "i") },
                { name: new RegExp(" " + req.body.text + "\\.", "i") },
                { name: new RegExp(" " + req.body.text + "\\,", "i") }
            ]
        }).limit(5);

        const translatePromises = movies.map(movie => limit(async () => {
            try {
                const response = await axios.post('https://rapid-translate-multi-traduction.p.rapidapi.com/t', {
                    from: 'en',
                    to: 'tr',
                    q: movie.name
                }, {
                    headers: {
                        'content-type': 'application/json',
                        'X-RapidAPI-Key': '090799eccbmsh1bf639a0223c926p177597jsnd0c6a9ec8a4f',
                        'X-RapidAPI-Host': 'rapid-translate-multi-traduction.p.rapidapi.com'
                    }
                });
                console.log(response.data);
                return {
                    ...movie.toObject(),
                    translate: response.data
                };
            } catch (error) {
                console.error("Çeviri hatası:", error);
                return movie;
            }
        }));

        const translatedMovies = await Promise.all(translatePromises);
        res.json({ movies: translatedMovies });
    } catch (error) {
        console.error("Bir hata oluştu:", error);
        res.status(500).json({ error: "Bir hata oluştu. Detaylar için konsolu kontrol edin." });
    }
});


router.post("/search-movie-free1453",(req, res) => {
   console.log(req.body.page)
   console.log(req.body.text)

   const page = req.body.page
   

    Movie.find({
        $or:[
            

        {name: new RegExp(" "+ req.body.text + " ", "i"),},

        {name: new RegExp(" "+ req.body.text+"\\.", "i"),},
        {name: new RegExp(" "+ req.body.text+"\\,", "i"),},





        ]
    })
        .select("_id number name tr movie")
        .limit(5)
        .skip(page*5)
        .then((posts) => {
            console.log(posts)
            res.json({ posts });

        })
        .catch((err) => {
            console.log(err);
        });
});

router.post("/search-movie-single-free1453",(req, res) => {
   

    Movie.find({
        $or:[
            

        {name: new RegExp(" "+ req.body.text + " ", "i"),},

        {name: new RegExp(" "+ req.body.text+"\\.", "i"),},
        {name: new RegExp(" "+ req.body.text+"\\,", "i"),},





        ]
    })
        .select("_id number name tr movie")
        .limit(1)
        .then((posts) => {
            res.json({ posts });
            console.log(posts)

        })
        .catch((err) => {
            console.log(err);
        });
});




/* router.get("/allmovie", (req, res) => {
    const page = 1;
    Movie.aggregate([
        {
            $group: {
                _id: "$_id",
                name: { $push: "$name" },
                number: { $push: "$number" },

                tr: { $push: "$tr" },
            },
        },
        {
            $project: {
                _id: "$_id",
                name: 1,
                tr: 1,
                number: 1,
            },
        },
        { $skip: (page - 1) * 5 },
        { $limit: 50 },
    ], { "allowDiskUse" : true })
        .then((posts) => {
            res.json({posts})
        })
        .catch((err) => {
            console.log(err);
        });
}); */




/* router.post('/createpost',requireLogin,(req,res)=>{
    const {title,body}= req.body
    if(!title || !body){
        res.status(422).json({error:"Please add all the fields"})
    }
    console.log(req.user)
    

    const post = new Post({
        title,
        body,
        postedBy:req.user
    })
    post.save().then(result=>{
        res.json({post:result})
    }).catch(err=>{
        console.log(err)
    })
})

router.get('/myposts',requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("postedBy","_id name")
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
}) */

router.post('/word-translate', async (req, res) => {
    const language = req.body.language;
    console.log(language)
    console.log(req.body);
    let translateData;
   
            try {
                const response = await axios.post('https://rapid-translate-multi-traduction.p.rapidapi.com/t', {
                    from: 'en',
                    to: language,
                    q: req.body.text
                }, {
                    headers: {
                        'content-type': 'application/json',
                        'X-RapidAPI-Key': '090799eccbmsh1bf639a0223c926p177597jsnd0c6a9ec8a4f',
                        'X-RapidAPI-Host': 'rapid-translate-multi-traduction.p.rapidapi.com'
                                                               }
                });
                translateData = response.data;
            } catch (error) {
                console.error("Çeviri hatası:", error);
            }
       


        res.json({ translateData });
    
});


router.get('/allmovie-free1453-translate', async (req, res) => {
    const language = req.query.language;
    console.log(language)
    console.log(req.body);

    try {
        const posts = await Movie.aggregate([
            { $match: {} },
            { $sample: { size: 10 } }
        ]);

        const translatePromises = posts.map(async (post) => {
            try {
                const response = await axios.post('https://rapid-translate-multi-traduction.p.rapidapi.com/t', {
                    from: 'en',
                    to: language,
                    q: post.name
                }, {
                    headers: {
                        'content-type': 'application/json',
                        'X-RapidAPI-Key': '090799eccbmsh1bf639a0223c926p177597jsnd0c6a9ec8a4f',
                        'X-RapidAPI-Host': 'rapid-translate-multi-traduction.p.rapidapi.com'
                                                               }
                });
                post.translate = response.data;
            } catch (error) {
                console.error("Çeviri hatası:", error);
            }
        });

        await Promise.all(translatePromises);

        res.json({ posts });
    } catch (error) {
        console.error("Bir hata oluştu:", error);
        res.status(500).json({ error: "Bir hata oluştu. Detaylar için konsolu kontrol edin." });
    }
});


module.exports = router