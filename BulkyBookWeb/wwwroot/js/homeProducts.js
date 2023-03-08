var dataTable;
$(document).ready(function () {
    //https://stackoverflow.com/questions/574944/how-to-load-up-css-files-using-javascript
    var cssId = 'myCss'; // you could encode the css path itself to generate id..
    if (!document.getElementById(cssId)) {
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.id = cssId;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = '/css/homeProducts.css';
        link.media = 'all';
        head.appendChild(link);
    }
    dataTable = $('#tblData')
        .DataTable({
            //https://datatables.net/reference/option/dom
            dom:
                "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'<'float-md-right ml-2'B>f>>" +
                "<'row'<'col-sm-12'tr>>" +
                "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
            language: {
                url: "https://cdn.datatables.net/plug-ins/1.13.2/i18n/it-IT.json"
            },
            ajax: {
                url: "/Admin/Product/GetAll",
            },
            buttons: ['csv', {
                text: '<i class="bi bi-person-badge"></i> &nbsp; Change view',
                action: function (e, dt, node) {
                    $(dt.table().node()).toggleClass('cards');
                    $('.bi', node).toggleClass(['bi-table', 'bi-person-badge']);
                    dt.draw('page');
                },
                className: 'btn-sm',
                attr: {
                    title: 'Change views',
                }
            }],
            columns: [
                {
                    //https://datatables.net/reference/option/columns.orderable
                    orderable: false,
                    data: "imageUrl",
                    className: 'text-center',
                    render: function (data, type, full, meta) {
                        if (type === 'display') {
                            return `<img src="${data}" alt="Image Url" class="avatar">`
                        }
                        return null
                    }
                },
                { data: "title" },
                { data: "author" },
                { data: "listPrice" },
                { data: "price100" },
                {
                    data: "id",
                    orderable: false,
                    className: 'align-middle',
                    render: function (data) {
                        return `<a href="/Customer/Home/Details?id=${data}" class="btn btn-primary form-control">Details</a>`
                    }
                },
            ],
            //https://datatables.net/reference/option/initComplete
            'initComplete': function (settings, json) {
                $('#tblData').DataTable().ajax.reload();
            },
            'drawCallback': function (settings) {
                var api = this.api();
                var $table = $(api.table().node());
                if ($table.hasClass('cards')) {
                    // Create an array of labels containing all table headers
                    var labels = [];
                    $('thead th', $table).each(function () {
                        labels.push($(this).text());
                    });
                    // per ogni riga del body
                    $('tbody tr', $table).each(function () {
                        var listPriceIndex = labels.indexOf('List Price');
                        var lowestPriceIndex = labels.indexOf('Lowest Price');
                        var listPrice = $(this).find("td").eq(listPriceIndex).html();
                        var lowestPrice = $(this).find("td").eq(lowestPriceIndex).html();
                        var shouldStrike = listPrice > lowestPrice;
                        //per ogni td nella riga
                        $(this).find('td').each(function (column) {
                            //aggiungo un attributo data-label ad ogni td
                            $(this).attr('data-label', labels[column]);
                            //per i dati del prezzo aggiungo il simbolo dell'euro se non c'è'
                            if ((column == lowestPriceIndex || column == listPriceIndex) && (!this.innerHTML.includes('€'))) {
                                this.innerHTML += '€';
                            }
                            //solo se il prezzo più basso è minore del prezzo di listino mostro
                            //il prezzo di listino sbarrato
                            if (shouldStrike && column == listPriceIndex && !this.innerHTML.includes('<strike><b>')) {
                                this.innerHTML = '<strike><b>' + this.innerHTML + '</b></strike>'
                            }
                        });
                    });
                    var max = 0;
                    $('tbody tr', $table).each(function () {
                        max = Math.max($(this).height(), max);
                    }).height(max);
                } else {
                    // Remove data-label attribute from each cell
                    $('tbody td', $table).each(function () {
                        $(this).removeAttr('data-label');
                    });
                    $('tbody tr', $table).each(function () {
                        $(this).height('auto');
                    });
                }
            }
        })
});