// components/vehicleKeyboard/vehicleKeyboard.js
Component({
  properties: {
    // 键盘的显示or隐藏
    show: {
      type: Boolean,
      value: true
    },
    // 是否启用输入框
    useInput: {
      type: Boolean,
      value: true
    },
    vlabel: {
      type: String,
      value: '请输入车牌号：'
    }
  },
  data: {
    activeidx: 0, // 输入框active项的索引
    type: 'zh',   // 键盘类型： zh 中文键盘    en 英文键盘
    keys: [
      ['京', '津', '沪', '渝', '冀', '豫', '云', '辽', '黑', '湘'],
      ['皖', '鲁', '新', '苏', '浙', '赣', '鄂', '桂', '甘'],
      ['晋', '蒙', '陕', '吉', '闽', '贵', '川', '粤'],
      ['青', '藏', '宁', '琼', '使', '领'],
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'P', 'N','M'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z'],
      ['X', 'C', 'V', 'B', '学', '港', '澳']
    ],
    platenum: [], // 键盘点击的车牌号 如 ['豫','A','8','8','5','2','4','3']
  },
  methods: {
    // 按键输入
    handletapkey (e) {
      const key = e.currentTarget.dataset.key
      let activeidx = ++this.data.activeidx
      let platenum = this.data.platenum
      let type = ''
      if (activeidx < 1) {
        type = 'zh'
        activeidx = 0
      } else if (activeidx >= 1 && activeidx <=8) {
        type = 'en'
        platenum.push(key)
      } else {
        type = 'en'
        activeidx = 8
        wx.showToast({ title: '车牌号长度不能超过8个字符', icon: 'none' })
      }
      
      this.setData({platenum: platenum, activeidx: activeidx, type: type})
      this.triggerEvent('tapkey', { platenum: platenum.join('') }) // 向父级传递数据
    },
    // 删除输入
    handledel () {
      let activeidx = --this.data.activeidx
      let platenum = []
      let type = ''
      if (activeidx > 0) {
        platenum = this.removeItemByIdx(this.data.platenum, activeidx)
        type = 'en'
      } else {
        activeidx = 0
        type = 'zh'
        console.log('都没输入车牌号，删个锤子哟，信球货。');
      }
      this.setData({platenum: platenum, activeidx: activeidx, type: type})
      this.triggerEvent('tapkey', { platenum: platenum.join('') }) // 向父组件传递数据
    },
    // 点击输入框
    tapinput () {
      this.setData({ show: true })
    },
    // 关闭键盘
    hidekeyboard () {
      this.setData({ show: false })
    },

    // 数组按索引值删除项
    removeItemByIdx (array, index) {
      if(index <= (array.length - 1)){
        for(let i = index; i < array.length; i++){
          array[i]=array[i+1]
        }
      } else {
        throw new Error('超出最大索引！');
      }
      array.length = array.length-1;
      return array;
    }
  }
})
