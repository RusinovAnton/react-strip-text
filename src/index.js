import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'


class StripText extends Component {
  static defaultProps = {
    labels: ['see more', 'see less'],
    stripByWord: false,
    stripLength: 60,
    toggleable: true,
  }

  static propTypes = {
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
  }

  static stripTextByWord = (text, length) => {
    let strippedText = text.split(' ');
    strippedText.length = length;

    return `${strippedText.join(' ')}...`;
  }

  static stripTextByCharachter = (text, length) => {
    return `${text.slice(0, length)}...`
  }

  state = {
    cut: true
  }

  stripText = () => {
    const { cut } = this.state;
    const { text, stripLength, stripByWord, toggleable } = this.props;

    if ((!toggleable || cut) && this.canBeCut()) {
      return stripByWord ? 
        StripText.stripTextByWord(text, stripLength) 
        : StripText.stripTextByCharachter(text, stripLength);
    }

    return text;
  }

  canBeCut = () => {
    const {text, stripLength, stripByWord} = this.props;

    if (stripByWord) {
      return text.split(' ').length >= stripLength
    }

    return text.length >= stripLength
  }

  toggleStrip = () => {
    const { onToggleComplete } = this.props;

    this.setState(({ cut }) => ({ cut: !cut }), () => {
      if (typeof onToggleComplete === 'function') {
        onToggleComplete(this.state.cut);
      }
    });
  }

  render() {
    const { cut } = this.state;
    const { labels, text, toggleable, stripLength } = this.props;
    const [seeMore, seeLess] = labels;

    if (typeof text === 'undefined') {
      return null;
    }

    return ( 
      <div className={classNames('ReactStripText', {
          'ReactStripText--cut': cut && this.canBeCut(),
          'ReactStripText--toggleable': toggleable,
        })}
      > 
        <p className="ReactStripText__body">{ this.stripText() }</p>
        {
          (toggleable && this.canBeCut()) && (
            <span 
              className = "ReactStripText__seeMoreLabel cursor-default"
              onClick = { this.toggleStrip }
            >
              { cut ? seeMore : seeLess }
            </span>
          )
        } 
      </div>
    );
  }
}

export default StripText
