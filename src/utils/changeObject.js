// 属性配置设置
function toTreeData(data, attributes,editId) {
  const resData = data
  const tree = []
  for (let i = 0; i < resData.length; i++) {
    if (resData[i].parentId === attributes.rootId) {
      if(editId == resData[i].id && editId != '') {
        
      }else if(resData[i].status == 0){

      }else{
        const obj = {
          id: resData[i][attributes.id],
          name: resData[i][attributes.name],
          type: resData[i][attributes.type],
          sourceKey: resData[i][attributes.sourceKey],
          children: []
        }
        tree.push(obj)
        resData.splice(i, 1)
        i--
      }
      
    }
  }
  run(tree)
  function run(chiArr) {
    if (resData.length !== 0) {
      for (let i = 0; i < chiArr.length; i++) {
        for (let j = 0; j < resData.length; j++) {
          if (chiArr[i].id === resData[j][attributes.parendId]) {
            if(resData[j].id == editId && editId != '') {
            }else if(resData[j].status == 0) {

            }else{
              const obj = {
                id: resData[j][attributes.id],
                name: resData[j][attributes.name],
                type: resData[j][attributes.type],
                sourceKey: resData[j][attributes.sourceKey],
                children: []
              }
              chiArr[i].children.push(obj)
              resData.splice(j, 1)
              j--
            }
            
          }
        }
        run(chiArr[i].children)
      }
    }
  }
  return tree
}
export default toTreeData
