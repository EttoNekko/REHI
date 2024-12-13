var color = 'transparent';
var border_color = 'transparent';
var in_focus = true;
var height = window.innerHeight;
var clientY = height / 2;
var focusval = 0;

// create tinted element

var div = document.createElement('div');
div.id = 'injected-frame-001';
div.style.display = 'block';
document.body.appendChild(div);

// config options

function configStyle(options) {
    color = 'rgba(' + options.r + ',' + options.g + ',' + options.b + ',' + options.a + ')';
    focusval = options.f / 2;
    border_color = focusval > 0 ? color : 'transparent';
    updateStyle();
}

// apply options

function updateStyle() {
    div.style['background-color'] = color;
    div.style['border-top'] = Math.max(clientY - focusval, 0) + 'px solid ' + border_color;
    div.style['border-bottom'] = Math.max(height - clientY - focusval, 0) + 'px solid ' + border_color;
}

chrome.runtime.onMessage.addListener(

    function (request, sender, sendResponse) {

        // set options from message

        if (request.pageTintStyle) {
            configStyle(request.pageTintStyle);
        }

        // disable tint

        if (request.close) {
            div.style.display = 'none';
        }

        // enable tint

        if (request.open) {
            div.style.display = 'block';
        }

        // vertically center focus mode whilst adjusting options in popup

        if (request.centerFocus) {

            in_focus = true;
            div.style.transition = 'border 0.1s';
            clientY = height / 2;
            updateStyle();
        }
    }
);

// fetch/init options for newly opened tab

chrome.runtime.sendMessage({ getStyle: "true" }, configStyle);

// update height on resize

window.onresize = function () {
    height = window.innerHeight;
    updateStyle();
};

// update focus position on mousemove

window.onmousemove = function (data) {

    // defer removing transition effect untill focus has tracked mouse

    if (in_focus) {

        window.setTimeout(function () {
            div.style.transition = 'none';
        }, 100);

        in_focus = false;
    }

    // update focus y position

    clientY = data.clientY;
    updateStyle();
};
