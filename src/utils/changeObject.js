// 属性配置设置
function toTreeData(data, attributes) {
  const resData = data
  const tree = []

  console.log(attributes.rootId)
  for (let i = 0; i < resData.length; i++) {
    console.log(resData[i].parentId)
    if (resData[i].parentId === attributes.rootId) {
      console.log('进来了')
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
  run(tree)
  function run(chiArr) {
    if (resData.length !== 0) {
      for (let i = 0; i < chiArr.length; i++) {
        for (let j = 0; j < resData.length; j++) {
          if (chiArr[i].id === resData[j][attributes.parendId]) {
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
        run(chiArr[i].children)
      }
    }
  }
  return tree
}
export default toTreeData
