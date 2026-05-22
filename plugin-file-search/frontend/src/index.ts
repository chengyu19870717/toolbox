import { defineComponent, h } from 'vue'
import type { ToolboxAPI } from '@toolbox/frontend-sdk'
import FileSearchView from './FileSearchView.vue'

export function createView(api: ToolboxAPI, toolId: string) {
  return defineComponent({
    render() {
      return h(FileSearchView, { api, toolId })
    }
  })
}
