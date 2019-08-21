<template>
  <Submenu :name="`${parentName}`">
    <template slot="title">
      <common-icon :type="parentItem.icon || ''" />
      <span>{{ showTitle(parentItem) }}</span>
    </template>
    <template v-for="item in children">
      <template v-if="item.children && item.children.length === 1">
        <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item" />
        <menu-item v-else :key="`menu-${item.children[0].name}`" :name="getNameOrHref(item, true)"><common-icon :type="item.children[0].icon || ''" /><span>{{ showTitle(item.children[0]) }}</span></menu-item>
      </template>
      <template v-else>
        <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item" />
        <menu-item v-else :key="`menu-${item.name}`" :name="getNameOrHref(item)"><common-icon :type="item.icon || ''" /><span>{{ showTitle(item) }}</span></menu-item>
      </template>
    </template>
  </Submenu>
</template>

<script>
import mixin, { mixinItem } from './mixin'

export default {
  name: 'SideMenuItem',
  mixins: [mixin, mixinItem]
}
</script>
