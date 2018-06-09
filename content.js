var highlightUpdates = false;

$('#content').bind('DOMSubtreeModified', e => {
    if (highlightUpdates) {
        var before = e.target.style;
        e.target.style.outline = '#f00 solid 2px';
        setTimeout(() => {
            e.target.style = before;
        }, 1000);
    }
});

chrome.runtime.onMessage.addListener(message => {
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
    } else if (message.action === 'highlightUpdates') {
        highlightUpdates = message.toggled;
    }
});