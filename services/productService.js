// CHECK NAMES/PARAMETERS

const Shoe = require('../models/Shoe');

async function getAll(query){
    let shoes = await Shoe.find({}).lean(); 


    // if(query.search){
    //     shoes = shoes.filter(x => x.name.toLowerCase().includes(query.search))
    // }
    // if(query.from){
    //     shoes = shoes.filter(x => Number(x.level) >= query.from);
    // }
    // if(query.to){
    //     shoes = shoes.filter(x => Number(x.level) <= query.to);
    // }
    return shoes;
}
async function getOne(id){
    return Shoe.findById(id).lean();
}
 
function createProduct(data){
    let shoe = new Shoe({...data}); 
    return shoe.save()
}
function updateOne(productId, productData){
    return Shoe.updateOne({_id: productId}, productData)
 }
function deleteOne(productId){
    return Shoe.deleteOne({_id: productId})
}
module.exports = {
    getAll,
    getOne,
    createProduct,
    updateOne,
    deleteOne
}