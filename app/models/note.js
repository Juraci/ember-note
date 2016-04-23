import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({
  notebook: belongsTo('notebook'),
  title: attr('string'),
  body: attr('string')
});
