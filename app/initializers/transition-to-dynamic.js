function transitionToDynamic(name, segments) {
  var routes = this.router.router.currentHandlerInfos;
  var models = [];
  for (var i = 0; i < routes.length; i++) {
    var params = routes[i].params;
    for (var param in params) {
      if (params.hasOwnProperty(param)) {
        models.push(segments[param] || params[param]);
      }
    }
  }

  var args = models.slice();
  args.unshift(name);
  this.transitionTo.apply(this, args);
}

export function initialize(container, application) {
  application.register('utils:transition-to-dynamic', transitionToDynamic, { instantiate: false });
  application.inject('route', 'transitionToDynamic', 'utils:transition-to-dynamic');
}

export default {
  name: 'transition-to-dynamic',
  initialize: initialize
};
