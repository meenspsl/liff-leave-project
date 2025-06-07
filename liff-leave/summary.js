const liffId = '2007471158-y25QK5Ae';
const scriptURL = 'https://script.google.com/a/macros/yru.ac.th/s/AKfycbwpL9HEOd0QPBiH1gx6nmncLTP1NBGuTnTmtG4G0tlNJJK-DbNMC3s81iHe2OWTohz8/exec';

document.addEventListener('DOMContentLoaded', () => {
  liff.init({ liffId }).then(() => {
    loadTodayLeave();
  });

  const todayEl = document.getElementById('today');
  const listEl = document.getElementById('leaveList');
  const totalEl = document.getElementById('totalCount');
  const loadingEl = document.getElementById('loading');

  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  todayEl.innerText = formatThaiDate(today);

  function loadTodayLeave() {
    fetch(`${scriptURL}?action=summary&date=${today}`)
      .then(res => res.json())
      .then(data => {
        loadingEl.style.display = 'none';

        if (data.length === 0) {
          listEl.innerHTML = '<li class="list-group-item text-center text-muted">ไม่มีข้อมูลการลา</li>';
        } else {
          data.forEach(item => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.innerText = `${item.name} ${item.lastname}`;
            listEl.appendChild(li);
          });

          totalEl.innerText = `วันนี้มีนักศึกษาลาทั้งหมด ${data.length} คน`;
          listEl.classList.remove('d-none');
          totalEl.classList.remove('d-none');
        }
      })
      .catch(() => {
        loadingEl.innerText = 'เกิดข้อผิดพลาดในการโหลดข้อมูล';
      });
  }

  function formatThaiDate(isoDate) {
    const [y, m, d] = isoDate.split("-");
    return `${parseInt(d)} ${getThaiMonth(m)} ${parseInt(y) + 543}`;
  }

  function getThaiMonth(m) {
    const months = ["", "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
                    "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
    return months[parseInt(m)];
  }
});
