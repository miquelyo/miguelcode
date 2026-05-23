import { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import { motion as Motion, AnimatePresence } from 'framer-motion';

function Projects({ refreshKey, onDataChange }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const modal = useRef(null);

  // State untuk form
  const [editingProject, setEditingProject] = useState(null);
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [progress, setProgress] = useState(0);
  const [note, setNote] = useState('');

  // Fungsi untuk membersihkan form
  const clearForm = () => {
    setEditingProject(null);
    setProjectName('');
    setDescription('');
    setProgress(0);
    setNote('');
  };

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (error) console.error("Error fetching projects", error);
      else setProjects(data);
      setLoading(false);
    }
    fetchProjects();
  }, [refreshKey]);

  const handleAddClick = () => {
    clearForm();
    modal.current.showModal();
  };

  const handleEditClick = (project) => {
    setEditingProject(project);
    setProjectName(project.project_name);
    setDescription(project.description || '');
    setProgress(project.progress);
    setNote(project.note || '');
    modal.current.showModal();
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const projectData = {
      project_name: projectName,
      description,
      progress: Number(progress),
      note,
      status: Number(progress) === 100 ? 'Completed' : 'In Progress'
    };

    let error;
    if (editingProject) {
      const { error: updateError } = await supabase.from('projects').update(projectData).eq('id', editingProject.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase.from('projects').insert([projectData]);
      error = insertError;
    }

    if (error) {
      alert(error.message);
    } else {
      clearForm();
      modal.current.close();
      onDataChange();
    }
  };

  const handleDelete = async (project) => {
    if (project.progress < 100) {
      alert("Projects hanya bisa dihapus jika progres sudah 100% (Selesai).");
      return;
    }
    if (window.confirm(`Apakah Anda yakin ingin menghapus Projects "${project.project_name}"?`)) {
      const { error } = await supabase.from('projects').delete().eq('id', project.id);
      if (error) alert(error.message);
      else onDataChange();
    }
  };

  if (loading) return <p className="text-gray-400">Memuat Projects...</p>;

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Daftar Projects Anda</h2>
        <button 
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white 
                     bg-white/5 backdrop-blur-sm border border-white/20 
                     hover:bg-white/10 transition-colors"
          onClick={handleAddClick}
        >
          <FiPlus /> Tambah Projects
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-16 bg-gray-800/50 rounded-2xl border border-dashed border-gray-700">
          <p className="text-gray-400">Belum ada Projects. Ayo mulai sesuatu yang baru!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {projects.map((project, index) => (
              <Motion.div 
                key={project.id}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg flex flex-col overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                exit={{ opacity: 0, y: 50}}
              >
                <div className="p-6 flex-grow">
                  <div className="flex justify-between items-start">
                    <h2 className="text-lg font-bold text-white mb-2">{project.project_name}</h2>
                    <div className={`badge ${project.status === 'Completed' ? 'badge-success' : 'badge-info'} badge-outline text-xs`}>
                      {project.status}
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 min-h-[40px] line-clamp-2">{project.description}</p>
                  {project.note && (
                    <div className="mt-4 p-3 bg-black/20 rounded-lg text-xs text-gray-300 italic">
                      <span className="font-semibold not-italic">Note:</span> {project.note}
                    </div>
                  )}
                </div>
                
                <div className="p-6 border-t border-white/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-300">Progress</span>
                    {/* DIKEMBALIKAN: Teks persentase sekarang ada di sini */}
                    <span className="text-xs font-bold text-white">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-black/20 rounded-full h-2 overflow-hidden">
                    <Motion.div 
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
                    />
                  </div>
                  {/* Tombol aksi sekarang selalu terlihat */}
                  <div className="flex justify-end gap-2 mt-4">
                      <button className="btn btn-circle btn-ghost btn-xs" onClick={() => handleEditClick(project)}><FiEdit size={14} /></button>
                      <button className="btn btn-circle btn-ghost btn-xs text-red-500 hover:bg-red-500 hover:text-white" onClick={() => handleDelete(project)}><FiTrash2 size={14} /></button>
                  </div>
                </div>
              </Motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
      
      <dialog ref={modal} className="modal">
        <div className="modal-box bg-gray-800">
          <h3 className="font-bold text-lg">{editingProject ? 'Edit Projects' : 'Projects Baru'}</h3>
          <form onSubmit={handleSubmit} className="py-4 space-y-4">
            <input type="text" placeholder="Nama Projects" className="input input-bordered w-full" value={projectName} onChange={e => setProjectName(e.target.value)} required />
            <textarea className="textarea textarea-bordered w-full" placeholder="Deskripsi Singkat" value={description} onChange={e => setDescription(e.target.value)}></textarea>
            <textarea className="textarea textarea-bordered w-full" placeholder="Note (contoh: kurang bagian A, revisi B)" value={note} onChange={e => setNote(e.target.value)}></textarea>
            <div>
              <label className="label"><span className="label-text text-gray-300">Progress: {progress}%</span></label>
              <input type="range" min="0" max="100" value={progress} onChange={e => setProgress(e.target.value)} className="range range-primary" />
            </div>
            <div className="modal-action mt-6">
              <button type="button" className="btn btn-ghost" onClick={() => { modal.current.close(); clearForm(); }}>Batal</button>
              <button type="submit" className="btn btn-primary">{editingProject ? 'Simpan Perubahan' : 'Simpan Projects'}</button>
            </div>
          </form>
          <form method="dialog"><button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button></form>
        </div>
      </dialog>
    </>
  );
}

export default Projects;