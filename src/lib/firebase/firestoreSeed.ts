import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { readFileSync } from "fs";
import { events, users } from "../data/sampleData";

const serviceAccount = JSON.parse(
  readFileSync("./src/lib/firebase/admin-creds.json", "utf8")
);

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();
const auth = getAuth();

async function seedAuthUsers() {
  for (const user of users) {
    try {
      const createdUser = await auth.createUser({
        uid: user.uid,
        email: user.email,
        password: "Pa$$w0rd",
        displayName: user.displayName,
        photoURL: user.photoURL,
      });

      console.log(`Successfully created user: ${createdUser.uid}`);

      await db.collection("profiles").doc(createdUser.uid).set({
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
        createdAt: Timestamp.now(),
      });
    } catch (error) {
      console.error(`Error creating user ${user.displayName}:`, error);
    }
  }
}

async function seedEvents() {
  const batch = db.batch();
  events.forEach((event) => {
    const eventRef = db.collection("events").doc(event.id);
    batch.set(eventRef, {
      ...event,
      date: Timestamp.fromDate(new Date(event.date)),
      createdAt: Timestamp.now(),
    });
  });
  batch.commit();
  console.log("Events seeded successfully");
}

(async () => {
  await seedAuthUsers();
  await seedEvents();
  console.log("Seeding completed");
})();
