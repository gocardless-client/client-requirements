(function(window) {
  'use strict';

  var noticeToggle = (function noticeToggle(id) {
    var element = window.document.getElementById(id);

    return {
      show: function show() {
        if (element) {
          element.style.display = 'block';
        }
        return element;
      },
      hide: function hide() {
        if (element) {
          element.style.display = 'none';
        }
        return element;
      }
    };
  })('generic-deprecation-warning');

  // Always hide initially
  noticeToggle.hide();

  // Set up requirements
  var requirements = {
    ObjectKeys: function ObjectKeys() {
      return 'keys' in Object && _.isFunction(Object.keys);
    },
    ObjectFreeze: function ObjectFreeze() {
      return 'freeze' in Object && _.isFunction(Object.freeze);
    },
    ObjectCreate: function ObjectCreate() {
      return 'create' in Object && _.isFunction(Object.create);
    }
  };

  // Determine if requirements have been met
  var hasRequirements = _.keys(requirements).every(function (testKey) {
    var result = requirements[testKey]();
    if (!result) { console.warn(['Unsupported test:', testKey].join(' ')); }
    return result;
  });

  // Show upgrade notice on page
  if (!hasRequirements) {
    console.warn('Please update your browser: http://whatbrowser.org');
    noticeToggle.show();
  }

})(window);
