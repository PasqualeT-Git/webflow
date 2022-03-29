const data_report = window.sessionStorage
const valid = document.getElementById('valid_n').innerHTML = data_report['valid'] || "0";
const invalid = document.getElementById('invalid_n').innerHTML = data_report['invalid'] || "0";
const trab = document.getElementById('trab_n').innerHTML = data_report['trab'] || "0";
const civel = document.getElementById('civ_n').innerHTML = data_report['civ'] || "0";
const fed = document.getElementById('fed_n').innerHTML = data_report['fed'] || "0";
const others = document.getElementById('others_n').innerHTML = data_report['others'] || "0";