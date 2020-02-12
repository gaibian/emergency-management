// 对权限进行显示与隐藏
import Lockr from 'lockr'
export function powerShow(val) {
    const route = Lockr.get('power')
    let flag = false;
    for (let index = 0,len=route[0].resourceList; index < len.length; index++) {
        const element = len[index];
        if(element.sourceKey == val){
            flag = true;
            break;
        }
        
    }
    return flag
}