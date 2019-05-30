import { debounce } from '@/utils'
import store from '@/store'

export default {
    mounted() {
        
    },
    watch:{
        appMainHeight() {
            if(this.appMainHeight != 0) {
                this.init()
            }
        }
    },
    computed: {
        appMainHeight() {
            return store.state.global.appMainHeight;
        }
    },
    methods: {
        init() {
            let _btmHeight = 0;
            let _addHeight = 0;
            this.valHandle();
            this.__resizeMainHanlder = debounce(() => {

                this.valHandle(_btmHeight, _addHeight);
            }, 100);
            window.addEventListener('resize', this.__resizeMainHanlder)
        },
        valHandle(_btmHeight, _addHeight) {
            let _height = this.appMainHeight - 40;
            if (this.$refs.topAdd) {
                _addHeight = this.$refs.topAdd.offsetHeight;

            } else {
                _addHeight = 0;
            }
            if (this.$refs.btmGroup) {
                _btmHeight = this.$refs.btmGroup.offsetHeight;
            } else {
                _btmHeight = 0;
            }
            let _heightVal = _height - (_addHeight + _btmHeight);
            this.tableHeight = _heightVal;
        }
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.__resizeMainHanlder)
    }
}

