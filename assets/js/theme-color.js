function getComputedBackgroundColor() {
    // Ambil elemen utama yang punya background
    const main = document.querySelector('main');
    if (!main) return;

    const bgColor = window.getComputedStyle(main).backgroundColor;

    // Ubah RGB ke HEX (optional, supaya lebih clean)
    const hex = rgbToHex(bgColor);

    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) {
        themeMeta.setAttribute('content', hex);
    }
}

// Fungsi bantu ubah rgb(255,255,255) → #ffffff
function rgbToHex(rgb) {
    const result = rgb.match(/\d+/g);
    if (!result || result.length < 3) return '#ffffff';
    return (
        '#' +
        result
            .slice(0, 3)
            .map((x) => parseInt(x).toString(16).padStart(2, '0'))
            .join('')
    );
}

// Jalankan saat halaman load
window.addEventListener('DOMContentLoaded', getComputedBackgroundColor);
