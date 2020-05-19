function selected(id){
    const elem = document.getElementById(id);

    if(elem.classList.contains("list-group-item-success"))
        elem.classList.remove("list-group-item-success");
    else
        elem.classList.add("list-group-item-success");
}