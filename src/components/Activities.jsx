import { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient';
import { FiPlus, FiCalendar } from 'react-icons/fi';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';

function Activities({ refreshKey, onDataChange }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const modal = useRef(null);
  
  const [newActivityName, setNewActivityName] = useState('');
  const [newActivityType, setNewActivityType] = useState('task');

  // CSS kustom untuk DayPicker agar sesuai dengan tema gelap
  const css = `
    .rdp {
      --rdp-cell-size: 40px;
      --rdp-accent-color: #22d3ee;
      --rdp-background-color: #4b5563;
      color: #d1d5db;
      margin: 0;
    }
    .rdp-months {
      background-color: transparent;
      padding: 0;
    }
    .rdp-caption_label {
      font-weight: bold;
      color: white;
    }
    .rdp-head_cell {
      color: #9ca3af;
    }
    .rdp-nav_button {
      color: #9ca3af;
    }
    .rdp-day_today {
      color: #22d3ee;
      font-weight: bold;
    }
  `;

  useEffect(() => {
    async function fetchActivities() {
      if (!selectedDate) return;
      setLoading(true);
      const dateString = format(selectedDate, 'yyyy-MM-dd');
      const { data, error } = await supabase.from('daily_activities').select('*').eq('activity_date', dateString).order('created_at', { ascending: true });
      if (error) console.error('Error fetching activities:', error);
      else setActivities(data || []);
      setLoading(false);
    }
    fetchActivities();
  }, [refreshKey, selectedDate]);
  
  const handleToggle = async (id, currentStatus) => {
    const { error } = await supabase.from('daily_activities').update({ is_completed: !currentStatus }).eq('id', id);
    if (error) alert(error.message);
    else onDataChange();
  };

  const handleAddActivity = async (e) => {
    e.preventDefault();
    if (!newActivityName.trim() || !selectedDate) return;
    const dateString = format(selectedDate, 'yyyy-MM-dd');
    const { error } = await supabase.from('daily_activities').insert([
      { activity_name: newActivityName, activity_date: dateString, activity_type: newActivityType }
    ]);
    if (error) alert(error.message);
    else {
      setNewActivityName('');
      modal.current.close();
      onDataChange();
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Kolom Kiri: Kalender */}
        <div className="md:col-span-1 bg-gray-800/50 backdrop-blur-md border border-white/10 shadow-lg rounded-xl p-4 flex justify-center">
          <style>{css}</style>
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            showOutsideDays
            fixedWeeks
          />
        </div>

        {/* Kolom Kanan: Daftar Aktivitas */}
        <div className="md:col-span-2 bg-gray-800/50 backdrop-blur-md border border-white/10 shadow-lg rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-white">
              Jadwal untuk {format(selectedDate, 'd MMM yyyy')}
            </h3>
            <button className="btn btn-primary btn-sm" onClick={() => modal.current.showModal()}>
              <FiPlus /> Tambah
            </button>
          </div>
          
          <div className="space-y-3">
            {loading ? <p className="text-gray-400">Memuat...</p> : (
              <AnimatePresence>
                {activities.map(activity => (
                  <Motion.div 
                    key={activity.id}
                    layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${
                      activity.is_completed ? 'bg-green-500/10' : 'bg-white/5'
                    }`}
                  >
                    {activity.activity_type === 'task' 
                      ? (
                        <input 
                          type="checkbox" 
                          checked={activity.is_completed} 
                          onChange={() => handleToggle(activity.id, activity.is_completed)}
                          className="checkbox checkbox-primary flex-shrink-0" 
                        />
                      )
                      : <FiCalendar className="text-cyan-400 flex-shrink-0" />
                    }
                    <span className={`text-white ${activity.is_completed ? 'line-through text-gray-500' : ''}`}>
                      {activity.activity_name}
                    </span>
                  </Motion.div>
                ))}
              </AnimatePresence>
            )}
            {!loading && activities.length === 0 && (
              <div className="text-center py-10"><p className="text-gray-500">Tidak ada jadwal untuk tanggal ini.</p></div>
            )}
          </div>
        </div>
      </div>

      {/* Modal untuk menambah aktivitas */}
      <dialog ref={modal} className="modal">
        <div className="modal-box bg-gray-800">
            <h3 className="font-bold text-lg">Tambah Jadwal Baru</h3>
            <p className="py-2 text-sm text-gray-400">Untuk tanggal: {selectedDate ? format(selectedDate, 'd MMMM yyyy') : ''}</p>
            <form onSubmit={handleAddActivity} className="py-4 space-y-4">
              <input 
                type="text" 
                placeholder="Aktivitas atau event..." 
                className="input input-bordered w-full bg-white/5" 
                value={newActivityName} 
                onChange={e => setNewActivityName(e.target.value)} 
                required
              />
              <div className="join w-full">
                <button type="button" onClick={() => setNewActivityType('task')} className={`btn join-item w-1/2 ${newActivityType === 'task' ? 'btn-primary' : ''}`}>Task</button>
                <button type="button" onClick={() => setNewActivityType('event')} className={`btn join-item w-1/2 ${newActivityType === 'event' ? 'btn-primary' : ''}`}>Event</button>
              </div>
              <div className="modal-action mt-6">
                <form method="dialog" className='w-full'><button className="btn btn-ghost w-1/2">Batal</button></form>
                <button type="submit" className="btn btn-primary w-1/2">Simpan</button>
              </div>
            </form>
        </div>
      </dialog>
    </>
  );
}

export default Activities;

