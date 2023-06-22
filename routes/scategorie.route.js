const express = require('express');
const router = express.Router();
const Scategorie = require("../models/scategorie")   

// créer un nouvelle catégorie
router.post('/', async (req, res) => {
    const { nomscategorie, imagescat,categorieID } = req.body;
    const newScategorie = new Scategorie({
        nomscategorie: nomscategorie,
        imagescat: imagescat,
        categorieID:categorieID
    })
    //const newcat=new categorie(req.body)
    try {
        await newScategorie.save();
        res.status(200).json(newScategorie);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
// afficher la liste des categories.
router.get('/', async (req, res) => {
    try {
        const scat = await Scategorie.find({}, null, { sort: { '_id': -1 } })

        res.status(200).json(scat);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
//afficher une scategorie
router.get('/:scategorieId', async (req, res) => {
    try {
        const scat = await Scategorie.findById(req.params.scategorieId);

        res.status(200).json(scat);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Supprimer une scatégorie

router.delete('/:scategorieId', async (req, res)=> {
    try {
        const id = req.params.scategorieId;
        await Scategorie.findByIdAndDelete(id);
        res.json({ message: "categorie deleted successfully." });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})
// modifier une scatégorie
router.put('/:scategorieId', async (req, res)=> {
    try {
    const cat1 = await Scategorie.findByIdAndUpdate(
    req.params.scategorieId,
    { $set: req.body },
    { new: true }
    );
    res.status(200).json(cat1);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    });

    router.get('/cat/:categorieID',async(req, res)=>{
        try {
        const scat = await Scategorie.find({ categorieID:
        req.params.categorieID}).exec();
        res.status(200).json(scat);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }
        });
    



module.exports = router;