let db = firebase.firestore();
let membersRef = db.collection("members");
let dateOptions = {};

let allMembers = GetAllMembers();

let shortMonthName = new Intl.DateTimeFormat('en-US', {
    month: 'short'
}).format;

const startYear = '2018';
const initialNumberOfMonths = 12;


//AddInitialMemberData();
//AddInitialMatchData();

//createNewMonthData();



function GetData(){

//Get a data 
membersRef.where("fName", "==", "Changburm") //.where("maches.2019", ">=", true)
    .get()
    .then(function (data) {

        //rData = data;
        data.forEach(function (doc) {

            var temp = doc.data();
            let temp2 = temp.matches["2018"].Jan;
            console.log(temp2);

            for (let key in temp2) {
                if (temp2.hasOwnProperty(key)) {
                    let val = temp2[key];
                    if (val.attendence === true) {
                        let winNumber = val.results.filter(function (x) {
                            return x == "W"
                        }).length;
                        console.log(val);
                        console.log(winNumber);
                    }
                }
            }

            //console.log(temp3);

        })


    });

}


function createNewMonthData(){

    let year = 2018;
    let month = 'Mar'; 
    let id = "CHO Changburm";

    for(let wk=1; wk<=4 ; wk++){

    let command = {};
    command[`matches.${year}.${month}.wk${wk}.attendence`] = false;
    command[`matches.${year}.${month}.wk${wk}.dttm`] = new Date();
    command[`matches.${year}.${month}.wk${wk}.results`] = new Array("NA","NA","NA");

    membersRef.doc(id)
        .update(command)
        .then(function () {
            console.log('create a new month data')
        })

    }

}



function updateData() {
    //Update
    var command = {};
    command["matches.2018.Jan.wk1.attendence"] = false;


    var cmd2 = {};
    //cmd2["matches.2018.Jan.wk1.results"] = ["L", "W", "W"]
    var testArray = new Array("W", "X", "Y");
    cmd2["matches.2018.Jan.wk1.results"] = testArray;

    membersRef.doc("CHO Changburm")
        //.update(command)
        .update(cmd2)
        .then(function () {
            console.log('done!')
        })

}



function AddInitialMatchData() {

    for (let member = 0; member < allMembers.length; member++) {


        let id = `${allMembers[member].lName} ${allMembers[member].fName}`;
        //let id = `BAE Heesung`;

        let mergedMonthFields = {};

        for (let month = 1; month <= initialNumberOfMonths; month++) {

            //console.log(month);
            let tuesdays = getTuesdays(startYear, month);
            //console.log(tuesdays);
            let mergedDayFields = {};
            for (let i = 0; i < tuesdays.length; i++) {

                let dayField = {
                    [`${new Intl.DateTimeFormat('en-US').format(tuesdays[i])}`]: {
                        attendence: "NA",
                        results: ["NA", "NA", "NA"]
                    }
                }

                mergedDayFields = Object.assign(mergedDayFields, dayField);

            }

            let thisMonthField = {
                [shortMonthName(new Date(startYear, month - 1, 1))]: mergedDayFields
            }

            mergedMonthFields = Object.assign(mergedMonthFields, thisMonthField);

        }

        //console.log(mergedMonthFields);

        let yearField = {
            [startYear]: mergedMonthFields
        }

        //console.log(yearField);

        membersRef.doc(id).update(yearField);
    }




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



function AddInitialMemberData() {

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
            matches: {
                "2018": {
                    Jan: {
                        wk1: {
                            dttm: new Date(),
                            attendence: false,
                            results: ["W", "L", "L"],
                        },
                        wk2: {
                            dttm: new Date(),
                            attendence: true,
                            results: ["W", "L", "W"],
                        },
                        wk3: {
                            dttm: new Date(),
                            attendence: false,
                            results: ["W", "L", "L"],
                        },
                        wk4: {
                            dttm: new Date(),
                            attendence: true,
                            results: ["W", "W", "W"],
                        },
                        wk5: {
                            dttm: new Date(),
                            attendence: false,
                            results: ["W", "L", "L"],
                        }

                    },
                    // Feb: {
                    //     wk1: {
                    //         dttm: new Date(),
                    //         attendence: false,
                    //         results: ["W", "L", "L"],
                    //     },
                    //     wk2: {
                    //         dttm: new Date(),
                    //         attendence: true,
                    //         results: ["W", "L", "W"],
                    //     },
                    //     wk3: {
                    //         dttm: new Date(),
                    //         attendence: false,
                    //         results: ["W", "L", "L"],
                    //     },
                    //     wk4: {
                    //         dttm: new Date(),
                    //         attendence: true,
                    //         results: ["W", "W", "W"],
                    //     }
                    // }

                },
                "2019": {
                    Jan: {
                        wk1: {
                            dttm: new Date(),
                            attendence: false,
                            results: ["W", "W", "W"],
                        },
                        wk2: {
                            dttm: new Date(),
                            attendence: true,
                            results: ["L", "L", "L"],
                        }
                    }
                },

            },

        } // end
    ]

    //console.log(members);

    return members;
}