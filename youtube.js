// let inputBox = document.getElementById("youtubever");
// inputBox.addEventListener("input", (event) => {

//   let a=event.target;

//   <iframe width="420" height="345" src="https://www.youtube.com/results?search_query=chiken"></iframe>

// }) 
document.getElementById('youtubever').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
      var query = this.value;
      var url = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(query);
      window.open(url, '_blank');
  }
});