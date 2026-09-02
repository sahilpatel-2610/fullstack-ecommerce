// Mirrors MongoDB product create/update/delete into Firestore's `products`
// collection, using the SAME MongoDB _id as the Firestore document ID.
// This is what makes products created in the Admin Panel show up in the
// Android app (which reads live from Firestore via FirebaseSyncManager.kt).

const { getFirestoreDb } = require('../config/firebaseAdmin');

/**
 * Converts a Mongoose product document into the flat shape the Android app
 * expects (see FirebaseSyncManager.kt -> parseProductDocument).
 */
function toFirestoreProduct(product) {
    const firstImage = Array.isArray(product.images) && product.images.length > 0
        ? product.images[0]
        : '';

    return {
        name: product.name || '',
        description: product.description || '',
        price: product.price || 0,
        originalPrice: product.oldPrice || 0,
        category: product.catName || '',
        image: firstImage,
        images: Array.isArray(product.images) ? product.images : [],
        rating: product.rating || 0,
        stock: product.countInStock || 0,
        isFeatured: !!product.isFeatured,
        // Mongo schema has no isPopular/isNew fields, default both true so the
        // product shows up in the Home screen's Popular/New sections.
        isPopular: true,
        isNew: true,
        brand: product.brand || '',
        updatedAt: new Date().toISOString(),
    };
}

/**
 * Create or overwrite the Firestore doc for this product.
 * Call this after a successful Mongo create OR update.
 */
async function syncProductToFirestore(product) {
    const db = getFirestoreDb();
    if (!db) return; // Firebase Admin not configured — skip silently, Mongo save already succeeded

    try {
        const id = (product._id || product.id).toString();
        await db.collection('products').doc(id).set(toFirestoreProduct(product), { merge: true });
        console.log(`Firestore sync OK for product ${id}`);
    } catch (err) {
        // Never let a Firestore sync failure break the admin panel's request —
        // MongoDB is still the source of truth for the admin panel itself.
        console.error('Firestore product sync failed:', err.message);
    }
}

/**
 * Delete the matching Firestore doc when a product is deleted from MongoDB.
 */
async function deleteProductFromFirestore(productId) {
    const db = getFirestoreDb();
    if (!db) return;

    try {
        await db.collection('products').doc(productId.toString()).delete();
        console.log(`Firestore delete OK for product ${productId}`);
    } catch (err) {
        console.error('Firestore product delete failed:', err.message);
    }
}

module.exports = { syncProductToFirestore, deleteProductFromFirestore };
