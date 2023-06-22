const mongoose =require("mongoose")
const categorie=require("./categorie.js")

const scategorieSchema=mongoose.Schema({
nomscategorie:{ type: String, required: true,unique:true },
imagescat :{ type: String, required: false },
categorieID:{type:mongoose.Schema.Types.ObjectId,
    ref:categorie}
})
module.exports=mongoose.model('scategorie',scategorieSchema)