const liffId = '2007471158-y25QK5Ae';
const scriptURL = 'https://script.google.com/macros/s/AKfycbxSUuNJGkA8m8mrLuf3Y0ynw57tXxP5EIV1O6otCayZ9Eb9DsI6YECuCgk_Tn5hWHuY/exec';

document.addEventListener('DOMContentLoaded', () => {
  liff.init({ liffId });

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
          searchStatus.innerText = 'ไม่พบข้อมูล กรุณาลงทะเบียนใหม่';
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
    }).then(() => {
      leaveStatus.innerText = 'บันทึกข้อมูลเรียบร้อย';
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
