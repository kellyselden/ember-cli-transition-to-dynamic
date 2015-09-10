function transitionToDynamic(name, routesWithSegments) {
  var routes = this.router.router.currentHandlerInfos;
  var models = [];
  for (var i = 0; i < routes.length; i++) {
    var route = routes[i];
    var params = route.params;
    var names = route._names;
    var routeSegments = routesWithSegments[route.name];
    for (var x = 0; x < names.length; x++) {
      var param = names[x];
      if (!params.hasOwnProperty(param)) continue;
      var segment = params[param];
      if (routeSegments && routeSegments[param]) {
        segment = routeSegments[param];
      }
      models.push(segment);
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
