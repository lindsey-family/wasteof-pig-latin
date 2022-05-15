const content = document.getElementById('content')
const form = document.getElementById('form')
const msg = document.getElementById('msg')

form.addEventListener('submit', function(event) {
  event.preventDefault();
  msg.innerText = 'posting...'
  fetch('/api/pig-latin', {
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 'content': content.value }),
    method: 'POST'
  })
        .then(res => res.json())
        .then(data => {
          if (data.msg == 'ok') {
            msg.innerHTML = `posted successfully <a href="https://wasteof.money/posts/${data.data.id}">(link)</a>`
          } else {
            msg.innerText = 'something went wrong'
          }
        })
})