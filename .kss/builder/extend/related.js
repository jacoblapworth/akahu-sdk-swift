const {marked} = require('../../../node_modules/marked');

module.exports = function(handlebars) {
  /**
   * Renders a block of markup for the "related" content links
   */
  handlebars.registerHelper('renderRelated', renderRelated);

};

const renderRelated = (data, block) => {
  this.related = marked.parse(data.trim());
  return block.fn(this);
}
