const elem1 = document.getElementById("corruption-filter");

function selected(){
    if(elem1.classList.contains("list-group-item-success"))
        elem1.classList.remove("list-group-item-success");
    else
        elem1.classList.add("list-group-item-success");
}