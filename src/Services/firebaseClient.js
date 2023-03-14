import firebase from "firebase/compat/app";
import { getAuth, onAuthStateChanged } from "firebase/compat/auth";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  serverTimestamp,
  addDoc,
  setDoc,
} from "firebase/firestore";
import {
  getDatabase,
  ref,
  query as DbQuery,
  limitToLast,
  orderByChild,
} from "firebase/database";
const FIREBASE_CONFIG = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messageSender: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};

export function config() {
  let app;
  if (!firebase.apps.length) {
    app = firebase.initializeApp(FIREBASE_CONFIG);
    // console.log("--- Firebase --- Config --- Done --- ");
  }
  const auth = firebase.auth();
  const db = getFirestore(app);
  const dbrt = getDatabase(app);
  return { auth, db, dbrt };
}
const temp = {
  auth: {
    async login({ email, password }) {
      const { auth } = config();
      return await auth.signInWithEmailAndPassword(email, password);
    },
    async logout() {
      const { auth } = config();
      return await auth.signOut();
    },
    async register({ email, password }) {
      try {
        const { auth } = config();
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        // console.log(user)
        const currentToken = user.auth.currentUser.accessToken;
        await auth.currentUser.sendEmailVerification();
        return currentToken;
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    isInitialized() {
      const { auth } = config();
      return new Promise((resolve) => {
        auth.onAuthStateChanged(resolve);
      });
    },

    isLoggedIN() {
      const { auth } = config();
      if (auth.currentUser) {
        // console.log("current User email", auth.currentUser.email);
        return true;
      } else {
        return false;
      }
    },

    async deleteAccount() {
      const { auth } = config();
      if (auth.currentUser) {
        await auth.currentUser.delete();
        return true;
      } else {
        return false;
      }
    },

    getProfile() {
      const { auth } = config();
      if (auth.currentUser) {
        return {
          name: auth.currentUser.displayName,
          email: auth.currentUser.email,
          verified: auth.currentUser.emailVerified,
        };
      } else {
        return {
          name: null,
          email: null,
        };
      }
    },
    async sendVerification() {
      const { auth } = config();
      try {
        if (auth.currentUser) {
          await auth.currentUser.sendEmailVerification();
          return true;
        } else {
          throw "";
        }
      } catch (error) {
        return false;
      }
    },
  },
  database: {
    async readAllDataLimitby(tableName, limit) {
      const { db } = config();
      try {
        const collectionTable = collection(db, tableName);
        const collectionSnapshot = await getDocs(collectionTable);
        const dataList = collectionSnapshot.docs.map((doc) => doc.data());
        return dataList;
      } catch (error) {
        console.log(error);
      }
    },
    async readAllData(tableName) {
      const { db } = config();
      try {
        const collectionTable = collection(db, tableName);
        const collectionSnapshot = await getDocs(collectionTable);
        const dataList = collectionSnapshot.docs.map((doc) => doc.data());
        return dataList;
      } catch (error) {
        console.log(error);
      }
    },
    async getUserData(email) {
      const { db } = config();

      try {
        const q = query(collection(db, "users"), where("email", "==", email));
        const userDataArray = await getDocs(q);
        if (!userDataArray.empty) {
          const snapshot = userDataArray.docs[0];
          const userData = { ...snapshot.data(), id: snapshot.id };
          return userData;
        } else {
          // console.log("User wdoc.data()ith this email not found");
          throw new Error("User with this Email not Fount");
          return null;
        }
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async readAllDataWhere(tableName, key, val) {
      const { db } = config();
      try {
        const QueryData = query(
          collection(db, tableName),
          where(key, "==", val)
        );
        const querySnapshot = await getDocs(QueryData);
        let data = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          data.push(doc.data());
        });
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async readData(tableName, key, val) {
      const { db } = config();
      try {
        const QueryData = query(
          collection(db, tableName),
          where(key, "==", val)
        );
        const querySnapshot = await getDocs(QueryData);
        let data;
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          data = doc.data();
        });
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async searchData(tableName, val) {
      const { db } = config();

      // console.log("value === ", val);
      try {
        const QueryData = query(
          collection(db, tableName),
          where("cuisine", "array-contains-any", val.cusisineData)
          // where("filters.freeWifi", "==", true)
        );

        const querySnapshot = await getDocs(QueryData);
        let data = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          data.push(doc.data());
        });
        // console.log(
        //   "data iuytrfd =====================================================",
        //   data
        // );
        return data;
      } catch (error) {
        console.log(
          "Search ============================= Error ++++++++++++++++++++++++++++",
          error
        );
      }
    },
    async writeData(tableName, val) {
      const { db } = config();
      try {
        const docRef = await addDoc(collection(db, tableName), val);

        // console.log("Document written with ID: ", docRef.id);
        const updateDocRef = doc(db, tableName, docRef.id);
        let tempData = val;
        tempData.createdAt = serverTimestamp();
        tempData.id = docRef.id;
        // Update the timestamp field with the value from the server

        const updateTimestamp = await updateDoc(updateDocRef, tempData);
        return updateTimestamp;
      } catch (error) {
        console.log(error);
      }
    },
    async updateData(tableName, val, id) {
      const { db } = config();
      // console.log(val)
      try {
        const docRef = doc(db, tableName, id);
        let tempData = val;
        tempData.createdAt = serverTimestamp();
        // Update the timestamp field with the value from the server

        const updateTimestamp = await updateDoc(docRef, tempData);
        return updateTimestamp;
      } catch (error) {
        console.log(error);
      }
    },
    async getUserOrders(userId) {
      const { db } = config();
      try {
        const QueryData = query(
          collection(db, "restaurant_orders"),
          where("author.id", "==", userId)
        );
        const querySnapshot = await getDocs(QueryData);
        let data = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          data.push(doc.data());
        });
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async readProductData(tableName, productIDs) {
      const { db } = config();
      try {
        const QueryData = query(
          collection(db, tableName),
          where("id", "in", productIDs)
        );

        const querySnapshot = await getDocs(QueryData);
        let data = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          data.push(doc.data());
        });
        // console.log("data ============products===============", data);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async getProducts() {
      const { db } = config();
      try {
        const QueryData = query(collection(db, "restaurant_products"));
        const querySnapshot = await getDocs(QueryData);
        let data = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          data.push(doc.data());
        });
        data = data.map((item) => {
          item.label = item.name;
          return item;
        });

        // console.log("data ============products===============", data);
        return data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async getRestaurants() {
      const { db } = config();
      try {
        const QueryData = query(collection(db, "restaurants"));
        const querySnapshot = await getDocs(QueryData);
        let data = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          data.push(doc.data());
        });
        data = data.map((item) => {
          item.label = item.title;
          return item;
        });

        // console.log("data ============products===============", data);
        return data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  },
};
export default temp;
