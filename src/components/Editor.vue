<script>
import tinymce from 'tinymce/tinymce'
// import 'tinymce/themes/modern/theme'
// import 'tinymce/themes/silver/theme'
import Editor from '@tinymce/tinymce-vue'

import 'tinymce/skins/ui/oxide/skin.min.css' // 富文本样式
import 'tinymce/icons/default' // 富文本样式
// 配置富文本
import 'tinymce/themes/silver/theme.min.js' // 引入富文本的主要脚本

import 'tinymce/plugins/link' // 超链接
import 'tinymce/plugins/paste' // 粘贴过滤
import 'tinymce/plugins/preview' // 预览
import 'tinymce/plugins/print' // 打印
import 'tinymce/plugins/lists' // 列表
import 'tinymce/plugins/table' // 表格
import 'tinymce/plugins/fullscreen' // 全屏

export default {
  name: 'Editor',
  components: {
    Editor
  },
  model: {
    props: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    /**
     * 是否禁用
     */
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      tinymceHtml: ''

    }
  },
  computed: {
    editorInit () {
      return {
        // skin_url: require('@/assets/tinymce/skins/ui/oxide/skin.min.css'),
        language_url: require('@/assets/tinymce/langs/zh_CN.js'),
        language: 'zh_CN',
        height: 300,
        plugins: ['link', 'preview', 'paste', 'print', 'fullscreen', 'lists', 'table'], // 插件
        // 工具栏
        menubar: false, // 隐藏菜单栏
        toolbar: ['undo redo|bold italic forecolor backcolor forecolorpicker backcolorpicker|link unlink |indent outdent |fontsizeselect fontselect lineheight|',
          'bullist numlist table|underline strikethrough|styleselect removeformat |alignleft aligncenter alignright alignfull |subscript superscript|cut copy paste|fullscreen|preview print', 'uploadImage'],
        placeholder: '在这里输入文字',
        fontsize_formats: '8px 9px 10px 11px 12px 13px 14px 15px 16px 17px 18px 19px 20px 22px 24px 36px',
        font_formats:
          '思源黑体=sourceHanSansCNMedium,微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
        lineheight_formats: '0.5 0.75 1 1.1 1.2 1.3 1.4 1.5 1.6 1.7 1.8 2 2.5 3',
        branding: false, // 隐藏右下角技术支持
        // paste_preprocess: function (plugin, args) {
        //   console.log(args.content)
        // },
        // resize: false,// 是否可改变编辑区大小
        paste_as_text: true,
        setup: function (editor) {
          editor.ui.registry.addButton('uploadImage', {
            text: '上传图片',
            tooltip: '点击上传本地图片',
            icon: 'imagesssss',
            onAction: (e) => {
              console.log(e)
              editor.insertContent('&nbsp;<strong>It\'s my button!</strong>&nbsp;')
              // this.drawerFlagGoFather()
            }
          })
          // 初始化操作
          editor.on('init', function (e) {
            this.getBody().style.fontSize = '14px'
            this.getBody().style.fontFamily = 'sourceHanSansCNMedium'
            this.getBody().style.lineHeight = '1'
          })
        },
        // init_instance_callback为回调配置项
        init_instance_callback: (editor) => {
          console.log('回调----', editor)
          console.log(editor._eventDispatcher.bindings)
          console.log(editor._pendingNativeEvents)
          editor.on('input', e => {
            console.log('文本框input触发')
            // this.$emit('input', e.target.innerHTML)
          })
          editor.on('change', e => {
            console.log('文本框change触发')
            // this.$emit('change', e.level.content)
          })
          editor.on('selectionChange', e => {
            console.log('文本框文字选中事件触发', e)
            // 选中的文字节点
            console.log(editor.selection.getNode())
            // var editBody = editor.getBody()
            // 选中
            // editor.selection.select(editBody)
            // 选中的文字
            const text = editor.selection.getContent({ format: 'text' })
            console.log(text)
          })
          editor.on('paste', e => {
            console.log('文本框文字paste触发')
            // this.$emit('change', e.level.content)
          })
        },
        ...this.$attrs
      }
    }
  },
  methods: {

  },
  watch: {
    tinymceHtml: {
      handler (newV, oldV) {
        this.$emit('change', newV)
      },
      immediate: true
    },
    value: {
      handler (newV) {
        if (newV) {
          // tinymce.activeEditor.setContent(newV)
          this.tinymceHtml = newV
        }
      },
      immediate: true
    }
  },
  created () {

  },
  mounted () {
    tinymce.init({})
  },
  beforeDestroy () {

  },
  render (h) {
    return (
      <div class='editor'>
        <Editor id="tinymce" disabled={this.disabled} v-model={this.tinymceHtml} init={this.editorInit}></Editor>
        <div domPropsInnerHTML={this.tinymceHtml}></div>
      </div>
    )
  }
}
</script>
<style lang="scss" scoped>

</style>
