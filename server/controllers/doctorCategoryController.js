const doctorController = require("./doctorController");
const Category = require("../models/DoctorCategoryModel");

async function getAllCategory(){
    try{
        const categories = await Category.findAll();
        return categories;
    }
    catch(err){
        throw err;
    }

}


async function createCategory(data) {
    try{
        let id = "";
        const checkempty = await Category.findAndCountAll();
        console.log(checkempty);
        if(checkempty.count <= 0){
            id = "DC001";
        }
        else{
            
            const last = await Category.findOne({
                order: [["id_doctor_category", "DESC"]]
            });
                const newNum = parseInt(last.id_doctor_category.slice(2), 10) + 1;
                id = "DC" + String(newNum).padStart(3, '0');
                
            }
            const categorySame = await Category.findOne({
                where: {
                    name: data.name
                },
            });
            
            if(categorySame){
                return false;
            }
            else{
                const apt = await Category.create({
                id_doctor_category: id,
                name: data.name,
                description: data.description
            });
            return apt;

            }
            
            
            }
            
    
    catch(err){
        throw err;
    }
}

module.exports = {getAllCategory, createCategory}