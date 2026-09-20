# Loading indicators

For a decorative loading indicator, use a public [spinner layer](./spinner.md) on a sized host:

```json jaml-playground
{
    "type": "indicator",
    "cap": "Loading…",
    "styles": ["layer.spinner.orbit", "css(position:relative;width:10rem;height:10rem)"]
}
```

A spinner layer supplies a visual effect. Application code owns loading state and whether interaction is blocked. Use the [popup API](../../JAM-UI/popup.md) when the operation needs a transient surface.

`layer.loader` is not part of the public style registry. Do not use `Styles.layer.loader.spinner` as a public API.
