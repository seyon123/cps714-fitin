import { getDocs } from "firebase/firestore";
import { db } from "../firebase";
import {
    query,
    collection,
    orderBy,
    startAfter,
    limit,
} from "firebase/firestore";

const docLimit = 5;

export const fetchFirstBatchPosts = async function () {
    try {
        const data = await getDocs(
            query(
                collection(db, `posts`),
                orderBy("timestamp", "desc"),
                limit(docLimit)
            )
        );
        let posts = [];
        let lastDoc;
        data.forEach((doc) => {
            posts.push({
                ...doc.data(),
                id: doc.id,
            });
        });
        lastDoc = data.docs[data.docs.length - 1];
        return { posts, lastDoc };
    } catch (e) {
        console.log(e);
    }
};

export const fetchNextBatchPosts = async (doc) => {
    try {
        const data = await getDocs(
            query(
                collection(db, `posts`),
                orderBy("timestamp", "desc"),
                startAfter(doc),
                limit(docLimit)
            )
        );
        let posts = [];
        let lastDoc;
        data.forEach((doc) => {
            posts.push({
                ...doc.data(),
                id: doc.id,
            });
        });
        lastDoc = data.docs[data.docs.length - 1];
        return { posts, lastDoc };
    } catch (e) {
        console.log(e);
    }
};
