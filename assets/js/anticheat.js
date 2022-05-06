const isWinner = JSON.parse(localStorage.getItem('isWinner'));

window.addEventListener('load', () => {
  if (!isWinner) {
    alert('You are trying to cheat, BOOOH');
    window.location.replace('/index.html')
  }
})