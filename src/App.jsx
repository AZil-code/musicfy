import './assets/styles/layouts.css'


function App() {
  return (
    <div className="spotify-layout">
      <header className="spotify-layout-header" aria-label="Top navigation"></header>
      <aside className="spotify-layout-sidebar" aria-label="Library sidebar"></aside>
      <main className="spotify-layout-main" aria-label="Main content"></main>
      <footer className="spotify-layout-player" aria-label="Player controls"></footer>
    </div>
  )
}

export default App
