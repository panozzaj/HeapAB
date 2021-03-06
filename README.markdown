# HeapAB.js: pure js + Heap Analytics A/B testing

This pure JavaScript library allows you to do simple A/B testing working only
on your client-side code. All of the experiment data is sent to
[Heap](http://heapanalytics.com/), so **you don't need to configure anything
server side**. This could be ideal for split testing a static site like one
generated by Jekyll.

## Features

- Easy to set up
  - You just list the possible variants, randomization is handled
    automatically.
  - You just mark the html elements you want to test on with a class,
    substitution happens automatically.
  - No need to set anything up server side, the data is stored in Heap.
- Consistent user experience: The selected variant is stored in a cookie, so
  the user will see the same one when coming back.
- No external dependencies: Pure javascript, you just need to include the Heap
  setup.
- Flexible: You can conduct multiple, independent experiments at the same time.
  Each experiment will use a different custom variable/dimension.

## Usage

### 1. Include heapab.js

```html
<script type='text/javascript' src='heapab.js'></script>
```

### 2. Define your tests

```javascript
// Initialize Heap tracker

HeapAB.init({
  experiment1_name: [{
      name: 'variant1_name',
      'experiment1_class1_name': '<strong>Html content for variant 1 class 1</strong>',
      'experiment1_class2_name': 'Html content for variant 1 class 2'
    }, {
      name: 'variant2_name',
      'experiment1_class1_name': '<strong>Html content for variant 2 class 1</strong>',
      'experiment1_class2_name': 'Html content for variant 2 class 2'
    }
  ]
});
```

### 3. Apply the experiment classes to your html content

```html
<div class='experiment1_class1_name'>
  This content will be replaced by HeapAB
</div>

<span class='experiment1_class2_name'>This text will be replaced too</span>
```

### 4. Call applyHtml() on load

```html
<script type='text/javascript'>
  window.onload = function() {
    HeapAB.applyHtml();
  };
</script>
```

NB: If you're using jQuery in your website, it's even better to call
`applyHtml` in the `$(document).ready(...)` handler.

### 5. Run your experiment

Publish your code, wait for some visitors to come...

### 6. Analyze your data

TODO

## Acknowledgments

This library is based on the work of Daniele Mazzini in
[ABalytics](https://github.com/danmaz74/ABalytics). If you have a need for
integration with Google Analytics, you might check that out.

For more information on how I thought about creating this, check out
[my blog post on creating HeapAB](http://www.panozzaj.com/blog/2015/12/13/split-testing-static-sites/).

## License

The MIT License (MIT)
Copyright (c) 2012 Daniele Mazzini
Copyright (c) 2015 Anthony Panozzo

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Softwareis furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Donated by [hashtagify.me](http://hashtagify.me/)
