<template>
  <div>
    <Dropdown trigger="click" @on-click="selectLang">
      <a href="javascript:void(0)">
        {{ title }}
        <Icon :size="18" type="md-arrow-dropdown" />
      </a>
      <DropdownMenu slot="list">
        <DropdownItem v-for="(value, key) in localList" :key="`lang-${key}`" :name="key">{{ value }}</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
export default {
  name: 'Language',
  props: {
    lang: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      langList: {
        'zh-CN': '语言',
        'en-US': 'Lang'
      },
      localList: {
        'zh-CN': '中文简体',
        'en-US': 'English'
      }
    }
  },
  computed: {
    title() {
      return this.langList[this.lang]
    }
  },
  watch: {
    lang(lang) {
      this.$i18n.locale = lang
    }
  },
  methods: {
    selectLang(name) {
      this.$emit('on-lang-change', name)
    }
  }
}
</script>
