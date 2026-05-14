# input-radio

柔軟なラジオボタンインターフェースを提供するカスタムHTML要素 `<input-radio>` です。標準の `<option>` タグを使用して宣言的に設定するか、JavaScriptの配列を使用して動的にデータを流し込むことができます。

## デモ

実際のコンポーネントの動作はこちらで確認できます: **[https://code4fukui.github.io/input-radio/](https://code4fukui.github.io/input-radio/)**

## 特徴

- **宣言的または動的:** 標準のHTML `<option>` タグを使用するか、`data` プロパティ経由でJavaScriptの配列からデータを流し込むことができます。
- **テーブルレイアウト:** オプションのCSSスタイルシート (`input-radio.table.css`) を使用することで、オブジェクトの配列をすっきりとしたテーブルレイアウトで表示できます。
- **標準的なフォームの挙動:** 標準の入力要素と同様に動作し、バリデーション用の `required` 属性をサポートします。
- **カスタマイズ可能:** 標準のCSSで簡単にスタイリングできます。

## 使い方

### 1. コンポーネントのインポート

HTMLファイルにESモジュールとしてスクリプトを読み込みます。

```html
<script type="module" src="https://code4fukui.github.io/input-radio/input-radio.js"></script>
```

### 2. 基本的な使い方（`<option>` タグを使用）

標準の `<option>` タグを使用して、宣言的にラジオボタンを定義します。`selected` 属性でデフォルト値を設定します。

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

### 3. 動的データとテーブルレイアウト

`.data` プロパティにJavaScriptの配列を設定することで、オプションを動的に生成します。オブジェクトの配列の場合、オプションの `input-radio.table.css` を使用してテーブルとしてレンダリングできます。

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

### プロパティ

- `.value`: (Getter/Setter) 現在選択されている値を取得または設定します。データバインドされたオブジェクトの配列の場合、これは配列のインデックスに対応します。
- `.data`: (Setter) JavaScriptの配列からオプションを設定します。配列には文字列またはオブジェクトを含めることができます。

### イベント

- `onchange`: 選択された値が変更されたときに発火する標準のイベントハンドラです。

## ライセンス

MIT License ([LICENSE](LICENSE) を参照)

## クレジット

Created by [Taisuke Fukuno](https://fukuno.jig.jp/3270) / [Code for FUKUI](https://github.com/code4fukui/).
