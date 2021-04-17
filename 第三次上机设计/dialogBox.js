//对话框的控制

function ShowMod(){ //显示对话框
    document.getElementById('id1').classList.remove('hide');
    document.getElementById('id2').classList.remove('hide');

}
function HideMod(){ //移除对话框
    document.getElementById('id1').classList.add('hide');
    document.getElementById('id2').classList.add('hide');
}