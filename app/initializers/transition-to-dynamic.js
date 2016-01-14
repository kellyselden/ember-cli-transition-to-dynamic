function transitionToDynamic(name, routesWithSegments) {
  var models = [];
  this.router.router.currentHandlerInfos.forEach(route => {
    var routeSegments = routesWithSegments[route.name];

    // using route._names instead of route.params because
    // the latter's order is not guaranteed
    if (route._names && route._names.forEach) {
      route._names.forEach(param => {
        var paramsSource = routeSegments && routeSegments[param] ? routeSegments : route.params;
        models.push(paramsSource[param]);
      });
    }
  });

  var args = models.slice();
  args.unshift(name);
  this.transitionTo(...args);
}

export function initialize(container, application) {
  application.register('utils:transition-to-dynamic', transitionToDynamic, { instantiate: false });
  application.inject('route', 'transitionToDynamic', 'utils:transition-to-dynamic');
}

export default {
  name: 'transition-to-dynamic',
  initialize: initialize
};
