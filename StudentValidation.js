var jsonResult;
var guid = "449a605f-14ec-40fe-8530-51bec72063e6";

function validateName() {
    let nameValue = $('#name').val();
    if (nameValue.length == '') {
        alert("Name can't be empty!!!")
    }
}
function validateAge() {
    let ageValue = $('#age').val();
    if (ageValue == 0) {
        alert("Set your age!!")
    }
}

function validateEmail() {
    let regex =
        /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
    let s = $('#email').value;
    if (!regex.test(s)) {
        alert("Enter valid email!!!")
    }
}

function validateRno() {
    let rollNoValue = $('#rollno').val();
    if (rollNoValue == null) {
        alert("Roll No. can't be empty")
    }
}

function validateGender() {
    let genderValue = $("input[name=gender]").is(":checked");
    if (!genderValue) {
        alert("Gender can't be empty")
    }
}

function validateDate() {
    let dateValue = $('#date').val();
    if (dateValue == null) {
        alert("Date can't be empty")
    }
}

$('#add').click(function () {
    // validateName();
    // validateAge();
    // validateEmail();
    // validateRno();
    // validateGender();
    // validateDate();
    result = $('#registrationForm').serializeArray();
    jsonResult = objectifyForm(result);
    console.log(jsonResult)
    postDataToAPI(jsonResult)
});

function objectifyForm(arr) {
    var returnArray = {};
    for (var i = 0; i < arr.length; i++) {
        returnArray[arr[i]['name']] = arr[i]['value'];
    }
    return returnArray;
}

function convertJSONToArr(data) {
    let dataToArray = data.split(',').map(item => item.trim());
    return dataToArray.join(" <br> ");
}

function postDataToAPI(formData) {
    console.log("Form data ", formData);
    $.ajax({
        type: "POST",
        url: "http://gsmktg.azurewebsites.net/api/v1/techlabs/test/students",
        data: formData,
        success: function (data, status) {
            console.log("Data: " + data + "\nStatus: " + status);
            guid = data;
            console.log(guid);
        },
        dataType: "json",
        ContentType: "application/json"
    });
}

function getCurrentStudent(e) {
    e.preventDefault();
    $.ajax({
        url: "http://gsmktg.azurewebsites.net/api/v1/techlabs/test/students/" + guid,
        success: function (result) {
            $('#details').html(convertJSONToArr(JSON.stringify(result)));
            console.log(result);
        }
    });
}

function getDataFromAPI(e) {
    e.preventDefault();
    $.ajax({
        url: "http://gsmktg.azurewebsites.net/api/v1/techlabs/test/students/",
        success: function (result) {
            $('#details').html(convertJSONToArr(JSON.stringify(result)));
            $("#val").html(result.length);
            console.log(result);
        }
    });
}

$('#display').click(function (e) {
    getCurrentStudent(e);
})

$('#allStudents').click(function (e) {
    getDataFromAPI(e);
});