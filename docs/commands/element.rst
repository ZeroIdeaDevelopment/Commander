Element
=======

.. note::

    This command uses jQuery to provide functionality.

.. warning::

    This command is currently buggy. Functionality described
    may not be how it actually works.

+------------------+---------------------------------------------------------------+
|    Parameter     |                       Description                             |
+==================+===============================================================+
|     action       |   The action to perform when manipulating elements. Either    |
|                  |                  create, delete or text.                      |
+------------------+---------------------------------------------------------------+
|  query string    |         The query string to perform the action on.            |
+------------------+---------------------------------------------------------------+
|  type (create)   |     The type of element to create, such as div, p, etc.       |
+------------------+---------------------------------------------------------------+
|   text (text)    |             The text to put in to the element.                |
+------------------+---------------------------------------------------------------+
|   id (create)    |            The ID of the newly created element.               |
+------------------+---------------------------------------------------------------+
| classes (create) |        The classes to add to the newly created element.       |
+------------------+---------------------------------------------------------------+

Usage
-----
.. code-block:: text

    # element [action] [query string] [type (create) or text (text)] [id (create)] [classes (create)]
