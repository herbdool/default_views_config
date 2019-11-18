Default Views Convert to Config
=======================

When converting Drupal 7 modules to Backdrop, Default Views Convert to Config 
module can produce Backdrop-compatible configuration code from Drupal 7 
`hook_views_default_views()` code.

Some Drupal 7 modules may provide default Views upon install; these are 
provided by invoking `hook_views_default_views()` in Drupal 7, but this hook is
absent in Backdrop. Default Views in backdrop are provided as JSON configuration
files instead and there is no core mechanism for converting Drupal's default 
Views. 

Example
-------

Consider the following code which provides two default Views for a Drupal 7
contrib module:
```
function hook_views_default_views() {

  // First block of Views default code providing the first View.

  $view = new view();
  $view->name = 'frontpage';
  $view->description = 'Emulates the default ...';
  ...
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'node';
  ...
  $views[$view->name] = $view;

  // Second block of Views default code.

  $view = new view();
  $view->name = 'anotherview';
  $view->description = 'Provides a View of ...';
  ...
  $handler->display->display_options['access']['type'] = 'none';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['query']['options']['query_comment'] = FALSE;
  ...
  $views[$view->name] = $view;

  return $views;
}
```

When converting this module to Backdrop, the module developer will need to 
provide each of these two Views in the acceptable Backdrop JSON format. Running
each View in the `hook_views_default_views()` code above through this module 
would produce a JSON output such as below. each would then be copied to an
individual JSON file, one separate JSON file for each View.

For example the first block would produce the output below, which would then be
copied and saved as a file called `views.view.promoted.json`

```
{
    "_config_name": "views.view.promoted",
    "name": "frontpage",
    "description": "Emulates the default ...",
    ...
    "base_table": "node",
    "core": 0,
    "display": {
        "default": {
            "display_title": "Master",
            "display_plugin": "default",
            "display_options": {
        ...
        "block": {
            "display_title": "Block",
            "display_plugin": "block",
            "display_options": {
    ...
}
```

Usage
-------

- Install as usual
- Navigate to 'admin/structure/views/default-views-convert'
- Follow instructions to produce each JSON code for each View
- Save each to a separate JSON file using the `_config_name` as the file name.

License
-------

This project is GPL v2 software. See the LICENSE.txt file in this directory for
complete text.

Maintainers
-----------

- docwilmot (https://github.com/docwilmot/)

This module is seeking additional maintainers.
