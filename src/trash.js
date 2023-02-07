function Food({ name }) {
   console.log(name);

   return (
      <h1>You're fool {name}</h1>
   );
}

function Combine({ count, food }) {
   return (
      <h2>count: {count}, food: {food}</h2>
   );
}
Combine.propTypes = {
   count: PropTypes.number.isRequired,
   food: PropTypes.string.isRequired
}


const img = [
   {
      count: 12,
      food: "cum"
   },
   {
      count: 21,
      food: "kal"
   }
]

class Counter extends React.Component {
   state = {
      count: 0
   };
   add = () => {
      this.setState(s => ++s.count)
   }
   remove = () => {
      this.setState(s => --s.count)
   }
   render() {

      return (
         <div>
            <h1>Count of Leshka: {this.state.count}</h1>
            <button onClick={this.add}>Add new Leshka</button>
            <button onClick={this.remove}>Remove new Leshka</button>
         </div>
      );
   }
}

