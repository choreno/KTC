let db = firebase.firestore();
let membersRef = db.collection("members");

let i = 0;

$(document).ready(function () {

    //LoadData();


    var rData = {};
    membersRef.where("fName", "==", "Changburm")
        .get()
        .then(function (data) {

            //rData = data;
            data.forEach(function (doc) {
                //console.log(doc.data())
                rData = doc.data();
                i++;
                afterLoad(rData);

            })


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

function afterLoad(data) {
    let NumberOfWin = 0;
    console.log(data["2018"].Apr);
    
    for (let i = 0; i < 1; i++) {
        let temp = data["2018"].Apr["4/17/2018"].results
            .filter(function (x) {
                return x == "NA"
            }).length;
        
            console.log(temp)
    }




}


function LoadData() {
    membersRef.get()
        .then(function (x) {
            x.forEach(function (doc) {
                console.log(doc.data());
            })

        });

}