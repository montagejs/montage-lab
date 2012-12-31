# Progress

![Progress](https://raw.github.com/montagejs/montage-lab/master/skeleton/mobile/components/progress.reel/screenshot.png)

The Progress component wraps an HTML `<progress>` element.

## How to use

```html
<progress data-montage-id="progress"></progress>
```

```json
"progress": {
    "prototype": "montage/ui/progress.reel",
    "properties": {
        "element": {"#": "progress"}
    }
}
```


## Available properties

* `max` - This attribute describes how much work the task indicated by the progress element requires.
* `value` - This attribute specifies how much of the task that has been completed.



## Customizing with CSS

* `.montage-Progress` - The track of the Progress element
* `.montage-Progress-bar` - The bar of the Progress element

```css
.montage-Progress {
    border-color: blue;
}
.montage-Progress-bar {
    background-color: pink;
}
```



## Browser support

* Chrome (latest)
* Safari 5+
* Firefox 4+
* Opera (latest)
