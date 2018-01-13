window.addEventListener('load', function(e) {
  setTimeout(function() {
    let createStyle = () => {
      let style = document.createElement('style')
      style.innerHTML = '.EmbeddedTweet {border: none}'
      return style
    }
    const twitterCards = document.querySelectorAll('.card-items twitterwidget')
    const numberOfCards = twitterCards.length
    for (let i = 0; i < numberOfCards; i++) {
      twitterCards[i].shadowRoot.appendChild(createStyle())
    }
  }, 3000)
})
