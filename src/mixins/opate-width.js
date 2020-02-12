
export default{
    data() {
        return {
            opateWidth:0,
        }
    },
    methods:{
        buttonInit() {
            let n = 18
            this.opateWidth = 0;
            this.$nextTick(() => {
                let dom = document.getElementsByClassName('el-table__row')[0];
                if(dom){
                    let button = dom.lastElementChild.querySelectorAll('.opate-button');
                    button.forEach(item => {
                        this.opateWidth += item.offsetWidth;
                    })
                    this.opateWidth += (button.length) * n
                    this.opateWidth += 2
                    console.log('opateWidth',this.opateWidth)
                }
            })
            
        }
    }
}