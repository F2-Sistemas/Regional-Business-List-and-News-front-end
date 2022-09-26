import { h } from 'preact';
import './style.css';

/**
 * @TODO converter isso para código válido aqui
function loaderShow() {
    document.querySelectorAll('.loader-container[data-loader-type="container"]')
        .forEach(element => {
            element.classList.remove('hide');
        });
}

function loaderHide() {
    document.querySelectorAll('.loader-container[data-loader-type="container"]')
        .forEach(element => {
            element.classList.add('hide');
        });
}

function fastLoader(ms: number) {
    if (typeof ms !== 'number') {
        ms = 1000;
    }

    if (ms < 500) {
        ms = 500;
    }

    loaderShow();
    setTimeout(function() {
        loaderHide();
    }, ms);
}

window.onload = () => {
    loaderHide();
}
/** */
const Loading = function () {
    return (
        <>
            <div class="loader-container" data-loader-type="container">
                <div class="loader" data-loader-type="loader"></div>
            </div>
        </>
    );
}

export default Loading;
