const liffId = '2007471158-y25QK5Ae';
const scriptURL = 'https://script.google.com/a/macros/yru.ac.th/s/AKfycbwkF9bIFSLi9_PD86cRYhQFpyZhhdoyq5yN8aAlDh1BMe0BGXT2LC/exec';

document.addEventListener('DOMContentLoaded', () => {
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
    }).then(() => {
      regStatus.innerText = 'เพิ่มข้อมูลเรียบร้อยแล้ว';
    }).catch(() => {
      regStatus.innerText = 'เกิดข้อผิดพลาด';
    });
  };
});
