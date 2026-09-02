// Firebase Admin SDK initialization.
// This lets the Node/Express server write to the SAME Firestore database
// that the Android app reads from (via FirebaseSyncManager.kt), so products
// created/edited/deleted from the Admin Panel show up in the app automatically.
//
// SETUP (one-time):
// 1. Go to Firebase Console -> Project Settings (gear icon) -> Service Accounts tab
// 2. Click "Generate new private key" -> downloads a JSON file
// 3. Rename it to `serviceAccountKey.json` and place it in this `server` folder
//    (same folder as app.js). It is already added to .gitignore so it won't
//    accidentally get committed/pushed anywhere public.
// 4. On your hosting provider (Render, etc.), instead of uploading the file,
//    set an environment variable FIREBASE_SERVICE_ACCOUNT containing the
//    ENTIRE JSON file content as a single-line string. This file already
//    supports both approaches automatically.

const admin = require('firebase-admin');

let firestoreDb = null;

function initFirebaseAdmin() {
    if (admin.apps.length > 0) {
        firestoreDb = admin.firestore();
        return firestoreDb;
    }

    try {
        let credential;

        if (process.env.FIREBASE_SERVICE_ACCOUNT) {
            // Production (Render, etc.): JSON stored as an env variable string
            const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
            credential = admin.credential.cert(serviceAccount);
        } else {
            // Local development: JSON file sitting next to app.js
            const serviceAccount = require('../serviceAccountKey.json');
            credential = admin.credential.cert(serviceAccount);
        }

        admin.initializeApp({ credential });
        firestoreDb = admin.firestore();
        console.log('Firebase Admin initialized — product changes will sync to Firestore.');
    } catch (err) {
        console.warn(
            'Firebase Admin NOT initialized (serviceAccountKey.json missing or invalid). ' +
            'Products will save to MongoDB only and will NOT sync to the Android app until this is fixed. ' +
            'Error: ' + err.message
        );
        firestoreDb = null;
    }

    return firestoreDb;
}

// Initialize once when this module is first required
initFirebaseAdmin();

module.exports = { getFirestoreDb: () => firestoreDb };
