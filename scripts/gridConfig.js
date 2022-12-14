import { html } from "https://unpkg.com/gridjs?module";

export const gridConfig = {
  search: {
    enabled: true,
    selector: (cell, rowIndex, cellIndex) => cellIndex === 1 ? cell : ''
  },
  columns: [{
    name: 'postscriptName',
    id: 'postscriptname',
    hidden: true
  },{
    name: 'Name',
    id: 'name',
    width: '20%'
  },{
    name: 'Style',
    id: 'style',
    width: '20%'
  },{
    name: 'FontFamily',
    id: 'fontfamily',
    hidden: true
  },{
    name: 'Sample',
    id: 'sample',
    sort: false,
    width: '60%',
    formatter: (_, row) => html(`<span style='font-family:"local_${row.cells[0].data}","${row.cells[3].data}","Tofu";'>${row.cells[4].data}</span>`)
  }],
  pagination: {
    limit: 100
  },
  height: '100%',
  style: {
    table: {
      'width': '100%',
    }
  },
  data: [],
  sort: true,
  resizable: false,
  fixedHeader: true,
  language: {
    search: {
        placeholder: 'πNameγγζ€η΄’...',
    },
    sort: {
        sortAsc: 'εγζι γ§δΈ¦γΉζΏγ',
        sortDesc: 'εγιι γ§δΈ¦γΉζΏγ',
    },
    pagination: {
        previous: 'β',
        next: 'βΆ',
        navigate: (page, pages) => `Page ${page} of ${pages}`,
        page: (page) => `Page ${page}`,
        showing: 'Showing',
        of: 'of',
        to: 'to',
        results: 'results',
    },
    loading: 'Loading...',
    noRecordsFound: 'π',
    error: 'γ¨γ©γΌγηΊηγγΎγγ...',
  }
};
