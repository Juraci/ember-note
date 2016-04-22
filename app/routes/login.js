import Ember from 'ember';

export default Ember.Route.extend({
    actions: {
        login() {
            this.store.query('user', {
                name: this.controller.get('name')
            }).then((users) => {
                if(users.get('length') === 1) {
                    let user = users.objectAt(0);
                    this.controllerFor('application').set('user', user);
                    this.transitionTo('notebooks');
                } else {
                    this.controller.set('message', `User login ${this.controller.get('name')} not found!`);
                }
            }).catch((err) => {
                console.log(err);
                this.controller.set('message', `Error: could not query the user`);
            });
        }
    }
});
