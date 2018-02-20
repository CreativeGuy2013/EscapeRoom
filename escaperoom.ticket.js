//Made by Luca Casonato (c) 2018
//Do not distribute or re-distribute without explict personal consent or licence.

var configg = {
    apiKey: "AIzaSyCLH4KaHb5Ygz1MVGkWX3cG3vJg7fKkjos",
    authDomain: "escaperoom-olympus.firebaseapp.com",
    databaseURL: "https://escaperoom-olympus.firebaseio.com",
    projectId: "escaperoom-olympus",
    storageBucket: "escaperoom-olympus.appspot.com",
    messagingSenderId: "974975529205"
};

var escaperoom = {
    number: "",
    initializeFirebase: function (config) {
        if (config instanceof Object) {
            firebase.initializeApp(config);
            escaperoom.db = firebase.firestore();
        } else {
            throw Error("Expecting value of type 'object' at position '1'"); 
        }
    },
    chooseTime: function (day, slot) {
        user = document.getElementById("oc_nummer").value
        escaperoom.db.collection("tickets").doc("dates").get().then(function(doc) {
            data = doc.data()
            data.tickets[user] = {
                day: day,
                slot: slot
            }
            escaperoom.db.collection("tickets").doc("dates").set(data)
            escaperoom.db.collection("tickets").doc("waiting_for_signature").get().then(function(doc) {
                data2 = doc.data()
                data2.waiting[data2.waiting.length] = user
                escaperoom.db.collection("tickets").doc("waiting_for_signature").set(data2)
            })
        })
    }
}

escaperoom.initializeFirebase(configg)
