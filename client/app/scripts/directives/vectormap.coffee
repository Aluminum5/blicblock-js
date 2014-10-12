'use strict'

###*
 # @ngdoc directive
 # @name blicblockApp.directive:vectorMap
 # @description
 # # vectorMap
###
angular.module('blicblockApp')
  .directive('vectorMap', ->
    restrict: 'A'
    scope:
      countries: '='
      countryCode: '='
    link:
      (scope, element, attrs) ->
        scope.$watch 'countries.length', ->
          return if scope.countries.length < 1
          country_values = {}
          for country in scope.countries
            country_values[country.code.toUpperCase()] = country.total_scores
          focus = (scope.countryCode || '').toUpperCase()
          focus = {x: 0, y: 0.41, scale: 2.75} if focus == 'US'
          $(element).vectorMap
            map: 'world_mill_en'
            focusOn: focus
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
            series:
              regions: [
                values: country_values
                scale: ['#E4FFCA', '#69D204']
                normalizeFunction: 'polynomial'
              ]
            onRegionLabelShow: (e, el, code) ->
              total_scores = country_values[code]
              if total_scores
                units = 'score'
                units += 's' unless total_scores == 1
                el.html(el.html() + ' - ' + total_scores + ' ' + units)
  )
