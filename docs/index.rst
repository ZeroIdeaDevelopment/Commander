Commander |maintainability| |circleci|
======================================

Welcome to the documentation for Commander!

.. |maintainability| image:: https://api.codeclimate.com/v1/badges/ce5789483b5d04ad16db/maintainability
    :target: https://codeclimate.com/github/ZeroIdeaDevelopment/Commander/maintainability
    :alt: Maintainability

.. |circleci| image:: https://circleci.com/gh/ZeroIdeaDevelopment/Commander.svg?style=svg
    :target: https://circleci.com/gh/ZeroIdeaDevelopment/Commander

.. note::

    Commander is still work in progress and anything can change at any time. Most
    of the documentation pages are stubs. You can commit to the documentation over
    at the `GitHub repository <https://github.com/LewisTehMinerz/Commander>`_.


What is Commander?
------------------

Commander is a small Chrome extension that attempts to help improve
your development workflow by providing easy to use commands from the omnibox.

How does it work?
-----------------

Commander takes advantage of an API that Chrome provides which allows you to
use the omnibox in order to pass input to the extension. So, by taking
advantage of that, we can make a command system purely using Chrome's omnibox
and vanilla APIs.

Can I have some screenshots?
----------------------------

Yes! And better yet, some GIF images have been thrown in there too!

Prompt:

.. image:: https://owo.whats-th.is/57bd9b.png

Command names and descriptions:

.. image:: https://owo.whats-th.is/e172c1.png

Search function:

.. image:: https://owo.whats-th.is/89b9c0.png

Notification:

.. image:: https://owo.whats-th.is/602a0b.png

Arguments example:

.. image:: https://owo.whats-th.is/8f10df.gif


.. _commander-docs:

.. toctree::
    :maxdepth: 2
    :caption: Commander

    installing-commander
    using-commander

.. _commands:

.. toctree::
    :maxdepth: 2
    :caption: Commands

    commands/element
    commands/help
    commands/highlight-updates
    commands/version
