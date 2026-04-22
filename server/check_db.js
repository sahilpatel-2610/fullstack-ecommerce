const mongoose = require('mongoose');
const { Category } = require('./models/category');

async function checkSubCats() {
    try {
        await mongoose.connect('mongodb://sahilpatel:sp7227@ac-xjrffxv-shard-00-00.nmynf5q.mongodb.net:27017,ac-xjrffxv-shard-00-01.nmynf5q.mongodb.net:27017,ac-xjrffxv-shard-00-02.nmynf5q.mongodb.net:27017/eShopDatabase?ssl=true&replicaSet=atlas-bjbkdu-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to DB");

        const mainCats = await Category.find({ $or: [{ parentId: { $exists: false } }, { parentId: "" }, { parentId: null }] });
        const mainCatIds = mainCats.map(cat => cat._id.toString());
        console.log("Main Categories found:", mainCatIds.length);
        console.log("Main Category IDs:", mainCatIds);

        const subCats = await Category.find({ parentId: { $exists: true, $ne: null, $ne: "" } });
        console.log("Total SubCats found with query:", subCats.length);

        let validSubCatCount = 0;
        let deletedOrphans = 0;
        for (const sub of subCats) {
            const parentExists = mainCatIds.includes(sub.parentId.toString());
            if (parentExists) {
                validSubCatCount++;
            } else {
                console.log(`Deleting Orphaned SubCat - ID: ${sub._id}, Name: ${sub.name}, ParentId: ${sub.parentId}`);
                await Category.findByIdAndDelete(sub._id);
                deletedOrphans++;
            }
        }
        console.log("Deleted Orphaned SubCategories:", deletedOrphans);
        console.log("Remaining Valid SubCategories:", validSubCatCount);

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkSubCats();
