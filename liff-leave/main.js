const liffId = '2007471158-y25QK5Ae';
const scriptURL = 'https://script.google.com/a/macros/yru.ac.th/s/AKfycbwpL9HEOd0QPBiH1gx6nmncLTP1NBGuTnTmtG4G0tlNJJK-DbNMC3s81iHe2OWTohz8/exec';

document.addEventListener('DOMContentLoaded', function () {
  liff.init({ liffId }).then(() => {
    // ready
  });

  const idInput = document.getElementById('idInput');
  const searchBtn = document.getElementById('searchBtn');
  const searchStatus = document.getElementById('searchStatus');

  const nameInput = document.getElementById('nameInput');
  const lastnameInput = document.getElementById('lastnameInput');
  const leaveForm = document.getElementById('leaveForm');

  const leaveBtn = document.getElementById('leaveBtn');
  const backBtn = document.getElementById('backBtn');
  const leaveStatus = document.getElementById('leaveStatus');

  searchBtn.onclick = () => {
    const id = idInput.value.trim();
    if (!id) return;

    searchStatus.innerText = 'กำลังค้นหา...';

    fetch(`${scriptURL}?action=search&id=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.found) {
          nameInput.value = data.name;
          lastnameInput.value = data.lastname;
          leaveForm.classList.remove('d-none');
          searchStatus.innerText = '';
        } else {
          searchStatus.innerText = 'ไม่พบข้อมูลพนักงาน กรุณาลงทะเบียนใหม่';
        }
      }).catch(() => {
        searchStatus.innerText = 'เกิดข้อผิดพลาด';
      });
  };

  leaveBtn.onclick = () => {
    const payload = {
      action: 'leave',
      id: idInput.value,
      name: nameInput.value,
      lastname: lastnameInput.value,
      startDate: document.getElementById('startDate').value,
      endDate: document.getElementById('endDate').value,
      reason: document.getElementById('reason').value
    };

    fetch(scriptURL, {
      method: 'POST',
      body: JSON.stringify(payload)
    }).then(res => res.text()).then(() => {
      leaveStatus.innerText = 'บันทึกข้อมูลสำเร็จ';
    }).catch(() => {
      leaveStatus.innerText = 'เกิดข้อผิดพลาดในการบันทึก';
    });
  };

  backBtn.onclick = () => {
    idInput.value = '';
    leaveForm.classList.add('d-none');
    searchStatus.innerText = '';
  };
});
