const commands = {
    help: {
        description: 'Opens the help page for Commander.',
        args: ['command (optional)'],
        execute(args) {
            if (args.length > 0) {
                if (commands[args] !== undefined) {
                    chrome.tabs.create({
                        url: 'http://chromecommander.rtfd.io/en/latest/' + args[0] + '.html',
                        active: true
                    });
                } else {
                    commanderNotification('I can\'t show you the documentation for this command because it doesn\'t exist. Check your spelling and try again.');
                }
            } else {
                chrome.tabs.create({
                    url: 'http://chromecommander.rtfd.io',
                    active: true
                });
            }
        }
    },
    'highlight-updates': {
        description: 'Highlights whenever an element updates.',
        args: ['toggled'],
        execute(args) {
            if (args.length < 1) {
                commanderNotification('I need 1 argument. You provided none.');
            } else {
                if (parseAsBoolean(args[0]) === null) {
                    commanderNotification('I expected a boolean.');
                } else {
                    if (parseAsBoolean(args[0])) {
                        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
                            chrome.tabs.sendMessage(tabs[0].id, {action: 'highlightUpdates', toggled: true}, () => {});
                        });
                        commanderNotification('Enabled highlighting updates.');
                    } else {
                        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
                            chrome.tabs.sendMessage(tabs[0].id, {action: 'highlightUpdates', toggled: false}, () => {});
                        });
                        commanderNotification('Disabled highlighting updates.');
                    }
                }
            }
        }
    },
    version: {
        description: 'Displays version information.',
        args: [],
        execute(args) {
            commanderNotification('You are running Commander v' + chrome.runtime.getManifest().version);
        }
    }
}

function commanderNotification(text) {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, {action: 'notify', text}, () => {});
    });
}

function parseAsBoolean(input) {
    let yes = ['yes', 'true', 'on', '1'];
    let no = ['no', 'false', 'off', '0'];
    if (yes.includes(input.toLowerCase())) return true;
    if (no.includes(input.toLowerCase())) return false;
    return null;
}

chrome.omnibox.onInputChanged.addListener((currentInput, suggest) => {
    chrome.omnibox.setDefaultSuggestion({description: 'Type the name of a command to search.'});
    var command = currentInput.split(' ')[0];
    var results = [];
    Object.keys(commands).forEach(o => {
        if (o.startsWith(command)) {
            var description = '';
            description += '<dim>';
            description += o.replace(command, '<match>' + command + '</match>');
            commands[o].args.forEach(arg => {
                description += ' [';
                description += arg;
                description += ']';
            });
            description += ' -</dim> ';
            description += commands[o].description;
            if (o === command) {
                chrome.omnibox.setDefaultSuggestion({description});
            } else {
                results.push({
                    content: o,
                    description
                });
            }
        }
    });
    if (results.length > 0) {
        suggest(results);
    }
});

chrome.omnibox.onInputEntered.addListener(input => {
    var raw = input.split(' ');
    var command = raw[0];
    raw.shift();
    var args = raw;

    if (commands.hasOwnProperty(command)) {
        commands[command].execute(args);
    } else {
        commanderNotification('Command Error:<br><br>Command does not exist: ' + command);
    }
});