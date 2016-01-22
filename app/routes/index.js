import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    twitterLogin() {
      var controller = this.controllerFor('index');
      this.get('session').open('twitter').then(() => {
        controller.set('twitterLoggedIn', true);
      })
    },
    twitterLogout() {
      var controller = this.controllerFor('index');
      controller.set('twitterLoggedIn', false);
    }
  }
});
