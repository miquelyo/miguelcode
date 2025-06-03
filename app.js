const supabase = window.supabase.createClient(
  'https://stlmvxnmscdqlmgeatlx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0bG12eG5tc2NkcWxtZ2VhdGx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5MTAxMDksImV4cCI6MjA2NDQ4NjEwOX0.gWqbTikgN2ot3JY7k7OWMmk9_Xj0f30NoRWGt3XL31c'
);

async function loadProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*, clients(nama_klien)')
    .order('id', { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  const container = document.getElementById('project-list');
  container.innerHTML = '';

  data.forEach(project => {
    const card = document.createElement('div');
    card.className = 'card mb-3';
    card.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${project.nama_proyek}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Klien: ${project.clients.nama_klien}</h6>
        <p>${project.deskripsi || '-'}</p>
        <p>Status: <strong>${project.status}</strong></p>
        <div class="progress">
          <div class="progress-bar" role="progressbar" style="width: ${project.progress_persen}%;">
            ${project.progress_persen}%
          </div>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

loadProjects();
