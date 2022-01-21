let category = null

const shareButton = document.querySelector('#submit')
const allButtons = document.querySelectorAll('.button')
const jsConfetti = new JSConfetti()

allButtons.forEach((button) => {
  button.onclick = () => {
    allButtons.forEach((button) => button.classList.remove('selected'))
    button.classList.add('selected')
    category = button.id
    shareButton.style.display = 'flex'
  }
})

shareButton.onclick = async () => {
  try {
    if (!category) return
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    const url = tab.url
    if (!url.startsWith('http://') && !url.startsWith('https://')) return
    shareButton.innerText = '⌛'
    shareButton.classList.add('disabled')
    const apiUrl = `https://unboring-sg.vercel.app/api/metascraper?url=${encodeURIComponent(
      url
    )}&category=${category}&channel=chrome_extension`
    console.log(apiUrl)
    await fetch(apiUrl)
    shareButton.innerText = 'Thank you! 🎉'
    explode()
  } catch (e) {
    console.error(e)
  }
}

function explode() {
  if (category) {
    jsConfetti.addConfetti({
      emojis: emojiFromCategory(category),
      emojiSize: 40,
      confettiNumber: 50,
    })
  }
}

function emojiFromCategory() {
  switch (category) {
    case 'do':
      return ['🎣', '🐡', '🐠']
    case 'eat':
      return ['🍕', '🍔', '🍟']
    case 'learn':
      return ['📖', '📚', '📕']
    default:
      return undefined
  }
}
