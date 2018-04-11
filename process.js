let db = firebase.firestore();
let membersRef = db.collection("members");


$(document).ready(function () {

    //LoadData();
    var rData ; 
    membersRef.where("fName", "==", "Changburm")
        .get()
        .then(function (data) {
            rData = data;
            // data.forEach(function (doc) {
            //     console.log(doc.data())
            // })
        });

    rData.forEach(function(x){
        console.log(x.data());
    });


    // membersRef.doc("CHO Changburm").onSnapshot(function(doc){
    //     console.log(doc.data()["2018"].Apr);
    // });

    // membersRef.doc("CHO Changburm").onSnapshot(function(doc){
    //     console.log('att? ' + doc.data()["2018"].Apr["4/10/2018"].attendence);
    // });


    // membersRef.doc("CHO Changburm").onSnapshot(function(doc){
    //     // console.log(doc.data()["2018"].Apr);
    //     var temp = doc.data()["2018"].Apr;
    //     temp.forEach(function(week){
    //         console.log(week.data());
    //     })
    // });



});




function LoadData() {
    membersRef.get()
        .then(function (x) {
            x.forEach(function (doc) {
                console.log(doc.data());
            })

        });

}