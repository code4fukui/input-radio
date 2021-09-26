# input-radio

https://code4fukui.github.io/input-radio/

## usage

```html
<script type="module" src="https://code4fukui.github.io/input-radio/input-radio.js"></script>

<input-radio id="inputradio">
  <option>ABC</option>
  <option selected>DEF</option>
  <option value="ghi">GHI</option>
</input-radio>
```

```html
<script type="module" src="https://code4fukui.github.io/input-radio/input-radio.js"></script>
<link rel="stylesheet" href="https://code4fukui.github.io/input-radio/input-radio.table.css">
<style>
#inputradio5 > span span { /* 幅を広げる */
  width: 10em;
}
</style>
<input-radio class=table id="inputradio5"></input-radio><br>
value: <span id=inputdaio5res></span><br>
<script type="module">
inputradio5.data = [
  { name: "ABC", num: 33 },
  { name: "DEF", num: 44 },
  { name: "GHI", num: 55 },
  { name: "JKLMNOPRQRSTUVWX", num: 66 },
  { name: "あいうえおかきくけこさしすせそ", num: 77 },
];
inputradio5.onchange = () => {
  inputdaio5res.textContent = inputradio5.value;
};
</script>
```

