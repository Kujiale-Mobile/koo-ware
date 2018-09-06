// components/magic-button/magic-button.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    btnMoreImg: {
      type: String,
      value: './res/more_icon.png',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showMagic: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onMoreTapped() {
      this.setData({
        showMagic: !this.data.showMagic,
      });
    },

    hideMagic() {
      if (this.data.showMagic) {
        this.setData({
          showMagic: false,
        });
      }
    },

    onMagicTapped() {
      this.triggerEvent('on2btnTapped');
      this.setData({
        showMagic: false,
      });
    },
  },
});