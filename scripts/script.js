import { gridConfig } from "./gridConfig.js";
import { sampleText as sText } from "./sampleText.js";

// Grid.js
// Released under the MIT license
// https://github.com/grid-js/gridjs/blob/master/LICENSE
import { Grid } from "https://unpkg.com/gridjs?module";

const elmHeader = document.getElementById('header');
const elmFooter = document.getElementById('footer');
const elmFontApiStatus = document.getElementById('fontApiStatus');
const elmLoadButton = document.getElementById('fontLoad');
const elmFontListField = document.getElementById('fontListField');
const elmSampleTextInput = document.getElementById('sampleTextInput');

const elmTablePostScriptName = document.getElementById('tablePostScriptName');
const elmTableFullName = document.getElementById('tableFullName');
const elmTableStyle = document.getElementById('tableStyle');
const elmTableFamily = document.getElementById('tableFamily');
const elmTableJson = document.getElementById('tableJson');
const elmJsonCopyBtn = document.getElementById('jsonCopyBtn');
const elmFooterSample = document.getElementById('footerSample');
const elmCopyResult = document.getElementById('copyResult');

const elmsClickSelect = document.querySelectorAll('.clickSelect');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

let enabled = true;
let fonts = [];
let sampleText = sText[Math.floor(Math.random() * sText.length)];
elmSampleTextInput.value = sampleText;

const grid = new Grid(gridConfig).render(elmFontListField);

const showStatus = async () => {
  if (!self.queryLocalFonts) {
    elmFontApiStatus.innerText = 'このブラウザはFont Access APIに対応していません';
    elmFontApiStatus.style.color = 'red';
    elmLoadButton.disabled = "disabled";
    enabled = false;
    return;
  }
  const status = await navigator.permissions.query({ name: "local-fonts" });
  if (status.state === 'granted') {
    elmFontApiStatus.innerText = '読み込みできます';
    elmFontApiStatus.style.color = '';
  } else if (status.state === 'prompt') {
    elmFontApiStatus.innerText = '読み込みボタンを押してフォントへのアクセスを許可してください';
    elmFontApiStatus.style.color = '';
  } else {
    elmFontApiStatus.innerText = 'フォントへのアクセスが拒否されました';
    elmFontApiStatus.style.color = 'red';
    elmLoadButton.disabled = "disabled";
    enabled = false;
  }
};

const updateTableData = () => {
  grid.updateConfig({
    data: () => fonts.map((font) => [font.postscriptName, font.fullName, font.style, font.family, sampleText]),
    height: window.innerHeight - elmFooter.offsetHeight - elmHeader.offsetHeight - 170 + 'px'
  }).forceRender();
};

const updateTableHeight = () => {
  grid.updateConfig({
    height: window.innerHeight - elmFooter.offsetHeight - elmHeader.offsetHeight - 170 + 'px'
  }).forceRender();
};

const updateSampleText = () => {
  if (sampleText === elmSampleTextInput.value) {
    return;
  }
  sampleText = elmSampleTextInput.value;
  elmFooterSample.innerText = sampleText;
  updateTableData();
};

const showInfo = (cells) => {
  const dict = {};
  elmTablePostScriptName.innerText = dict.postscriptName = cells[0].data;
  elmTableFullName.innerText = dict.fullName = cells[1].data;
  elmTableStyle.innerText = dict.style = cells[2].data;
  elmTableFamily.innerText = dict.family = cells[3].data;
  elmFooterSample.innerText = cells[4].data;
  elmFooterSample.style.fontFamily = `"local_${cells[0].data}","${cells[3].data}","Tofu"`;
  elmTableJson.value = JSON.stringify(dict);
};

const addFontFace = async () => {
  for (const font of fonts) {
    const fontFace = new FontFace(`local_${font.postscriptName}`, `local('${font.postscriptName}')`);
    try {
      document.fonts.add(await fontFace.load());
    } catch (e) {
      console.error(`(${font.postscriptName})`, e);
    }
  }
};

const loadFonts = async () => {
  if (!enabled) {
    return;
  }
  try {
    fonts = await self.queryLocalFonts();
    await addFontFace();
    updateTableData();
  } catch (e) {
    console.error(e);
  } finally {
    showStatus();
  }
};

elmFontListField.style.marginTop = elmHeader.scrollHeight + 20 + 'px';
elmFontListField.style.marginBottom = elmFooter.scrollHeight + 20 + 'px';

window.addEventListener('load', showStatus);
window.addEventListener('resize', updateTableHeight);
elmLoadButton.addEventListener('click', loadFonts);
elmSampleTextInput.addEventListener('change', updateSampleText);
elmSampleTextInput.addEventListener('keyup', updateSampleText);

elmJsonCopyBtn.addEventListener('click', async () => {
  if (!elmTableJson.value) {
    return;
  }
  try {
    await navigator.clipboard.writeText(elmTableJson.value);
    elmCopyResult.innerText = 'コピーしました！';
    await sleep(1000);
    elmCopyResult.innerText = '';
  } catch {
    elmCopyResult.innerText = 'コピーに失敗しました...';
    await sleep(1000);
    elmCopyResult.innerText = '';
  }
});

elmsClickSelect.forEach((elm) => {
  elm.addEventListener('click', event => event.target.select());
});

grid.on('rowClick', (...args) => showInfo(args[1].cells));
