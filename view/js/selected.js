// adapt the table to the window size the first time it gets open
adaptTable();

function selected(id){
    const elem = document.getElementById(id);

    if(elem.classList.contains("list-group-item-success"))
        elem.classList.remove("list-group-item-success");
    else
        elem.classList.add("list-group-item-success");
}

function adaptTable(){
    if($(window).width() <= 992){
        $('.table-divider').addClass('w-100');
        $('.corruption-item').removeClass('col-md-4');
        $('.corruption-item').addClass('col-md-6');    
    }
    else{
        $('.table-divider').removeClass("w-100");
        $('.corruption-item').removeClass('col-md-6');
        $('.corruption-item').addClass('col-md-4');
    }    
}

$(window).on('resize', function(){
    adaptTable();
});