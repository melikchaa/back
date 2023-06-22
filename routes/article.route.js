const express = require('express');
const router = express.Router();
const Article = require("../models/article")      

// créer un nouvelle catégorie
// créer un nouvel article
router.post('/', async (req, res) => {
    const nouvarticle = new Article(req.body)
    try {
    const response =await nouvarticle.save();
    const articles = await
    Article.findById(response._id).populate("scategorieID").exec();
    res.status(200).json(articles);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    
    });
// afficher la liste des categories.
router.get('/', async (req, res) => {
    try {
        const article = await Article.find({}, null, { sort: { '_id': -1 } })
        .populate("scategorieID").exec();

        res.status(200).json(article);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
/*
// chercher un article
router.get('/:articleId',async(req, res)=>{
    try {
    const art = await Article.findById(req.params.articleId);
    res.status(200).json(art);
    
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    });
    */
//afficher une categorie
router.get('/:articleId', async (req, res) => {
    try {
        const article = await Article.findById(req.params.articleId);

        res.status(200).json(article);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Supprimer une catégorie

router.delete('/:articleId', async (req, res)=> {
    try {
        const id = req.params.articleId;
        await Article.findByIdAndDelete(id);
        res.json({ message: "article deleted successfully." });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})
// modifier une catégorie
router.put('/:articleId', async (req, res)=> {
    try {
    const article = await Article.findByIdAndUpdate(
    req.params.articleId,
    { $set: req.body },
    { new: true }
    );
    const articles = await
Article.findById(article._id).populate("scategorieID").exec();
    res.status(200).json(articles);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    });

    // chercher un article par s/cat
   /* router.get('/scat/:scategorieID',async(req, res)=>{
        try {
        const art = await Article.find({ scategorieID:
        req.params.scategorieID}).exec();
        res.status(200).json(art);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }
        });
*/
    router.get('/scat/:scategorieID',async(req, res)=>{
        try {
        const art = await Article.find({ scategorieID:
        req.params.scategorieID}).exec();
        res.status(200).json(art);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }
        });
        //testtttttt
    



module.exports = router;