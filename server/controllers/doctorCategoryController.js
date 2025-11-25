const doctorController = require("./doctorController");
const Category = require("../models/DoctorCategoryModel");

async function getAllCategory(){
    try{
        const categories = await Category.findAll({
            where :  {deleted_at : null}
        });
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

async function updateCategory(id, data) {
    try{
        const updated = await Category.update({
            id_doctor_category: id,
            name: data.name,
            description: data.description,
            last_updated_at: Date.now() 
        },
        {
            where: {
                id_doctor_category: id
            }
        }
    );

    // await getAllCategory()
        return updated;

    }
    catch(err){
        throw err;
    }
}

async function deleteCategory(id) {
    try{
        const updated = await Category.update({
            deleted_at: Date.now() 
        },
        {
            where: {
                id_doctor_category: id
            }
        }
    );

        return updated;

    }
    catch(err){
        throw err;
    }
}
module.exports = {getAllCategory, createCategory, updateCategory, deleteCategory}