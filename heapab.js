// Open Source Initiative OSI - The MIT License (MIT):Licensing
//
// The MIT License (MIT)
// Copyright (c) 2012 Daniele Mazzini - https://github.com/danmaz74
// Copyright (c) 2015 Anthony Panozzo - https://github.com/panozzaj
//
// Version: 2.0
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
// IN THE SOFTWARE.

var HeapAB = (function (window, document, undefined) {
    function HeapWrapper(heap) {
        if (!heap) {
            throw new ReferenceError('HeapAB - `heap` not found.');
        }
        this.heap = heap;
    };

    HeapWrapper.prototype.recordExperiment = function (experimentName, variantName) {
        var properties = {}
        properties['experiment_' + experimentName] = variantName;
        // TODO: not sure if these will persist if used multiple times
        this.heap.setEventProperties(properties)
    };

    var readCookie = function (name) {
        var nameEQ = name + '=',
            ca = document.cookie.split(';'),
            i,
            c;
        for (i = 0; i < ca.length; i++) {
            c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    };

    var getElementsByClassName = function (className) {
        var hasClassName = new RegExp('(?:^|\\s)' + className + '(?:$|\\s)'),
            allElements = document.getElementsByTagName('*'),
            results = [],
            element,
            elementClass,
            i = 0;

        for (i = 0;
            ((element = allElements[i]) !== null) && (element !== undefined); i++) {
            elementClass = element.className;
            if (elementClass && elementClass.indexOf(className) !== -1 && hasClassName.test(
                elementClass)) {
                results.push(element);
            }
        }

        return results;
    };

    return {
        changes: [],

        init: function (config) {
            var heapWrapper = new HeapWrapper(window.heap),
                experiment,
                variants,
                variant,
                variantId,
                change;

            // for each experiment, load a variant if the user has already seen
            // it saved for this session, or pick a random one
            for (experiment in config) {
                variants = config[experiment];

                variantId = readCookie('HeapAB_' + experiment);

                if (!variantId || !variants[variantId]) { // not in cookies, pick a random value and store
                    variantId = Math.floor(Math.random() * variants.length);
                    document.cookie = 'HeapAB_' + experiment + '=' + variantId + '; path=/';
                }

                variant = variants[variantId];

                heapWrapper.recordExperiment(experiment, variant.name);

                for (change in variant) {
                    if (change !== 'name') {
                        this.changes.push([change, variant[change]]);
                    }
                }
            }
        },

        // apply the selected variants for each experiment
        applyHtml: function () {
            var elements,
                change,
                i,
                j;

            for (i = 0; i < this.changes.length; i++) {
                change = this.changes[i];
                elements = document.getElementsByClassName ?
                    document.getElementsByClassName(change[0]) :
                    getElementsByClassName(change[0]);

                for (j = 0; j < elements.length; j++) {
                    elements[j].innerHTML = change[1];
                }
            }
        }
    };
})(window, document);
