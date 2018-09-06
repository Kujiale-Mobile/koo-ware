// components/magic-button/magic-button.js
import Images from '../res.imgs'

Component({

  /**
   * 组件的初始数据
   */
  data: {
    showMagic: false,
  },

  ready() {
    const Images = new Images();
    this.setData({
      btnMoreImg: Images.MagicButtonMore
    })
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
      this.triggerEvent('onTapped');
      this.setData({
        showMagic: false,
      });
    },
  },
});