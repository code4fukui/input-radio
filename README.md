# input-radio

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A custom HTML element `<input-radio>` that provides a flexible radio button interface. Use standard `<option>` tags for declarative setup or populate it dynamically with a JavaScript array.

## Demo

View the component in action: **[https://code4fukui.github.io/input-radio/](https://code4fukui.github.io/input-radio/)**

## Features

- **Declarative or Dynamic:** Use standard HTML `<option>` tags or populate from a JavaScript array via the `data` property.
- **Table Layout:** An optional CSS stylesheet (`input-radio.table.css`) provides a clean table layout for object arrays.
- **Standard Form Behavior:** Works like a standard input, supporting the `required` attribute for validation.
- **Customizable:** Easily styled with standard CSS.

## Usage

### 1. Import the Component

Include the script as an ES module in your HTML file.

```html
<script type="module" src="https://code4fukui.github.io/input-radio/input-radio.js"></script>
```

### 2. Basic Usage (with `<option>` tags)

Define your radio buttons declaratively using standard `<option>` tags. The `selected` attribute sets the default value.

```html
<input-radio id="radio1">
  <option>Apple</option>
  <option selected>Banana</option>
  <option value="orange-value">Orange</option>
</input-radio>

<script>
  radio1.onchange = () => {
    console.log('Selected value:', radio1.value);
  };
</script>
```

### 3. Dynamic Data and Table Layout

Populate the options dynamically by setting the `.data` property with a JavaScript array. For arrays of objects, you can use the optional `input-radio.table.css` to render a table.

```html
<!-- 1. Include the table stylesheet -->
<link rel="stylesheet" href="https://code4fukui.github.io/input-radio/input-radio.table.css">

<!-- 2. Add the component with the 'table' class -->
<input-radio class="table" id="radio2"></input-radio>
<p>Selected index: <span id="result"></span></p>

<script type="module">
  const radio2 = document.getElementById('radio2');

  // 3. Populate with an array of objects
  radio2.data = [
    { name: "ABC", num: 33 },
    { name: "DEF", num: 44 },
    { name: "GHI", num: 55 },
  ];

  // 4. Set an initial value (matches the array index)
  radio2.value = 1; // Selects "DEF"

  // 5. Listen for changes
  radio2.onchange = () => {
    document.getElementById('result').textContent = radio2.value;
  };
</script>
```

## API

### Properties

-   `.value`: (Getter/Setter) Gets or sets the currently selected value. For data-bound object arrays, this corresponds to the array index.
-   `.data`: (Setter) Sets the options from a JavaScript array. The array can contain strings or objects.

### Events

-   `onchange`: A standard event handler that fires when the selected value changes.

## License

MIT License (see [LICENSE](LICENSE))

## Attribution

Created by [Taisuke Fukuno](https://fukuno.jig.jp/3270) / [Code for FUKUI](https://github.com/code4fukui/).