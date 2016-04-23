import Ember from 'ember';

export default Ember.Route.extend({
    actions: {
        addNotebook() {
            let notebook = this.store.createRecord('notebook', {
                title: this.controller.get('title'),
                user: this.controllerFor('application').get('user')
            });
            notebook.save().then(() => {
                console.log('save successful');
                this.controller.set('title', null);
                this.refresh();
            }).catch((err) => {
                console.log(`Error while trying to save record ${err}`);
            });
        }
    },
    model(params) {
        return this.store.query('notebook', { user: params.user_id });
    }
});
