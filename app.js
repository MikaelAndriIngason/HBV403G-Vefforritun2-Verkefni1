window.onload = function() { 
    fetch('./data/index.json').then(response => response.json()).then(data => addDeildir(data)); 
};

function addDeildir(data) {
    let deildir = document.getElementById("deildir");

    data.forEach(e => {
        let div = document.createElement("div");
        div.classList.add("deild");

        let title = document.createElement("h3");
        title.innerText = e.title;

        let p = document.createElement("p");
        p.innerText = e.description;

        let link = document.createElement("a");
        link.innerText = "Sjá nánar ⯈";
        link.href = "./dist/" + e.csv.slice(0, -3) + "html";

        div.appendChild(title);
        div.appendChild(p);
        div.appendChild(link);
        deildir.appendChild(div);
    });
}