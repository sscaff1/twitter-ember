import Ember from 'ember';
import config from '../config/environment';
import {Twitter} from 'twitter-node-client';

export default Ember.Object.extend({
  open(authentication){
    var authorizationCode = authentication.authorizationCode;
    return new Ember.RSVP.Promise(function(resolve, reject){
      Ember.$.ajax({
        url: '/__/proxy/v1/sessions',
        type: "POST",
        data: { 'twitter-auth-code': authorizationCode },
        dataType: 'json',
        success: Ember.run.bind(null, resolve),
        error: function(jqXHR, textStatus, errorThrown){
          Ember.run.bind(null, reject({ 'message': errorThrown }));
        }
      });
    }).then(function(user){
      // The returned object is merged onto the session (basically). Here
      // you may also want to persist the new session with cookies or via
      // localStorage.
      return {
        currentUser: user
      };
    });
  }
});
