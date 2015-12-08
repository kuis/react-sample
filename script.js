/** @jsx React.DOM */

var Counter = React.createClass({
  incrementCount: function(){
    this.setState({
      count: this.state.count + 1
    });
  },
  getInitialState: function(){
     return {
       count: 0
     }
  },
  render: function(){
    return (
      <div className="counter">
        <h1>{this.state.count}</h1>
        <h2>{this.props.name}</h2>
        <button type="button" onClick={this.incrementCount}>Increment</button>
      </div>
    );
  }
});

React.render(<Counter name="World" />, document.getElementById('mount-point'));