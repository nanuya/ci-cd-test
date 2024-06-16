import Todos from './views';

function App() {
  return (
    <Todos.Wrap>
      <Todos.Top />
      <Todos.Nav />
      <Todos.List />
    </Todos.Wrap>
  );
}

export default App;
