# react-strip-text
React component that strips given text

```
// Provide array with two labels for strip toggler - [ 'see more', 'see less' ]
labels: PropTypes.arrayOf(PropTypes.string),
// callback on toggle event
onToggleComplete: PropTypes.func,
// Whether strip text by word or characters
stripByWord: PropTypes.bool, // default: false
stripLength: PropTypes.number, // default: 60
text: PropTypes.string.isRequired,
// Is user able to toggle strip
toggleable: PropTypes.bool,
```
