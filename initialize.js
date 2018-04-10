let db = firebase.firestore();
let membersRef = db.collection("members");
let dateOptions = {};

let allMembers = GetAllMembers();

let shortMonthName = new Intl.DateTimeFormat('en-US', {
    month: 'short'
}).format;

const startYear = '2018';

AddInitialMembers();
//LoadData();
AddMatchData();

let currentYear = startYear;
let currentMonth = new Date().getMonth() + 1;

//console.log(currentMonth);



function AddMatchData() {

    for (let i = 0; i < allMembers.length; i++) {


        let id = `${allMembers[i].lName} ${allMembers[i].fName}`;

        console.log(id);

        //until current month

        for (let month = 1; month < 2; month++) {

            //Get current month's Tuesdays
            let tuesdays = getTuesdays(2018, month);

            console.log(tuesdays);

            let matchData = {

                [2018]: {
                    [shortMonthName(tuesdays[i])]: {
                        [`${new Intl.DateTimeFormat('en-US').format(tuesdays[i])}`]: {
                            attendence: "NA",
                            results: ["NA", "NA", "NA"]
                        }
                    }
                }


            }

            membersRef.doc(id).update(matchData);


        }

    }



}


// for (let i = 0; i < tuesdays.length; i++) {

//     // let data = {

//     //     [tuesdays[i].getFullYear()]: {
//     //         [shortMonthName(tuesdays[i])]: {
//     //             [`${new Intl.DateTimeFormat('en-US').format(tuesdays[i])}`]: {
//     //                 attendence: "NA",
//     //                 results: ["NA", "NA", "NA"]
//     //             }
//     //         }
//     //     }
//     // };


//     membersRef.doc("CHO Changburm").set({

//         [tuesdays[i].getFullYear()]: {
//             [shortMonthName(tuesdays[i])]: {
//                 [`${new Intl.DateTimeFormat('en-US').format(tuesdays[i])}`]: {
//                     attendence: "NA",
//                     results: ["NA", "NA", "NA"]
//                 }
//             }
//         }

//     }, {
//         merge: true
//     });

// }

//let dttm = getTuesdays();



function LoadData() {
    membersRef.get()
        .then(function (x) {
            x.forEach(function (doc) {
                console.log(doc.data());
            })

        });

}



function getTuesdays(targetYear, targetMonth) {


    let d = new Date(targetYear, targetMonth - 1, 1),
        month = d.getMonth(),
        tuesDays = [];

    d.setDate(1);

    //Get the 1st tuesday in the month
    while (d.getDay() !== 2) {
        d.setDate(d.getDate() + 1);
    }

    //console.log(d);

    //Get all other Tuesdays in the month
    while (d.getMonth() === month) {

        tuesDays.push(new Date(d.getTime()));
        d.setDate(d.getDate() + 7);
    }

    //console.log(tuesDays);


    // for (let i = 0; i < tuesDays.length; i++) {
    //     console.log(`${shortMonthName(tuesDays[i])}_WK${i+1}`);
    // }

    return tuesDays;

}



function AddInitialMembers() {

    let members = GetAllMembers();

    for (let i = 0; i < members.length; i++) {

        //adding a member to fireStore DB
        let id = `${members[i].lName} ${members[i].fName}`;

        membersRef.doc(id).set(members[i]);
    }

}


function GetAllMembers() {

    let members = [{
            fName: "Youngjae",
            lName: "KO",
            kName: "고용재",
            email: "",
            phone: "",

        },
        {
            fName: "Taekyung",
            lName: "KWON",
            kName: "권태경",
            email: "",
            phone: "",
        },
        {
            fName: "Hyukjae",
            lName: "KWON",
            kName: "권혁제",
            email: "",
            phone: "",
        },
        {
            fName: "Hyojung",
            lName: "KIM",
            kName: "김효중",
            email: "",
            phone: "",
        },
        {
            fName: "Yoonseok",
            lName: "PARK",
            kName: "박윤석",
            email: "",
            phone: "",
        },
        {
            fName: "Heesung",
            lName: "BAE",
            kName: "배희성",
            email: "",
            phone: "",
        },
        {
            fName: "Dongwook",
            lName: "BAEK",
            kName: "백동욱",
            email: "",
            phone: "",
        },
        {
            fName: "Hojun",
            lName: "SUNG",
            kName: "성호준",
            email: "",
            phone: "",
        },
        {
            fName: "Sanghun",
            lName: "SHIN",
            kName: "신상헌",
            email: "",
            phone: "",
        },
        {
            fName: "Chihong",
            lName: "YOON",
            kName: "윤치홍",
            email: "",
            phone: "",
        },
        {
            fName: "Junsung",
            lName: "LEE",
            kName: "이준성",
            email: "",
            phone: "",
        },
        {
            fName: "Changburm",
            lName: "CHO",
            kName: "조창범",
            email: "",
            phone: "",
        },
    ]

    return members;
}