import Ember from 'ember';

export default Ember.Route.extend({
    actions: {
        addNew() {
            let user = this.store.createRecord('user', {
                name: this.controller.get('name')
            });
            user.save().then(() => {
                console.log('save successful');
                this.controller.set('message', `A new user with name ${this.controller.get('name')} was added!`);
                this.controller.set('name', null);
            }).catch((err) => {
                console.log(err);
                this.controller.set('message', `Something went wrong`);
            });
        }
    }
});
