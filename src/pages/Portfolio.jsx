// src/pages/Portfolio.jsx

function Portfolio() {
  return (
    <div>
      <header>
        <h1>Miguel Code</h1>
        <nav>
          <a href="#about">Tentang Saya</a>
          <a href="#projects">Proyek</a>
          <a href="#contact">Kontak</a>
        </nav>
      </header>

      <main>
        <section id="about">
          <h2>Tentang Saya</h2>
          <p>Halo! Saya seorang web developer dengan passion untuk menciptakan aplikasi yang bersih dan fungsional.</p>
        </section>

        <section id="projects">
          <h2>Proyek Saya</h2>
          {/* Nanti di sini kita akan menampilkan daftar proyek */}
        </section>
      </main>

      <footer>
        <p>&copy; 2025 Miguelcode. Dibuat dengan penuh semangat di Palu.</p>
      </footer>
    </div>
  );
}

export default Portfolio;