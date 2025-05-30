function render(){
fetch("components/default.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("main-content-area").innerHTML = data;

    const script = document.createElement("script");
    script.src = "assets/js/charts.js";
    document.body.appendChild(script);
  });

}
render();
