import * as functions from "firebase-functions";

import * as admin from "firebase-admin";
admin.initializeApp();


// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript


exports.scheduledFunctionCrontab = functions.pubsub.schedule("0 0 * * *")
  .timeZone("Europe/London")
  .onRun((context) => {
    const db = admin.firestore();

    db.collection("prets").listDocuments()
      .then((docs) => docs.map((document) => document.id))
      .then((docs) => {
        docs.forEach((docid) => {
          functions.logger.info(docid);

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          db.collection("prets").doc(docid).update({
            numPrets: 0,
          });
        });
      });
    return null;
  });

