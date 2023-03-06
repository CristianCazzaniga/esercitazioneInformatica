﻿var dataTable;

$(document).ready(function () {
    loadDataTable();
});
function loadDataTable() {
    //per Ajax si veda qui: https://datatables.net/manual/ajax
    //plugins: https://datatables.net/plug-ins/index
    //plugin per l'internazionalizzazione: https://datatables.net/plug-ins/i18n/
    //installazione del plugin per il supporto alla lingua italiana: https://datatables.net/plug-ins/i18n/Italian.html
    dataTable = $('#tblData').DataTable({
        language: {
            url: "https://cdn.datatables.net/plug-ins/1.13.2/i18n/it-IT.json"
        },
        ajax: {
            url: "/Admin/Product/GetAll"
        },
        columns: [
            { data: "title", width: "15%" },
            { data: "isbn", width: "15%" },
            { data: "price", width: "15%" },
            { data: "author", width: "15%" },
            { data: "category.name", width: "15%" },
            { data: "coverType.name", width: "15%" },
            {
                data: "id",
                render: function (data) {
                    return `<div class="w-75 btn-group" role="group"><a href="/Admin/Product/Upsert?id=${data}" class="btn btn-primary mx-2"><i class="bi bi-pencil-square"></i>Edit</a><a class="btn btn-danger mx-2"><i class="bi bi-trash-fill"></i>Delete</a></div>`
                },
                width: "15%"
            },
        ]
    });
}