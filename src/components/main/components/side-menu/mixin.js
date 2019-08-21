import CommonIcon from '_c/common-icon'
import { showTitle } from '@/libs/util'

export const mixinItem = {
  props: {
    parentItem: {
      type: Object,
      default: () => {}
    },
    theme: String,
    iconSize: Number
  },
  computed: {
    parentName() {
      return this.parentItem.name
    },
    children() {
      return this.parentItem.children
    },
    textColor() {
      return this.theme === 'dark' ? '#fff' : '#495060'
    }
  }
}

export default {
  components: {
    CommonIcon
  },
  methods: {
    showTitle(item) {
      return showTitle(item, this)
    },
    showChildren(item) {
      return item.children && (item.children.length > 1 || (item.meta && item.meta.showAlways))
    },
    getNameOrHref(item, children0) {
      return item.href ? `isTurnByHref_${item.href}` : (children0 ? item.children[0].name : item.name)
    }
  }
}
