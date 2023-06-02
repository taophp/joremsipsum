# JoremSipsum
A JavaScript framework that helps to generate fake content to test your web design.

## Installation

Include `joremsipsum.js` script in the HTML `<head>` of your page :

```html
<script src="/path/to/jorempsipsum.js"></script>
```

## Usage
### Image placeholders

```html
<div data-jo="img" data-jo-width="500" data-jo-height="160"></div>

<div data-jo="img" data-jo-width="500" data-jo-height="160" data-jo-text="With some text"></div>

<div data-jo="img" data-jo-text="Yellow background" data-jo-bg-color="yellow"></div>

<div data-jo="img" data-jo-photo="design"></div>

<div data-jo="img" data-jo-photo="car,building"></div>

<div data-jo="img" data-jo-photo="design,car/all"></div>
```


### Texts from Wikipedia

```html
<div data-jo="wiki" data-jo-paragraphs="1"></div>
<div data-jo="wiki"></div>
