(() => {
    function getData() {
        let student = {};
        student["name"] = document.getElementById('name').value;
        student["surname"] = document.getElementById('surname').value;
        student["patronymic"] = document.getElementById('patronymic').value;
        student["birthdate"] = document.getElementById('birthdate').value;
        student["begin"] = document.getElementById('begin').value;
        let fac = document.getElementById('faculty');
        student["faculty"] = fac.options[fac.selectedIndex].textContent;
        return student;
    }

    function addItem(student) {
        const tbody = document.createElement('tbody');
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
        } else if (getAge(student.birthdate) % 10 < 5) {
            tdBirth.textContent += getAge(student.birthdate) + ' года)';
        } else {
            tdBirth.textContent += getAge(student.birthdate) + ' лет)';
        }
        // tdBirth.textContent = student.date[2] + '.' + student.date[1] + '.' + student.date[0] + ' (' + student.currentAge + ' лет' + ')';
        // (student.done === true) ? tdBegin.innerHTML = student.year + '-' + student.endDate + ' (закончил)' : tdBegin.innerHTML = student.year + '-' + student.endDate + ' (' + student.course + ' курс)';

        tr.append(tdFio);
        tr.append(tdFac);
        tr.append(tdBirth);
        // tr.append(tdBegin);
        tbody.append(tr);
        return tbody;
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
        console.log(fac.value);
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
        console.log(birthdate);
        console.log(Math.floor((now - birth) / 31557600000));
        return Math.floor((now - birth) / 31557600000); //1000*60*60*24*365.25 milliseconds
    }

    document.addEventListener('DOMContentLoaded', () => {
        let form = document.querySelector('form');
        let inputs = document.querySelectorAll('.validation');
        let fac = document.getElementById('faculty');
        inputs.forEach(input => {
            input.addEventListener('input', () => valid(input))
        })

        fac.addEventListener('input', () => validSelect(fac));
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
            })
            if (isValidate === inputs.length && validSelect(fac)) {
                const student = getData();
                document.querySelector('table').append(addItem(student));
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