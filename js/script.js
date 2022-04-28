'use strict';

window.addEventListener('DOMContentLoaded', () => {

    //Timer
    //------ params
    let deadLine, timeInterval;

    //------ functions
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / (1000 * 60)) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds');

        timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.textContent = getZero(t.days);
            hours.textContent = getZero(t.hours);
            minutes.textContent = getZero(t.minutes);
            seconds.textContent = getZero(t.seconds);

            const blockDays = timer.querySelector('.timer__block_days');

            blockDays.classList.remove("timer__block_days_3s", "timer__block_days_4s");

            if (t.days >= 1000) {
                blockDays.classList.add("timer__block_days_4s");
            } else if (t.days >= 100) {
                blockDays.classList.add("timer__block_days_3s");
            }

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    function setDeadline() {

        const plusMonths = 2;
        let today = new Date(),
            dd = String(today.getDate()).padStart(2, "0"),
            mm = String(today.getMonth() + 1 + plusMonths).padStart(2, "0"),
            yyyy = today.getFullYear();

        deadLine = yyyy + "-" + mm + "-" + dd;
    }

    //------ execution
    setDeadline();
    setClock('.timer', deadLine);

    // Form
    //------ params
    const forms = document.querySelectorAll('form');

    //------ functions
    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const obj = {};
            formData.forEach(function (value, key) {
                obj[key] = value;
            });

            if (Date.parse(obj.date) - Date.parse(new Date()) > 0) {
                deadLine = obj.date;
                clearInterval(timeInterval);
                setClock('.timer', deadLine);
            }
        });
    }

    //------ execution
    forms.forEach(item => {
        postData(item);
    });

});