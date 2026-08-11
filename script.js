document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('contactForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const purpose = document.getElementById('purpose').value;
  const goal = document.getElementById('goal').value.trim();
  const message = document.getElementById('message').value.trim();

  const subject = `【Fukushima英語塾】お問い合わせ：${purpose}`;
  const body = [
    `お名前：${name}`,
    `メールアドレス：${email}`,
    `ご希望：${purpose}`,
    `現在の英語レベル・目標：${goal || '未記入'}`,
    '',
    'お問い合わせ内容：',
    message
  ].join('\n');

  window.location.href = `mailto:fukushimajyukubunkyoku@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
