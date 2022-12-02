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
        placeholder: '🔍Nameから検索...',
    },
    sort: {
        sortAsc: '列を昇順で並べ替え',
        sortDesc: '列を降順で並べ替え',
    },
    pagination: {
        previous: '◀',
        next: '▶',
        navigate: (page, pages) => `Page ${page} of ${pages}`,
        page: (page) => `Page ${page}`,
        showing: 'Showing',
        of: 'of',
        to: 'to',
        results: 'results',
    },
    loading: 'Loading...',
    noRecordsFound: '🙃',
    error: 'エラーが発生しました...',
  }
};
