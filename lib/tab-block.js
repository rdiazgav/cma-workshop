'use strict';

module.exports = function register (registry) {
  registry.$groups().$store('tabs', toProc(registry));
};

function toProc (registry) {
  return registry.$class().new_block_macro_descriptor(
    'tabs',
    function () {},
    ['listing']
  );
}
