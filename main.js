(() => {
    function getData() {
        let student = {};
        student["name"] = firstCharUp(document.getElementById('name').value);
        student["surname"] = firstCharUp(document.getElementById('surname').value);
        student["patronymic"] = firstCharUp(document.getElementById('patronymic').value);
        student["birthdate"] = document.getElementById('birthdate').value;
        student["begin"] = document.getElementById('begin').value;
        let fac = document.getElementById('faculty');
        student["faculty"] = fac.options[fac.selectedIndex].textContent;
        return student;
    }

    function firstCharUp(word) {
        word.toLowerCase();
        let res = word.toUpperCase();
        return res[0] + word.slice(1);
    }

    function addItem(student) {
        const tbody = document.querySelector('tbody');
        const tr = document.createElement('tr');
        const tdFio = document.createElement('td');
        const tdFac = document.createElement('td');
        const tdBirth = document.createElement('td');
        const tdBegin = document.createElement('td');
        tdFio.textContent = student.surname + ' ' + student.name + ' ' + student.patronymic;
        tdFac.textContent = student.faculty;
        tdBirth.textContent = student.birthdate.split('-').reverse().join('.') + ' (';
        if (getAge(student.birthdate) % 10 === 1) {
            tdBirth.textContent += getAge(student.birthdate) + ' год)';
        } else if (getAge(student.birthdate) % 10 === 0) {
            tdBirth.textContent += getAge(student.birthdate) + ' лет)';
        } else if (getAge(student.birthdate) % 10 < 5) {
            tdBirth.textContent += getAge(student.birthdate) + ' года)';
        } else
            tdBirth.textContent += getAge(student.birthdate) + ' лет)';
        tdBegin.textContent = student.begin + '-' + Number(Number(student.begin) + Number(4)) + ' (' + getCourse(student.begin);

        tr.append(tdFio);
        tr.append(tdFac);
        tr.append(tdBirth);
        tr.append(tdBegin);
        tbody.append(tr);
        return tbody;
    }

    function getCourse(year) {
        const now = new Date();
        const month = now.getMonth() + 1;
        const nowYear = now.getFullYear();
        if (nowYear >= Number(year) + 4) {
            return 'закончил)';
        } else {
            let course = nowYear - year;
            if (month > 6)
                course++;
            return course + ' курс)';
        }
    }

    function toggleValid(input, p) {
        if (p) {
            input.classList.add('is-valid');
            input.classList.remove('is-invalid');
        }
        else {
            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
        }
    }

    function valid(input) {
        const now = new Date();
        switch (input.type) {
            case "text":
                if (input.value.trim().toLowerCase().match(/^[А-Яа-я]+$/)) {
                    toggleValid(input, 1);
                } else {
                    toggleValid(input, 0);
                    input.nextElementSibling.textContent = "Необходимо использовать буквы русского алфавита";
                }
                break;
            case "number":

                if (Number(input.value) < 2000) {
                    toggleValid(input, 0);
                    input.nextElementSibling.textContent = "Пожалуйста, введите дату начиная с 2000 года";
                } else if (Number(input.value) > now.getFullYear()) {
                    toggleValid(input, 0);
                    input.nextElementSibling.textContent = "Пожалуйста, введите корректную дату";
                } else {
                    toggleValid(input, 1);
                }
                break;
            case "date":
                const dateArr = input.value.split('-');
                const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                const fullDate = new Date(dateArr[0], dateArr[1] - 1, dateArr[2]);
                if (dateArr[0] < 1900) {
                    toggleValid(input, 0);
                    input.nextElementSibling.textContent = "Пожалуйста, введите корректную дату";
                } else if (fullDate > today || isNaN(fullDate)) {
                    toggleValid(input, 0);
                    input.nextElementSibling.textContent = "Пожалуйста, введите корректную дату";
                } else {
                    toggleValid(input, 1);
                }
                break;
        }

        return input;
    }

    function validSelect(fac) {
        if (fac.value != 0) {
            toggleValid(fac, 1)
            return 1;
        } else {
            toggleValid(fac, 0);
            fac.nextElementSibling.textContent = "Выберите факультет";
            return 0;
        }
    }

    function getAge(birthdate) {
        const now = new Date();
        const birthArr = birthdate.split('-');
        const birth = new Date(birthArr[0], birthArr[1] - 1, birthArr[2]);
        return Math.floor((now - birth) / 31557600000); //1000*60*60*24*365.25 milliseconds
    }

    function createArr() {
        let arr = [];
        let student = {};
        const now = new Date();
        student.name = "Валерий";
        student.surname = "Жмышенко";
        student.patronymic = "Альбертович";
        student.birthdate = now.getFullYear() - 54 + '-';
        if (Number(Number(now.getMonth()) + 1) < 10)
            student.birthdate += '0' + Number(Number(now.getMonth()) + 1) + '-' + now.getDate();
        else
            student.birthdate += '0' + Number(Number(now.getMonth()) + 1) + '-' + now.getDate();
        student.begin = now.getFullYear() - 54 + 18;
        student.faculty = "ИВТ";
        arr.push(student);
        student = {};
        student.name = "Богдан";
        student.surname = "Жмышенко";
        student.patronymic = "Денисович";
        student.birthdate = now.getFullYear() - 18 + '-';
        if (Number(Number(now.getMonth()) + 1) < 10)
            student.birthdate += '0' + Number(Number(now.getMonth()) + 1) + '-' + now.getDate();
        else
            student.birthdate += '0' + Number(Number(now.getMonth()) + 1) + '-' + now.getDate();
        student.begin = now.getFullYear();
        student.faculty = "ФИИТ";
        arr.push(student);
        student = {};
        student.name = "Денис";
        student.surname = "Сухачев";
        student.patronymic = "Валерьевич";
        student.birthdate = now.getFullYear() - 27 + '-';
        if (Number(Number(now.getMonth()) + 1) < 10)
            student.birthdate += '0' + Number(Number(now.getMonth()) + 1) + '-' + now.getDate();
        else
            student.birthdate += '0' + Number(Number(now.getMonth()) + 1) + '-' + now.getDate();

        student.begin = now.getFullYear() - 2;
        student.faculty = "ПМИ";
        arr.push(student);
        return arr;
    }

    function tableSearch(input, table, cell, end) {
        const val = new RegExp(input.value, 'i');
        if (val != '') {
            for (let i = 1; i < table.rows.length; i++) {
                (table.rows[i].cells[cell].innerText.search(val) == -1) ? table.rows[i].style.display = "none" : table.rows[i].style.display = "";

                if (cell === 3) {

                    const first = table.rows[i].cells[3].innerText.substr(0, 4);
                    const second = table.rows[i].cells[3].innerText.substr(5, 5);
                    console.log(first, second);
                    if (end === false) { //год начала обучения
                        (first.search(val) == -1) ? table.rows[i].style.display = "none" : table.rows[i].style.display = "";
                    } else if (end === true) { //год окончания обучения
                        (second.search(val) == -1) ? table.rows[i].style.display = "none" : table.rows[i].style.display = "";
                    }
                }
            }
        } else {
            for (let i = 1; i < table.rows.length; i++) {
                table.rows[i].style.display = "";
            }
        }
    }

    function addSortTable(table) {
        const th = document.querySelectorAll('th');
        // Направление сортировки
        const directions = Array.from(th).map(function (header) {
            return '';
        });

        for (let i = 0; i < th.length; i++) {
            th[i].style.cursor = "pointer";
            th[i].addEventListener('click', () => {
                sortTable(table, i, directions);
            })
        }
    }

    function sortTable(table, index, directions) {
        const tableBody = table.querySelector('tbody');
        const rows = tableBody.querySelectorAll('tr');
        const newRows = Array.from(rows);
        // Получить текущее направление
        const direction = directions[index] || 'asc';

        // Фактор по направлению
        const multiplier = (direction === 'asc') ? 1 : -1;
        newRows.sort(function (rowA, rowB) {
            const cellA = rowA.querySelectorAll('td')[index].innerHTML;
            const cellB = rowB.querySelectorAll('td')[index].innerHTML;

            switch (true) {
                case cellA > cellB: return 1 * multiplier;
                case cellA < cellB: return -1 * multiplier;
                case cellA === cellB: return 0;
            }
        });
        [].forEach.call(rows, function (row) {
            tableBody.removeChild(row);
        });

        // Поменять направление
        directions[index] = direction === 'asc' ? 'desc' : 'asc';

        newRows.forEach(function (newRow) {
            tableBody.appendChild(newRow);
        })
    }

    document.addEventListener('DOMContentLoaded', () => {
        const form = document.querySelector('form');
        const inputs = document.querySelectorAll('.validation');
        const fac = document.getElementById('faculty');
        let arrStudents = createArr();
        const searchInputs = document.querySelectorAll(".search");
        const table = document.querySelector('table');

        arrStudents.forEach(student => {
            document.querySelector('table').append(addItem(student));
        });

        inputs.forEach(input => {
            input.addEventListener('input', () => valid(input))
        });

        addSortTable(table);

        for (let i = 0; i < searchInputs.length; i++) {
            searchInputs[i].addEventListener('input', () => {
                if (i < 2)
                    tableSearch(searchInputs[i], table, i);
                else {
                    switch (i) {
                        case 2:
                            tableSearch(searchInputs[i], table, 3, false);
                            break;
                        case 3:
                            tableSearch(searchInputs[i], table, 3, true);
                            break;
                    }
                }
            });
        }

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            let isValidate = 0;
            inputs.forEach(input => {
                if (input.value == '') {
                    input.nextElementSibling.textContent = "Это поле обязательно для заполнения";
                    input.classList.add('is-invalid');
                }
                if (input.classList.contains('is-valid')) {
                    isValidate++;
                }
            });

            validSelect(fac);
            if (isValidate === inputs.length && validSelect(fac)) {
                const student = getData();
                document.querySelector('table').append(addItem(student));
                arrStudents.push(student);
                inputs.forEach(input => {
                    input.value = '';
                    input.classList.remove('is-valid');
                });
                fac.value = 0;
                fac.classList.remove('is-valid');
            }
        });
    });
})();
