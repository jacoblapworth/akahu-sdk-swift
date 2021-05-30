const classMap = {
  'xui-fileuploader--fileitem--loading':
    'xui-fileuploader--fileitem--loading xui-fileuploader--fileitem--loading-indeterminate',
  'xui-styledcheckboxradio-group':
    'xui-styledcheckboxradio-group xui-controlgroup xui-controlgroup-vertical',
  'xui-switch-group': 'xui-switch-group  xui-controlgroup xui-controlgroup-vertical',
  'xui-select-layout': 'xui-select xui-select-layout',
};

const oldTableName = 'xui-table';
const newTableName = 'xui-readonlytable';

const changedClassMap = {
  '': 'wrapper',
  '-responsive': 'overflow',
  '-overflowright': 'overflow-overflowright',
  '-overflowleft': 'overflow-overflowleft',
  '-wrapper': 'wrapper--scrollcontainer',
  '-element': '',
  '--head': 'head',
  '--body': 'body',
  '--cell': 'cell',
  '--cell-action': 'cell-action',
  '--cell-hasprecedence': 'cell-hasprecedence',
  '--cell-last': 'cell-last',
  '--cell-layout': 'cell-layout',
  '--cell-link': 'cell-link',
  '--cell-singleline': 'cell-singleline',
  '--row': 'row',
  '--row-link': 'row-link',
  '--row-hasprecedence': 'row-hasprecedence',
  '--sortbutton': '--sortbutton CHECK THE NEW STRUCTURE OF SORT BUTTON',
  '--sortbutton-active': '--sortbuttoncontent-active  CHECK THE NEW STRUCTURE OF SORT BUTTON',
  '--sortbutton-icon': '--sorticon  CHECK THE NEW STRUCTURE OF SORT BUTTON',
  pinleft: 'pinfirst',
  pinright: 'pinlast',
};
Object.keys(changedClassMap).map(changedClass => {
  classMap[`${oldTableName}${changedClass}`] = `${newTableName}${changedClassMap[changedClass]}`;
});

const sameClassList = [
  '-hasheader',
  '--alert',
  '--emptystate',
  '--checkbox-body',
  '--checkbox-head',
  '--customheader',
  '--customfooter',
  '--overflowmenu-body',
  '-nopointerevents',
];
sameClassList.forEach(sameClass => {
  classMap[`${oldTableName}${sameClass}`] = `${newTableName}${sameClass}`;
});

const removedClassList = [
  '--cell-first',
  '--cell-second',
  '--cell-secondtolast',
  '--cell-last',
  '--cell-divider',
  '--caption',
  '-withtruncation',
];
removedClassList.forEach(removedClass => {
  classMap[`${oldTableName}${removedClass}`] = '';
});

module.exports = classMap;
