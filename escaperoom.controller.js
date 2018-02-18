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

escaperoom = {
    value: "",
    puzzle: "nothing",
    setPuzzle: function (puzzle_id) {
        if (typeof document.getElementById("type_" + puzzle_id) != "undefined") {
            escaperoom.db.collection("data").doc("data").get().then(function(doc) {
                data = doc.data()
                data.commandToRun = "escaperoom.updatePuzzle('" + puzzle_id + "')"
                data.currentPuzzle = puzzle_id
                escaperoom.db.collection("data").doc("data").set(data).catch(function(error) {
                    console.error("Error writing document: ", error);
                });  
            }); 
        } else {
            throw Error("Expecting value of type 'string [puzzle_id]' at position '1'");
        } 
        
    },
    getPuzzle: function() {
        escaperoom.db.collection("data").doc("data").onSnapshot(function(doc) {
            document.getElementById("type_" + escaperoom.puzzle).removeAttribute("class")
            document.getElementById("type_" + escaperoom.puzzle).setAttribute("class", "types")
            escaperoom.puzzle = doc.data().currentPuzzle
            document.getElementById("type_" + escaperoom.puzzle).setAttribute("class", "types selected")
        });
    },
    resetValue: function () {

    },
    displayValue: function (element_id) {
        if (typeof document.getElementById(element_id) != "undefined") {
            document.getElementById(element_id).innerHTML = escaperoom.value
        } else {
            throw Error("Expecting value of type 'string [element_id]' at position '1'");
        } 
    },
    displayColor: function (element_id) {
        if (typeof document.getElementById(element_id) != "undefined") {
            color_array = escaperoom.value.split("|");
            color_final = "";
            if (color_array.length <= 1) {
                document.getElementById(element_id).innerHTML = "&nbsp"
            } else {
                for (let i = 0; i < color_array.length - 1; i++) {
                    if (/^#[0-9A-F]{6}$/i.test(color_array[i])) {
                        color_final += "<span style='color: " + color_array[i] + ";'>&#9673</span>&nbsp"
                    } else {
                        throw Error("Expecting variable 'escaperoom.value' to only contain 'hex-colors' seperated with '|' at place " + i);
                    }
                    
                    if (i == (color_array.length - 2)) {
                        document.getElementById(element_id).innerHTML = color_final
                    }
                }
            }
        } else {
            throw Error("Expecting value of type 'string [element_id]' at position '1'");
        } 
    },
    initializeFirebase: function (config) {
        if (config instanceof Object) {
            firebase.initializeApp(config);
            escaperoom.db = firebase.firestore();
            escaperoom.getPuzzle()
        } else {
            throw Error("Expecting value of type 'object' at position '1'"); 
        }
    }
}

escaperoom.initializeFirebase(configg)