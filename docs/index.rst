Commander
=========

Welcome to the documentation for Commander!

.. note::

    Commander is still work in progress and anything can change at any time. Most
    of the documentation pages are stubs. You can commit to the documentation over
    at the `GitHub repository <https://github.com/LewisTehMinerz/Commander>`_.


What is Commander?
------------------

Commander is a small Chrome extension that attempts to help improve your development
workflow by providing easy to use commands from the omnibox.

How does it work?
-----------------

Commander takes advantage of an API that Chrome provides which allows you to use the
omnibox in order to pass input to the extension. So, by taking advantage of that,
we can make a command system purely using Chrome's omnibox and vanilla APIs.

Can I have some screenshots?
----------------------------

Yes! And better yet, some GIF images have been thrown in there too!

Prompt:

.. image:: https://living-the.speedboat.life/72yn3z.png

Command names and descriptions:

.. image:: https://living-the.speedboat.life/042i7c.png

Search function:

.. image:: https://living-the.speedboat.life/061if7.png

Notification:

.. image:: https://living-the.speedboat.life/6fp5xd.png

Arguments example:

.. image:: https://living-the.speedboat.life/x7huyz.gif


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

    help
    highlight-updates
    version