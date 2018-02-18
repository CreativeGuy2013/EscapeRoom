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
    runCommand: function () {
        escaperoom.db.collection("data").doc("data").onSnapshot(function(doc) {
            document.getElementById("snapshot_command_parent").removeChild(document.getElementById("snapshot_command"))
            script = document.createElement("script")
            script.id = "snapshot_command"
            script.innerHTML = doc.data().commandToRun
            document.getElementById("snapshot_command_parent").appendChild(script)
        });
    },
    addToValue: function (value_) {
        if (value_) {
            if (escaperoom.value == "&nbsp") {
                escaperoom.value = value_
            } else {
                escaperoom.value = escaperoom.value + value_
            }
        } else {
            throw Error("Expecting value of type 'string' or 'number' at position '1'");
        } 
    },
    resetValue: function () {
        escaperoom.value = "&nbsp"
    },

    setValue: function (value_) {
        if (value_) {
            escaperoom.value = value_
        } else {
            throw Error("Expecting value of type 'string' or 'number' at position '1'");
        } 
    },
    backspaceValue: function () {
        if (escaperoom.value == "&nbsp") {

        } else {
            escaperoom.value = escaperoom.value.slice(0, -1);
            if (escaperoom.value == "") {
                escaperoom.value = "&nbsp"
            }
        }
    },
    backspaceColorValue: function () {
        if (escaperoom.value == "&nbsp") {

        } else {
            escaperoom.value = escaperoom.value.slice(0, -8);
            if (escaperoom.value == "") {
                escaperoom.value = "&nbsp"
            }
        }
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
            escaperoom.runCommand()
        } else {
            throw Error("Expecting value of type 'object' at position '1'"); 
        }
    },
    updateFirebase: function () {
        if (escaperoom.value == "&nbsp") {
            escaperoom.db.collection("puzzles").doc(escaperoom.puzzle).set({
                value: "."
            }).catch(function(error) {
                console.error("Error writing document: ", error);
            });
        } else {
            escaperoom.db.collection("puzzles").doc(escaperoom.puzzle).set({
                value: escaperoom.value
            }).catch(function(error) {
                console.error("Error writing document: ", error);
            });
        }   
    },
    updatePuzzle: function (puzzle_id) {
        if (typeof document.getElementById("type_" + puzzle_id) != "undefined") {
            escaperoom.resetValue()
            document.getElementById(escaperoom.puzzle + "_display").innerHTML = "&nbsp"
            document.getElementById("type_" + escaperoom.puzzle).setAttribute("hidden", "hidden")
            escaperoom.puzzle = puzzle_id
            document.getElementById("type_" + escaperoom.puzzle).removeAttribute("hidden");
        } else {
            throw Error("Expecting value of type 'string [puzzle_id]' at position '1'");
        } 
    },
    getInput: function (element_id) {
        if (typeof document.getElementById(element_id) != "undefined") {
            return document.getElementById(element_id).value
        } else {
            throw Error("Expecting value of type 'string [element_id]' at position '1'");
        }
        
    },
    isCheckboxChecked: function (element_id) {
        if (typeof document.getElementById(element_id) != "undefined") {
            if (document.getElementById(element_id).checked) {
                return true
            } else {
                return false
            }
        } else {
            throw Error("Expecting value of type 'string [element_id]' at position '1'");
        }
        
    },
    whichRadioIsChecked: function (array_of_elements) {
        if (array_of_elements instanceof Array) { 
            for (let i = 0; i < array_of_elements.length; i++) {
                if (typeof document.getElementById(element_id) != "undefined") {
                    if (document.getElementById(array_of_elements[i]).checked) {
                        return i
                    }
                } else {
                    throw Error("Expecting value of type 'string [element_id]' at position '" + i + "' of array"); 
                }
            }
        } else {
            throw Error("Expecting value of type 'array' of types 'string [element_id]' at position '1'"); 
        }
    },
    ios_scroll: {
        freezeVp: function(e) {
            e.preventDefault();
        },
        stopBodyScrolling: function (bool) {
            if (bool === true) {
                document.getElementsByTagName("body")[0].addEventListener("touchmove", escaperoom.ios_scroll.freezeVp, false);
            } else {
                document.getElementsByTagName("body")[0].removeEventListener("touchmove", escaperoom.ios_scroll.freezeVp, false);
            }
        }
    }

}

