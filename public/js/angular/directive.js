app.directive('stringToNumber', function ()
{
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel)
        {
            ngModel.$parsers.push(function (value)
            {
                return '' + value;
            });
            ngModel.$formatters.push(function (value)
            {
                return parseFloat(value);
            });
        }
    };
});

app.directive('numericOnly', function ()
{
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl)
        {

            modelCtrl.$parsers.push(function (inputValue)
            {
                var transformedInput = inputValue ? inputValue.replace(/[^\d.-]/g, '') : null;

                if (transformedInput != inputValue)
                {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }

                return transformedInput;
            });
        }
    };
});

// app.directive('myPostRepeatDirective', function ()
// {
//     return function (scope, element, attrs)
//     {
//         if (scope.$last)
//         {
//             setSize(scope.directors.length);
//             setTimeout(function ()
//             {
//                 initAutocomplete2();
//             }, 3000);
//         }
//     };
// });

app.directive('ngFiles', [
    '$parse',
    function ($parse)
    {

        function file_links(scope, element, attrs)
        {
            var onChange = $parse(attrs.ngFiles);
            element.on('change', function (event)
            {
                onChange(scope, {$files: event.target.files});
            });
        }

        return {
            link: file_links
        }
    }
]);

app.directive('ngEnter', function ()
{
    return function (scope, element, attrs)
    {
        element.bind("keydown keypress", function (event)
        {
            if (event.which === 13)
            {
                scope.$apply(function ()
                {
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
});

// app.filter("dateRange", function ($filter)
// {
//     return function (items, from, to, dateField)
//     {
//
//         if (from != null && to != null && from != undefined && to != undefined)
//         {
//             startDate = moment(from, 'DD-MM-YYYY');
//             endDate = moment(to, 'DD-MM-YYYY');
//             return $filter('filter')(items, function (elem)
//             {
//                 var date = moment(elem[dateField], 'DD-MM-YYYY');
//                 return date >= startDate && date <= endDate;
//             });
//         }
//         else
//         {
//             return items;
//         }
//     }
// });
//
// app.filter('limitChar', function () {
//     return function (content, length, tail) {
//         if (isNaN(length))
//             length = 100;
//
//         if (tail === undefined)
//             tail = "...";
//
//         if (content.length <= length || content.length - tail.length <= length) {
//             return content ? String(content).replace(/<[^>]+>/gm, '') : '';
//         }
//         else {
//             return String(content).substring(0, length-tail.length) ? String(content).replace(/<[^>]+>/gm, '') : '' + tail;
//         }
//     };
// });
//
// app.directive('onFinishRender', function () {
//     return {
//         restrict: 'A',
//         link: function (scope, element, attr) {
//             if (scope.$last === true) {
//                 element.ready(function () {
//
//                 });
//             }
//         }
//     }
// });
