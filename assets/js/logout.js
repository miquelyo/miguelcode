import { supabase } from './supabase.js';

document.addEventListener('DOMContentLoaded', () => {
  const logoutDesktop = document.getElementById('logoutBtn');
  const logoutMobile = document.getElementById('logoutBtnMobile');

  const handleLogout = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: 'Yakin mau logout?',
      text: 'Kamu akan keluar dari MiguelCode',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Logout',
      cancelButtonText: 'Batal',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;

        await Swal.fire({
          title: 'Berhasil logout',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });

        window.location.href = '../../login.html';
      } catch (err) {
        console.error('Logout failed:', err.message);
        Swal.fire('Oops!', 'Gagal logout. Coba lagi.', 'error');
      }
    }
  };

  if (logoutDesktop) {
    logoutDesktop.addEventListener('click', handleLogout);
  }

  if (logoutMobile) {
    logoutMobile.addEventListener('click', handleLogout);
  }
});
