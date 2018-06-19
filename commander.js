const commands = {
    element: {
        description: 'Element manipulation tools.',
        args: ['action', 'query string of node', 'type (create) or text (text)', 'id (create)', 'classes (create)'],
        execute(args) {
            if (args.length > 0) {
                if (args[0].toLowerCase() === 'delete') {
                    if (args.length > 1) {
                        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
                            chrome.tabs.sendMessage(tabs[0].id, {action: 'elementDelete', queryString: args[1]}, response => {
                                if (response.error) {
                                    commanderNotification('Error while deleting element:<br><br>' + response.error);
                                } else commanderNotification(response);
                            });
                        });
                    } else {
                        commanderNotification('I need 2 arguments. You provided ' + args.length + '.');
                    }
                } else if (args[0].toLowerCase() === 'create') {
                    if (args.length > 2) {
                        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
                            chrome.tabs.sendMessage(tabs[0].id, {action: 'elementCreate', queryString: args[1], type: args[2], id: args[3] || '-', classes: args.slice(4, args.length).join(' ') || '-'}, response => {
                                if (response.error) {
                                    commanderNotification('Error while creating element:<br><br>' + response.error);
                                }
                            });
                        });
                    } else {
                        commanderNotification('I need at least 3 arguments. You provided ' + args.length + '.');
                    }
                } else if (args[0].toLowerCase() === 'text') {
                    if (args.length > 1) {
                        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
                            chrome.tabs.sendMessage(tabs[0].id, {action: 'elementText', queryString: args[1], text: args.slice(2, args.length).join(' ')}, response => {
                                if (response.error) {
                                    commanderNotification('Error while adding text to an element:<br><br>' + response.error);
                                }
                            });
                        });
                    } else {
                        commanderNotification('I need at least 2 arguments. You provided ' + args.length + '.');
                    }
                } else {
                    commanderNotification('I am confused on what you mean by "' + args[0] + '".');
                }
            } else {
                commanderNotification('I need 2 to 5 arguments. You provided none.');
            }
        }
    },
    help: {
        description: 'Opens the help page for Commander.',
        args: ['command (optional)'],
        execute(args) {
            if (args.length > 0) {
                if (commands[args] !== undefined) {
                    chrome.tabs.create({
                        url: 'http://chromecommander.rtfd.io/en/latest/commands/' + args[0] + '.html',
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
    let yes = ['yes', 'true', 'on', '1', 'y'];
    let no = ['no', 'false', 'off', '0', 'n'];
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