import Apoc from './Apoc.js';

function App() {
  return (
    <div className="container mx-auto">
      <header className="App-header">
	  	<h1 className="text-center text-6xl">Apoc</h1>
		<h2 className="text-center text-4xl">A <span className="rainbow">matrix</span> of Color Contrasts</h2>
      </header>
	  <Apoc />
	  <footer>
		<p className="text-center">Built with ❤️  by <a href="https://aaron.jorb.in">Aaron Jorbin</a></p>
	  </footer>
    </div>
  );
}

export default App;
