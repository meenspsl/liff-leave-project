const liffId = '2007471158-y25QK5Ae';
const scriptURL = 'https://script.google.com/a/macros/yru.ac.th/s/AKfycbwpL9HEOd0QPBiH1gx6nmncLTP1NBGuTnTmtG4G0tlNJJK-DbNMC3s81iHe2OWTohz8/exec';

document.addEventListener('DOMContentLoaded', function () {
  liff.init({ liffId });

  const newId = document.getElementById('newId');
  const newName = document.getElementById('newName');
  const newLastName = document.getElementById('newLastName');
  const registerBtn = document.getElementById('registerBtn');
  const regStatus = document.getElementById('regStatus');

  registerBtn.onclick = () => {
    const payload = {
      action: 'register',
      id: newId.value,
      name: newName.value,
      lastname: newLastName.value
    };

    fetch(scriptURL, {
      method: 'POST',
      body: JSON.stringify(payload)
    }).then(res => res.text()).then(() => {
      regStatus.innerText = 'เพิ่มข้อมูลเรียบร้อย';
    }).catch(() => {
      regStatus.innerText = 'เกิดข้อผิดพลาด';
    });
  };
});
