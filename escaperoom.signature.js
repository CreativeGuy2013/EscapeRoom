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
    checkForSignatures: function () {
        escaperoom.db.collection("tickets").doc("waiting_for_signature").onSnapshot(function(doc) {
            data = doc.data()
            if (data.waiting[0] != undefined) {
                document.getElementById("signature-pad").setAttribute("class", "signature-pad")
                document.getElementById("wait").setAttribute("class", "hidden")
                document.getElementById("wait").setAttribute("hidden", "hidden")
                document.getElementById("signature-pad").removeAttribute("hidden")
                document.getElementById("nummer").innerHTML = data.waiting[0]
                escaperoom.number = data.waiting[0]
            } else {
                document.getElementById("signature-pad").setAttribute("class", "signature-pad hidden")
                document.getElementById("wait").setAttribute("class", "")
                document.getElementById("wait").removeAttribute("hidden")
                document.getElementById("signature-pad").setAttribute("hidden", "hidden")
                document.getElementById("nummer").innerHTML ="000000"
                escaperoom.number = ""
            }
        })
    },
    saveUserSignature: function (number, imgstring) {
        escaperoom.db.collection("tickets").doc("tickets").get().then(function(doc) {
            data = doc.data()
            data.tickets[number] = imgstring
            escaperoom.db.collection("tickets").doc("tickets").set(data)
            escaperoom.db.collection("tickets").doc("waiting_for_signature").get().then(function(doc) {
                data2 = doc.data()
                data2.waiting.shift()
                escaperoom.db.collection("tickets").doc("waiting_for_signature").set(data2)
            })
        })
    }
}

escaperoom.initializeFirebase(configg)
escaperoom.checkForSignatures()
