var highlightUpdates = false;

$('body').bind('DOMSubtreeModified', e => {
    if (highlightUpdates) {
        var before = e.target.style;
        e.target.style.outline = '#f00 solid 2px';
        setTimeout(() => {
            e.target.style = before;
        }, 1000);
    }
});

function commanderLog(str) {
    console.log('%cCommander%c %s', 'padding-left:7px;padding-right:7px;background-color:#333;color:white;', 'padding:0;background-color:inherit;color:inherit;', str);
}

chrome.runtime.onMessage.addListener(function(message, _, sendResponse) {
    commanderLog('Message received from background.');
    if (message.action === 'notify') {
        var msg = document.createElement('commander-message');
        var text = document.createElement('commander-message-content');
        var dismiss = document.createElement('commander-message-dismiss');
        var img = document.createElement('img');
        img.src = chrome.runtime.getURL('images/48.png');
        text.innerHTML = message.text;
        dismiss.onclick = function() {
            this.parentElement.remove(this);
        }
        msg.appendChild(dismiss);
        msg.appendChild(img);
        msg.appendChild(text);

        document.body.appendChild(msg);
        commanderLog('Created notification.');
    } else if (message.action === 'highlightUpdates') {
        highlightUpdates = message.toggled;
        commanderLog('Enabled highlighting.');
    } else if (message.action === 'elementDelete') {
        var element = $(message.queryString);
        if (element === null) {
            sendResponse({error: 'Element from query string does not exist.'});
            commanderLog('Error: element from query string does not exist.');
        } else {
            element.remove();
            commanderLog('Removed element.');
        }
    } else if (message.action === 'elementCreate') {
        var element = $(message.queryString);
        if (element === null) {
            sendResponse({error: 'Element from query string does not exist.'});
            commanderLog('Error: element from query string does not exist.');
        } else {
            var newElement = document.createElement(message.type);
            if (message.id !== '-') // means no ID
                newElement.id = message.id;
            if (message.classes !== '-') // means no classes
                newElement.className = message.classes;
            element.append(newElement);
            commanderLog('Created element.');
        }
    } else if (message.action === 'elementText') {
        var element = $(message.queryString);
        if (element === null) {
            sendResponse({error: 'Element from query string does not exist.'});
            commanderLog('Error: element from query string does not exist.');
        } else {
            element.innerText = message.text;
            commanderLog('Added text to element.');
        }
    } else {
        commanderLog('Unknown message: ' + message.action);
    }
    return true;
});