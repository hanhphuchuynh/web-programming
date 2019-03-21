
var Class = function (id, name, students) {
    this.id = id;
    this.name = name;
    this.students = students;
}
Class.prototype.addStudent = function (student) {
    this.students.push(student);
}
var Student = function (code, name, birthday, address, homework, mid, final, total) {
    this.code = code;
    this.name = name;
    this.birthday = birthday;
    this.address = address;
    this.homework = homework;
    this.mid = mid;
    this.final = final;
    this.total = total;
}
function getTotal(homework, mid, final) {
    return Math.round((homework * 0.2 + mid * 0.3 + final * 0.5)*100)/100;
}

    var students = [new Student('1001', 'Huynh Hanh Phuc', '9-9-1998', 'Binh Duong', 70, 80, 65, getTotal(70, 80, 65)),
        new Student('1002', 'Nguyen Van An', '12-6-1998', 'Binh Phuoc', 50, 50, 40, getTotal(50, 50, 40)),
        new Student('1003', 'Le Thi Ngoc Anh', '13-7-1998', 'TP Ho Chi Minh', 45, 67, 55, getTotal(45, 67, 55)),
        new Student('1004', 'Phan Thanh Nhan', '21-12-1998', 'Dong Nai', 78, 69, 84, getTotal(78, 69, 84)),
        new Student('1005', 'Mai Huong', '17-12-1998', 'Long An', 45, 36, 40, getTotal(45, 36, 40)),
        new Student('1006', 'Tran Thanh Tra', '3-3-1998', 'Dong Thap', 85, 56, 20, getTotal(85, 56, 20)),
        new Student('1007', 'Huynh Nguyen Tra My', '19-5-1998', 'An Giang', 78, 84, 90, getTotal(78, 84, 90)),
        new Student('1008', 'Tran My', '26-2-1998', 'Dien Bien', 20, 56, 45, getTotal(20, 56, 45)),
];


var classes = [new Class(1, 'Web Programming', [students[0], students[3]]),
    new Class(2, 'Database', [students[6], students[2]]),
    new Class(3, 'Data Structure', [students[1]]),
    new Class(4, 'Operating System', [students[6], students[4], students[5]]),
    new Class(5, 'Discrete Math', [students[0], students[7]])];

function showAllStudents(students) {
    var html = students.map((student, index) => `<tr data-id="${student.code}">
                                <td>${index + 1}</td>
                                <td>${student.code}</td>
                                <td>${student.name}</td>
                                <td>${student.birthday}</td>
                                <td>${student.address}</td>
                                <td>${student.homework}</td>
                                <td>${student.mid}</td>
                                <td>${student.final}</td>
                                <td>${student.total}</td>
                        </tr>`).join('\r\n');
    $('#allstudents tbody').html(html);
}
var currentClassName = null;

function renderClasses(classes) {
    var html = classes.map(x => `<li><a href="#${x.id}" data-classID="${x.id}" data-className="${x.name}">${x.name}   <span style="color:red">${x.students.length}</span></a></li>`).join("");
    $("#className").html(html);
}

function renderStudentlist(students) {
    var html1 = students.map(x => `<option value="${x.code}">${x.code}   ${x.name}</option>`).join("");
    $("#class").html(html1);
}

function hightlight() {
    $(document).ready(function () {
        $("#allStudents td:nth-child(9)").each(function () {
            if (parseFloat($(this).text(), 10) < 50) {
                $(this).parent("tr").css("background-color", "red");
            }
        });
    });
}

$(function () {
    var currentClass = 0;
    $(renderClasses(classes));
    $(renderStudentlist(students));

    if (location.hash === '') { showAllStudents(students); hightlight(); }
    else {
        var id = location.hash.substring(1);
        var temp = classes.find(x => x.id == id).students;
        var className = $(this).attr('data-className');
        currentClassName = className;
        currentClass = id;
        showAllStudents(temp);
        $(`a[data-classID = ${id}]`).parent().addClass("active");
        hightlight();
    }
    
    $('#className').on('click', 'a', function () {
        var className = $(this).attr('data-className');
        var classid = $(this).attr('data-classID');
        currentClass = classid;
        //currentId = classid;
        //var selectedClasses = classes.find(x => x.name === className).students;
        var selectedClasses = classes.filter(x => x.name === className)[0].students;
        showAllStudents(selectedClasses);
    });

    $("ul").on('click', 'a', function () {
        $("ul li").removeClass("active");
        $(this).parent().addClass("active");
        showAllStudents(classes.find(x => x.id == $(this).attr("data-classID")).students);
        hightlight();
    });
    
    $("#add").on("click", function () {
        //alert(currentClass);
        var id = $('#class').val();

        var st = students.find(x => x.code === id);
        currentClass = parseInt(currentClass);
        var cls = classes.filter(x => x.id === currentClass)[0].students;

        //if (!cls.students.find(x => x.code === id)) {
            cls.push(st);
       //}

        showAllStudents(cls);
        renderClasses(classes);
        hightlight();
    });

    
});

