export const config = {
  api: {
    url: 'http://localhost:3000/api/v1'
  },
  apiOpenId: {
    host: 'http://localhost:3009/api/v1',
    clientId: "50cec0ed-5ebb-4e9d-8e77-977266cc699a",
    state: "273100"
  },
  paypal: {
    secretKey: null, 
    // 'AWZwLEblfpTJalyHTQ5S473vZw0KNR0K4O832LvBAP8Ocm5Abldym3peIQ0nNuIp_Vo6AjirNlde2214'
  },
  firebaseConfig: {
    apiKey: "AIzaSyCay2FAJV41Uk_5WASaKMnrwwMfegGUzZ8",
    authDomain: "cdio-shopping-cart.firebaseapp.com",
    databaseURL: "https://cdio-shopping-cart.firebaseio.com",
    projectId: "cdio-shopping-cart",
    storageBucket: "cdio-shopping-cart.appspot.com",
    messagingSenderId: "705348926066",
    appId: "1:705348926066:web:dc47151a3e3686ef6ea0eb",
    measurementId: "G-YFCSPDK9XD"
  }
}