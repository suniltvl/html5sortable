
const colPropertyName = "PropertyName";

function pageLoad() {
    initDragDrop();
    loadData();
    initEvents()
}

function initEvents() {
    $("#searchProperties").keyup(function () { 
        filterProperties();
    })
}

function filterProperties() {
    var searchText = $("#searchProperties").val()
    $("#ulProperties li").each(function (ind, itm) {
        var itmObj = $(itm);
        if (itmObj.attr("data-param").toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
            itmObj.show();
        }
        else {
            itmObj.hide();
        }
    });
}

function initDragDrop() {

    sortable('.o-sortable', {
        connectWith: 'js-sortable-connected'
    });
    // blue items
    sortable('.o-sortable-inner', {
        connectWith: 'js-sortable-connected'
    });

    sortable('.js-sortable-connected', {
        forcePlaceholderSize: true,
        // connectWith: '.js-connected',
        // handle: '.js-handle',
        items: 'li',
        // placeholderClass: 'border border-white bg-orange mb1'
    });
    sortable('.js-sortable-inner-connected', {
        forcePlaceholderSize: true,
        // connectWith: 'js-inner-connected',
        // handle: '.js-inner-handle',
        items: '.item',
        maxItems: 3,
        // placeholderClass: 'border border-white bg-orange mb1'
    });
}


function loadData() {
    var data = {};
    var url = "data_json/sample.json";
    $.ajax(url)
        .done(function (response) {
            data = response;
            // console.log(response);

            $.each(data, function (ind, itm) {

                var tmpl =
                    `<li class="horizontalLi" data-param="${itm.PropertyName}">
                        <a class="dropdown-item d-flex align-items-center gap-2 py-2" href="#">
                            <span class="d-inline-block bg-success rounded-circle p-1"></span>   
                            ${itm.PropertyName}                     
                        </a>
                    </li>`;
                // var tmpl = `<li class="p1 mb1 yellow bg-maroon" data-param="${itm.PropertyName}" style="position: relative; z-index: 10">${itm.PropertyName}</li>`;
                $("#ulProperties").append(tmpl);

            })
            initDragDrop();
        })
        .fail(function (error) {
            $("#spnMessage").text(error.statusText);
        });
}
$(document).ready(pageLoad())