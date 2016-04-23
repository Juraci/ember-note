import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default DS.Model.extend({
  title: attr('string'),
  user: belongsTo('user'),
  notes: hasMany('note')
});
